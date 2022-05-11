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
            var existingEmployee = _employeeQueries.GetEmployeeById(profilePicture.EmployeeId);

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
                    fileUrl = blob.Uri.AbsoluteUri;

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

        private Uri GetServiceSasUriForBlob(BlobClient blobClient, string storedPolicyName = null)
        {
            // Check whether this BlobClient object has been authorized with Shared Key.
            if (blobClient.CanGenerateSasUri)
            {
                // Create a SAS token that's valid for one hour.
                BlobSasBuilder sasBuilder = new BlobSasBuilder()
                {
                    BlobContainerName = blobClient.BlobContainerName,
                    BlobName = blobClient.Name,
                    Resource = "b"
                };

                if (storedPolicyName == null)
                {
                    sasBuilder.ExpiresOn = DateTimeOffset.UtcNow.AddHours(1);
                    sasBuilder.SetPermissions(BlobSasPermissions.Read |
                        BlobSasPermissions.Write);
                }
                else
                {
                    sasBuilder.Identifier = storedPolicyName;
                }

                Uri sasUri = blobClient.GenerateSasUri(sasBuilder);
                Console.WriteLine("SAS URI for blob is: {0}", sasUri);
                Console.WriteLine();

                return sasUri;
            }

            else
            {
                Console.WriteLine(@"BlobClient must be authorized with Shared Key 
                          credentials to create a service SAS.");
                return null;
            }
        }
    }
}
