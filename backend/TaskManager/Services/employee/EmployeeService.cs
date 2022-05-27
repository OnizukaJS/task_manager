using AutoMapper;
using Azure.Storage.Blobs;
using System;
using System.Collections.Generic;
using TaskManager.Dtos.employeeDto;
using TaskManager.Repository.employee;
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

        public EmployeeService(IEmployeeRepository employeeRepository, IMapper mapper, IProfilePictureService profilePictureService)
        {
            _employeeRepository = employeeRepository;
            _mapper = mapper;
            _profilePictureService = profilePictureService;
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

        public EmployeeResponseModel UpdateEmployee(Guid employeeId, EmployeeUpdateModel employeeUpdateModel)
        {
            var existingEmployee = _employeeRepository.GetEmployeeById(employeeId);
            if (existingEmployee == null)
            {
                throw new KeyNotFoundException();
            }

            var employeeToUpdate = _mapper.Map(employeeUpdateModel, existingEmployee);
            _employeeRepository.UpdateEmployee(employeeToUpdate);

            return _mapper.Map<EmployeeResponseModel>(existingEmployee);
        }
    }
}
