using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using TaskManager.Models.profilePicture;
using Azure.Storage.Blobs;
using TaskManager.Interfaces.employee;
using TaskManager.Models.taskToDo;
using Azure.Storage.Sas;

namespace TaskManager.Controllers.profilePicture
{
    [ApiController]
    public class ProfilePicturesController : ControllerBase
    {
        private string blobStorageConnectionString = "DefaultEndpointsProtocol=https;AccountName=mytaskmanagerblobstorage;AccountKey=8ko4p8gVDbsFNR+ix61bDQthTh5cD7OKCIPXkFaA6hfKPnPmciLVZeesH4UIQndUWbwq6On93UIfd3J94Tva7g==;EndpointSuffix=core.windows.net";
        private string blobStorageContainerName = "profilepicture";
        private TaskToDoContext _taskToDoContext;
        private IEmployeeData _employeeQueries;

        public ProfilePicturesController(TaskToDoContext taskToDoContext, IEmployeeData employeeQueries)
        {
            _taskToDoContext = taskToDoContext;
            _employeeQueries = employeeQueries;
        }

        [HttpPost]
        [Route("api/[controller]")]
        public ActionResult UpdateProfilePicture([FromForm] ProfilePicture profilePicture)
        {
            var existingEmployee = _employeeQueries.GetEmployeeById(profilePicture.EmployeeId); // Done

            if (existingEmployee == null)
            {
                return NotFound("The employee does not exist");
            }

            var currentFileName = existingEmployee.ProfilePicture; // Done

            if (currentFileName != null)
            {
                DeleteProfilePicture(profilePicture.EmployeeId);
            }

            try
            {
                var folderName = existingEmployee.EmployeeName; // Done
                var filename = folderName + "/" + profilePicture.FileName; // Done
                var fileUrl = "";
                var container = new BlobContainerClient(blobStorageConnectionString, blobStorageContainerName); // Done

                try
                {
                    BlobClient blob = container.GetBlobClient(filename); // Done
                    
                    using (Stream stream = profilePicture.FormFile.OpenReadStream())
                    {
                        blob.Upload(stream);
                    }
                    fileUrl = blob.Uri.AbsoluteUri; // Check if this is the localUri I have in the FE

                    _employeeQueries.EditEmployeeProfilePicture(profilePicture.EmployeeId, filename);
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

        [HttpDelete]
        [Route("api/[controller]/{employeeId}")]
        public void DeleteProfilePicture(Guid employeeId)
        {
            var existingEmployee = _employeeQueries.GetEmployeeById(employeeId);
            var fileName = existingEmployee.ProfilePicture;

            BlobClient blobClient = new BlobClient(blobStorageConnectionString, blobStorageContainerName, fileName);
            blobClient.Delete();
            _employeeQueries.DeleteEmployeeProfilePicture(employeeId);
            _taskToDoContext.SaveChanges();
        }
    }
}
