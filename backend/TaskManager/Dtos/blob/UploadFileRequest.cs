namespace TaskManager.Dtos.blob
{
    public class UploadFileRequest
    {
        public string FilePath { get; set; } = null!;
        public string FileName { get; set; } = null!; // What I want it to be named in Blob storage
    }
}
