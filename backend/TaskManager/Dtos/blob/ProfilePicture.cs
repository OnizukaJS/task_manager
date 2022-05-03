using Microsoft.AspNetCore.Http;

namespace TaskManager.Dtos.blob
{
    public class ProfilePicture
    {
        public string FileName { get; set; } = null!;
        public IFormFile Image { get; set; } = null!;
    }
}
