using Microsoft.AspNetCore.Http;

namespace TaskManager.Models.profilePicture
{
    public class ProfilePicture
    {
        public string FileName { get; set; } = null!;
        public IFormFile FormFile { get; set; } = null!;
    }
}
