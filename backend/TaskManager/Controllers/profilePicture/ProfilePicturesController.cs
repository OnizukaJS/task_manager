using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using TaskManager.Models.profilePicture;
using Azure.Storage.Blobs;
using TaskManager.Models.taskToDo;
using TaskManager.Repository.employee;

namespace TaskManager.Controllers.profilePicture
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfilePicturesController : ControllerBase
    {
        private readonly string blobStorageConnectionString = "DefaultEndpointsProtocol=https;AccountName=mytaskmanagerblobstorage;AccountKey=8ko4p8gVDbsFNR+ix61bDQthTh5cD7OKCIPXkFaA6hfKPnPmciLVZeesH4UIQndUWbwq6On93UIfd3J94Tva7g==;EndpointSuffix=core.windows.net";
        private readonly string blobStorageContainerName = "profilepicture";
        private readonly TaskToDoContext _taskToDoContext;
        private readonly IEmployeeRepository _employeeQueries;

        public ProfilePicturesController(TaskToDoContext taskToDoContext, IEmployeeRepository employeeQueries)
        {
            _taskToDoContext = taskToDoContext;
            _employeeQueries = employeeQueries;
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
                    fileUrl = blob.Uri.AbsoluteUri; // Check if this is the localUri I have in the FE

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

            BlobClient blobClient = new BlobClient(blobStorageConnectionString, blobStorageContainerName, fileName);
            blobClient.Delete();
            _employeeQueries.DeleteEmployeeProfilePicture(employeeId);
            _taskToDoContext.SaveChanges();
        }
    }
}
