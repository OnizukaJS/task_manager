using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using TaskManager.Models.profilePicture;
using Azure.Storage.Blobs;
using TaskManager.Models.taskToDo;
using Microsoft.Extensions.Configuration;
using TaskManager.Services.employee;
using TaskManager.Services.profilePicture;
using System.Collections.Generic;

namespace TaskManager.Controllers.profilePicture
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfilePicturesController : ControllerBase
    {
        private readonly TaskToDoContext _taskToDoContext;
        private readonly IEmployeeService _employeeService;
        private readonly IProfilePictureService _profilePictureService;
        private readonly IConfiguration _configuration;

        public ProfilePicturesController( 
            IEmployeeService employeeService,
            IProfilePictureService profilePictureService,
            IConfiguration configuration)
        {
            _employeeService = employeeService;
            _profilePictureService = profilePictureService;
            _configuration = configuration;
        }

        [HttpPost]
        public IActionResult UpdateProfilePicture([FromForm] ProfilePicture profilePicture)
        {
            var existingEmployee = _employeeService.GetEmployee(profilePicture.EmployeeId);

            if (existingEmployee == null)
            {
                throw new KeyNotFoundException($"Employee with id {profilePicture.EmployeeId} not found");
            }

            var currentFileName = existingEmployee.ProfilePicture;

            if (!string.IsNullOrEmpty(currentFileName))
            {
                DeleteProfilePicture(profilePicture.EmployeeId);
            }

            var blobStorageContainerName = _configuration.GetValue<string>("BlobStorageSettings:blobStorageContainerName");
            var blobStorageConnectionString = _configuration["BlobStorageSettings:blobStorageConnectionString"];

            try
            {
                var folderName = existingEmployee.EmployeeName;
                var filename = folderName + "/" + profilePicture.FileName;
                var fileUrl = "";
                var container = new BlobContainerClient(blobStorageConnectionString, blobStorageContainerName);

                try
                {
                    BlobClient blob = container.GetBlobClient(filename);
                    
                    using (Stream stream = profilePicture.FormFile.OpenReadStream())
                    {
                        blob.Upload(stream);
                    }
                    fileUrl = blob.Uri.AbsoluteUri;

                    _employeeService.UpdateEmployeeProfilePicture(profilePicture.EmployeeId, filename);
                }
                catch (Exception) { }
                var result = fileUrl;
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("{employeeId}")]
        public IActionResult DeleteProfilePicture(Guid employeeId)
        {
            _employeeService.DeleteEmployeeProfilePicture(employeeId);
            return Ok();
        }
    }
}
