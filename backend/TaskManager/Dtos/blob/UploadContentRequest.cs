namespace TaskManager.Dtos.blob
{
    public class UploadContentRequest
    {
        public string Content { get; set; } = null!;
        public string FileName { get; set; } = null!; // What I want it to be named in Blob storage
    }
}
