using Microsoft.AspNetCore.Http;
using System;

namespace TaskManager.Models.profilePicture
{
    public class ProfilePicture
    {
        public Guid EmployeeId { get; set; }
        public string FileName { get; set; } = string.Empty;
        public IFormFile FormFile { get; set; } = null!;
    }
}
