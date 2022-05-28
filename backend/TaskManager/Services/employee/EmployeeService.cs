﻿using BC = BCrypt.Net.BCrypt;
using AutoMapper;
using Azure.Storage.Blobs;
using System;
using System.Collections.Generic;
using TaskManager.Dtos.employeeDto;
using TaskManager.Dtos.mailDto;
using TaskManager.Models.employee;
using TaskManager.Repository.employee;
using TaskManager.Repository.mail;
using TaskManager.Services.profilePicture;

namespace TaskManager.Services.employee
{
    public class EmployeeService : IEmployeeService
    {
        private string blobStorageConnectionString = "DefaultEndpointsProtocol=https;AccountName=mytaskmanagerblobstorage;AccountKey=8ko4p8gVDbsFNR+ix61bDQthTh5cD7OKCIPXkFaA6hfKPnPmciLVZeesH4UIQndUWbwq6On93UIfd3J94Tva7g==;EndpointSuffix=core.windows.net";
        private string blobStorageContainerName = "profilepicture";
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMapper _mapper;
        private readonly IProfilePictureService _profilePictureService;
        private readonly IMailRepository _mailRepository;

        public EmployeeService(IEmployeeRepository employeeRepository, IMapper mapper, IProfilePictureService profilePictureService, 
            IMailRepository mailRepository)
        {
            _employeeRepository = employeeRepository;
            _mapper = mapper;
            _profilePictureService = profilePictureService;
            _mailRepository = mailRepository;
        }

        public EmployeeResponseModel RegisterEmployee(EmployeeRegistrationModel employeeRegistration)
        {
            var employee = _mapper.Map<Employee>(employeeRegistration);

            if (_employeeRepository.EmployeeEmailAlreadyInUse(employee.Email))
            {
                throw new KeyNotFoundException();
            }

            _employeeRepository.RegisterEmployee(employee);

            var employeeResponse = _mapper.Map<EmployeeResponseModel>(employee);

            var welcomeEmail = new WelcomeEmail()
            {
                ToEmail = employeeResponse.Email,
                UserName = $"{employeeResponse.EmployeeName} {employeeResponse.EmployeeSurname}",
            };

            _mailRepository.SendWelcomeEmailAsync(welcomeEmail);

            return employeeResponse;
        }

        public EmployeeResponseModel AuthenticateEmployee(EmployeeLoginModel employeeLogin)
        {
            var employee = _employeeRepository.GetEmployeeByEmail(employeeLogin.EmployeeEmail);

            if (employee == null)
            {
                throw new KeyNotFoundException();
            }

            if (!BC.Verify(employeeLogin.EmployeePassword, employee.Password))
            {
                throw new KeyNotFoundException();
            }

            var employeeResponse = _mapper.Map<EmployeeResponseModel>(employee);

            return employeeResponse;
        }

        public IEnumerable<EmployeeResponseModel> GetEmployees()
        {
            var employees = _employeeRepository.GetEmployees();
            var employeesDto = _mapper.Map<IEnumerable<EmployeeResponseModel>>(employees);

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
            BlobClient blobClient = new BlobClient(blobStorageConnectionString, blobStorageContainerName, filename);

            if (existingEmployee == null)
            {
                throw new KeyNotFoundException();
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
                throw new KeyNotFoundException();
            }

            var employeeToUpdate = _mapper.Map(employeeUpdateModel, existingEmployee);
            _employeeRepository.UpdateEmployee(employeeToUpdate);

            return _mapper.Map<EmployeeResponseModel>(existingEmployee);
        }

        public EmployeeResponseModel UpdateEmployeePassword(Guid employeeId, EmployeeUpdatePasswordModel employeePassword)
        {
            if (employeePassword.Password != employeePassword.ConfirmPassword)
            {
                throw new KeyNotFoundException();
            }

            var existingEmployee = _employeeRepository.GetEmployee(employeeId);

            if (existingEmployee == null)
            {
                throw new KeyNotFoundException();
            }

            var employeeResponse = _mapper.Map(employeePassword, existingEmployee);

            _employeeRepository.UpdateEmployeePassword(employeeResponse);

            return _mapper.Map<EmployeeResponseModel>(existingEmployee);
        }

        public void DeleteEmployee(Guid employeeId)
        {
            var employeeToDelete = _employeeRepository.GetEmployee(employeeId);
            if (employeeToDelete == null)
            {
                throw new KeyNotFoundException();
            }

            _employeeRepository.DeleteEmployee(employeeToDelete);
        }
    }
}
