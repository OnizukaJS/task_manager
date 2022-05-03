using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using TaskManager.Dtos.blob;
using TaskManager.Interfaces.blob;

namespace TaskManager.Controllers.blob
{
    [ApiController]
    public class BlobsController : Controller
    {
        private readonly IBlobData _blobService;

        public BlobsController(IBlobData blobService)
        {
            _blobService = blobService;
        }

        [HttpGet]
        [Route("api/[controller]/{blobName}")]
        public async Task<IActionResult> GetBlob(string blobName)
        {
            var data = await _blobService.GetBlobAsync(blobName);
            return File(data.Content, data.ContentType);
        }

        [HttpGet]
        [Route("api/[controller]/list")]
        public async Task<IActionResult> ListBlobs()
        {
            return Ok(await _blobService.ListBlobsAsync());
        }

        [HttpPost]
        [Route("api/[controller]/uploadfile")]
        public async Task<IActionResult> UploadFile([FromBody] UploadFileRequest request)
        {
            await _blobService.UploadFileBlobAsync(request.FilePath, request.FileName);
            return Ok();
        }

        [HttpPost]
        [Route("api/[controller]/uploadcontent")]
        public async Task<IActionResult> UploadContent([FromBody] UploadContentRequest request)
        {
            await _blobService.UploadContentBlobAsync(request.Content, request.FileName);
            return Ok();
        }

        [HttpPost]
        [Route("api/[controller]/profilePic")]
        public void UploadProfilePicture([FromForm] ProfilePicture img)
        {
            var image = new Image { FileName = img.FileName };
            byte[]? imageData = null;

            using (var binaryReader = new BinaryReader(img.Image.OpenReadStream()))
            {
                imageData = binaryReader.ReadBytes((int)img.Image.Length);
            }

            image.Picture = imageData;
        }

        [HttpDelete]
        [Route("api/[controller]/{blobName}")]
        public async Task<IActionResult> DeleteFile(string blobName)
        {
            await _blobService.DeleteBlobAsync(blobName);
            return Ok();
        }
    }
}
