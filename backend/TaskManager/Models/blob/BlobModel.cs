using System.IO;

namespace TaskManager.Models.blob
{
    public class BlobModel
    {
        public BlobModel(Stream content, string contentType)
        {
            Content = content;
            ContentType = contentType;
        }

        public Stream Content { get; set; } = new MemoryStream();
        public string ContentType { get; set; } = null!;
    }
}
