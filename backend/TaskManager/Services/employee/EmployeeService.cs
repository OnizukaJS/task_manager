using BC = BCrypt.Net.BCrypt;
using AutoMapper;
using Azure.Storage.Blobs;
using System;
using System.Collections.Generic;
using TaskManager.Dtos.employeeDto;
using TaskManager.Dtos.mailDto;
using TaskManager.Models.employee;
using TaskManager.Repository.employee;
using TaskManager.Services.profilePicture;
using Microsoft.Extensions.Configuration;
using TaskManager.Services.mail;
using TaskManager.Middlewares;

namespace TaskManager.Services.employee
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMapper _mapper;
        private readonly IProfilePictureService _profilePictureService;
        private readonly IMailService _mailService;
        private readonly IConfiguration _configuration;

        public EmployeeService(IEmployeeRepository employeeRepository, 
            IMapper mapper, 
            IProfilePictureService profilePictureService, 
            IMailService mailService,
            IConfiguration configuration)
        {
            _employeeRepository = employeeRepository;
            _mapper = mapper;
            _profilePictureService = profilePictureService;
            _mailService = mailService;
            _configuration = configuration;
        }

        public EmployeeResponseModel RegisterEmployee(EmployeeRegistrationModel employeeRegistration)
        {
            var employee = _mapper.Map<Employee>(employeeRegistration);

            if (_employeeRepository.EmployeeEmailAlreadyInUse(employee.Email))
            {
                throw new Exception();
            }

            _employeeRepository.RegisterEmployee(employee);

            var employeeResponse = _mapper.Map<EmployeeResponseModel>(employee);

            var welcomeEmail = new WelcomeEmail()
            {
                ToEmail = employeeResponse.Email,
                UserName = $"{employeeResponse.EmployeeName} {employeeResponse.EmployeeSurname}",
            };

            _mailService.SendWelcomeEmailAsync(welcomeEmail);

            return employeeResponse;
        }

        public EmployeeResponseModel AuthenticateEmployee(EmployeeLoginModel employeeLogin)
        {
            var employee = _employeeRepository.GetEmployeeByEmail(employeeLogin.EmployeeEmail);

            if (employee == null)
            {
                throw new KeyNotFoundException($"Employee with email {employeeLogin.EmployeeEmail} not found");
            }

            if (!BC.Verify(employeeLogin.EmployeePassword, employee.Password))
            {
                throw new KeyNotFoundException("The password is wrong");
            }

            var employeeResponse = _mapper.Map<EmployeeResponseModel>(employee);

            return employeeResponse;
        }

        public IEnumerable<EmployeeResponseModel> GetEmployees()
        {
            var employees = _employeeRepository.GetEmployees();
            var employeesDto = _mapper.Map<IEnumerable<EmployeeResponseModel>>(employees);
            var blobStorageContainerName = _configuration.GetValue<string>("BlobStorageSettings:blobStorageContainerName");
            var blobStorageConnectionString = _configuration["BlobStorageSettings:blobStorageConnectionString"];

            // TODO: Move to a ValueResolver in mapper
            foreach (var employee in employeesDto)
            {
                var filename = employee.ProfilePicture;
                BlobClient blobClient = new BlobClient(blobStorageConnectionString, blobStorageContainerName, filename);
                employee.SasUriProfilPicture = filename != null ? _profilePictureService.GetServiceSasUriForBlob(blobClient) : null;
            }

            return employeesDto;
        }

        public EmployeeResponseModel GetEmployee(Guid employeeId)
        {
            var existingEmployee = _employeeRepository.GetEmployee(employeeId);
            var filename = existingEmployee.ProfilePicture;
            var blobStorageContainerName = _configuration.GetValue<string>("BlobStorageSettings:blobStorageContainerName");
            var blobStorageConnectionString = _configuration["BlobStorageSettings:blobStorageConnectionString"];

            BlobClient blobClient = new BlobClient(blobStorageConnectionString, blobStorageContainerName, filename);

            if (existingEmployee == null)
            {
                throw new KeyNotFoundException($"Employee with id {employeeId} not found");
            }

            var existingEmployeeDto = _mapper.Map<EmployeeResponseModel>(existingEmployee);
            existingEmployeeDto.SasUriProfilPicture = filename != null ? _profilePictureService.GetServiceSasUriForBlob(blobClient) : null;

            return existingEmployeeDto;
        }

        public EmployeeResponseModel UpdateEmployee(Guid employeeId, EmployeeUpdateModel employeeUpdateModel)
        {
            var existingEmployee = _employeeRepository.GetEmployee(employeeId);
            if (existingEmployee == null)
            {
                throw new KeyNotFoundException($"Employee with id {employeeId} not found");
            }

            var employeeToUpdate = _mapper.Map(employeeUpdateModel, existingEmployee);
            _employeeRepository.UpdateEmployee(employeeToUpdate);

            return _mapper.Map<EmployeeResponseModel>(existingEmployee);
        }

        public EmployeeResponseModel UpdateEmployeePassword(Guid employeeId, EmployeeUpdatePasswordModel employeePassword)
        {
            if (employeePassword.Password != employeePassword.ConfirmPassword)
            {
                throw new Exception();
            }

            var existingEmployee = _employeeRepository.GetEmployee(employeeId);

            if (existingEmployee == null)
            {
                throw new KeyNotFoundException($"Employee with id {employeeId} not found");
            }

            var employeeResponse = _mapper.Map(employeePassword, existingEmployee);

            _employeeRepository.UpdateEmployeePassword(employeeResponse);

            return _mapper.Map<EmployeeResponseModel>(existingEmployee);
        }

        public EmployeeResponseModel UpdateEmployeeProfilePicture(Guid employeeId, string profilePicture)
        {
            var existingEmployee = _employeeRepository.GetEmployee(employeeId);

            if (existingEmployee == null)
            {
                throw new KeyNotFoundException($"Employee with id {employeeId} not found");
            }

            existingEmployee.ProfilePicture = profilePicture;

            var employeeResponse = _mapper.Map<Employee>(existingEmployee);

            _employeeRepository.UpdateEmployeeProfilePicture(employeeResponse);

            return _mapper.Map<EmployeeResponseModel>(existingEmployee);
        }

        public void DeleteEmployee(Guid employeeId)
        {
            var employeeToDelete = _employeeRepository.GetEmployee(employeeId);
            if (employeeToDelete == null)
            {
                throw new KeyNotFoundException($"Employee with id {employeeId} not found");
            }

            _employeeRepository.DeleteEmployee(employeeToDelete);
        }

        public void DeleteEmployeeProfilePicture(Guid employeeId)
        {
            var existingEmployee = _employeeRepository.GetEmployee(employeeId);

            if (existingEmployee == null)
            {
                throw new KeyNotFoundException($"Employee with id {employeeId} not found");
            }

            var fileName = existingEmployee.ProfilePicture;
            var blobStorageContainerName = _configuration.GetValue<string>("BlobStorageSettings:blobStorageContainerName");
            var blobStorageConnectionString = _configuration["BlobStorageSettings:blobStorageConnectionString"];

            BlobClient blobClient = new BlobClient(blobStorageConnectionString, blobStorageContainerName, fileName);
            blobClient.Delete();

            existingEmployee.ProfilePicture = null;

            _employeeRepository.DeleteEmployeeProfilePicture(existingEmployee);
        }
    }
}
