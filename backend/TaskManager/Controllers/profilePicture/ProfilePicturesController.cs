using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using TaskManager.Models.profilePicture;
using Azure.Storage.Blobs;
using TaskManager.Interfaces.employee;
using TaskManager.Models.taskToDo;

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
            try
            {
                var filename = profilePicture.FileName;
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

                    _employeeQueries.EditEmployeeProfilePicture(profilePicture.EmployeeId, filename);
                }
                catch (Exception ex) { }
                var result = fileUrl;
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete]
        [Route("api/[controller]/{fileName}/{employeeId}")]
        public void DeleteProfilePicture(string fileName, Guid employeeId)
        {
            BlobClient blobClient = new BlobClient(blobStorageConnectionString, blobStorageContainerName, fileName);
            blobClient.Delete();
            _employeeQueries.DeleteEmployeeProfilePicture(employeeId);
            _taskToDoContext.SaveChanges();
        }
    }
}
