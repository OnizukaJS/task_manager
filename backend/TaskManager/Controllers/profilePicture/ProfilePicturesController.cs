using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using TaskManager.Models.profilePicture;
using Azure.Storage.Blobs;
using TaskManager.Models.taskToDo;
using TaskManager.Repository.employee;
using Microsoft.Extensions.Configuration;

namespace TaskManager.Controllers.profilePicture
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfilePicturesController : ControllerBase
    {
        private readonly TaskToDoContext _taskToDoContext;
        private readonly IEmployeeRepository _employeeQueries;
        private readonly IConfiguration _configuration;

        public ProfilePicturesController(TaskToDoContext taskToDoContext, 
            IEmployeeRepository employeeQueries,
            IConfiguration configuration)
        {
            _taskToDoContext = taskToDoContext;
            _employeeQueries = employeeQueries;
            _configuration = configuration;
        }

        [HttpPost]
        public ActionResult UpdateProfilePicture([FromForm] ProfilePicture profilePicture)
        {
            var existingEmployee = _employeeQueries.GetEmployee(profilePicture.EmployeeId);

            if (existingEmployee == null)
            {
                return NotFound("The employee does not exist");
            }

            var currentFileName = existingEmployee.ProfilePicture;

            if (currentFileName != null)
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

                    _employeeQueries.UpdateEmployeeProfilePicture(profilePicture.EmployeeId, filename);
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
        public void DeleteProfilePicture(Guid employeeId)
        {
            var existingEmployee = _employeeQueries.GetEmployee(employeeId);
            var fileName = existingEmployee.ProfilePicture;
            var blobStorageContainerName = _configuration.GetValue<string>("BlobStorageSettings:blobStorageContainerName");
            var blobStorageConnectionString = _configuration["BlobStorageSettings:blobStorageConnectionString"];

            BlobClient blobClient = new BlobClient(blobStorageConnectionString, blobStorageContainerName, fileName);
            blobClient.Delete();
            _employeeQueries.DeleteEmployeeProfilePicture(employeeId);
            _taskToDoContext.SaveChanges();
        }
    }
}
