using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Extensions;
using TaskManager.Interfaces.blob;
using TaskManager.Models.blob;

namespace TaskManager.Queries.blob
{
    public class BlobQueries : IBlobData
    {
        private readonly BlobServiceClient _blobServiceClient;
        private IHostEnvironment _env;

        public BlobQueries(BlobServiceClient blobServiceClient, IHostEnvironment env)
        {
            _blobServiceClient = blobServiceClient;
            _env = env;
        }

        public async Task<BlobModel> GetBlobAsync(string name)
        {
            // container's name on azure
            var containerClient = _blobServiceClient.GetBlobContainerClient("profilepicture");
            var blobClient = containerClient.GetBlobClient(name);
            var blobDownloadInfo = await blobClient.DownloadAsync();

            return new BlobModel(blobDownloadInfo.Value.Content, blobDownloadInfo.Value.ContentType);
        }

        public async Task<IEnumerable<string>> ListBlobsAsync()
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient("profilepicture");
            var items = new List<string>();

            await foreach(var blobItem in containerClient.GetBlobsAsync())
            {
                items.Add(blobItem.Name);
            }

            return items;
        }

        //public IActionResult uploadAttachment(IFormFile file)
        //{
        //    var dir = _env.ContentRootPath;

        //    using (var fileStream = new FileStream(Path.Combine(dir, "file.png"), FileMode.Create, FileAccess.Write))
        //    {
        //        file.CopyTo(fileStream);
        //    }


        //}

        public async Task UploadFileBlobAsync(string filePath, string fileName)
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient("profilepicture");
            var blobClient = containerClient.GetBlobClient(fileName);
            await blobClient.UploadAsync(filePath, new BlobHttpHeaders { ContentType = filePath.GetContentType() });
        }

        public async Task UploadContentBlobAsync(string content, string fileName)
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient("profilepicture");
            var blobClient = containerClient.GetBlobClient(fileName);
            var bytes = Encoding.UTF8.GetBytes(content);
            await using var memoryStream = new MemoryStream(bytes);
            await blobClient.UploadAsync(memoryStream, new BlobHttpHeaders { ContentType = fileName.GetContentType() });
        }

        public async Task DeleteBlobAsync(string blobName)
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient("profilepicture");
            var blobClient = containerClient.GetBlobClient(blobName);
            await blobClient.DeleteIfExistsAsync();
        }
    }
}
