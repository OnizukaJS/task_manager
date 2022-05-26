using AutoMapper;
using Azure.Storage.Blobs;
using System;
using System.Collections.Generic;
using TaskManager.Dtos.employeeDto;
using TaskManager.Interfaces.employee;
using TaskManager.Interfaces.profilePicture;
using TaskManager.Models.employee;

namespace TaskManager.Services.employee
{
    public class EmployeeService : IEmployeeService
    {
        private string blobStorageConnectionString = "DefaultEndpointsProtocol=https;AccountName=mytaskmanagerblobstorage;AccountKey=8ko4p8gVDbsFNR+ix61bDQthTh5cD7OKCIPXkFaA6hfKPnPmciLVZeesH4UIQndUWbwq6On93UIfd3J94Tva7g==;EndpointSuffix=core.windows.net";
        private string blobStorageContainerName = "profilepicture";
        private readonly IEmployeeData _employeeData;
        private readonly IMapper _mapper;
        private readonly IProfilePictureService _profilePictureService;

        public EmployeeService(IEmployeeData employeeData, IMapper mapper, IProfilePictureService profilePictureService)
        {
            _employeeData = employeeData;
            _mapper = mapper;
            _profilePictureService = profilePictureService;
        }

        public IEnumerable<EmployeeResponseModel> GetEmployees()
        {
            var employees = _employeeData.GetEmployees();
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

        public EmployeeResponseModel UpdateEmployee(Guid id, EmployeeUpdateModel employeeUpdateModel)
        {
            var existingEmployee = _employeeData.GetEmployeeById(id);
            if (existingEmployee == null)
            {
                throw new KeyNotFoundException();
            }

            var employeeToUpdate = _mapper.Map(employeeUpdateModel, existingEmployee);
            _employeeData.UpdateEmployee(employeeToUpdate);

            return _mapper.Map<EmployeeResponseModel>(existingEmployee);
        }
    }
}
