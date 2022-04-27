using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManager.Models.blob;

namespace TaskManager.Interfaces.blob
{
    public interface IBlobData
    {
        public Task<BlobModel> GetBlobAsync(string name);
        public Task<IEnumerable<string>> ListBlobsAsync();
        public Task UploadFileBlobAsync(string filePath, string fileName);
        public Task UploadContentBlobAsync(string content, string fileName);
        public Task DeleteBlobAsync(string blobName);
    }
}
