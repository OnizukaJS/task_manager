using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace TaskManager.Models.mail
{
    public class MailRequest
    {
        public string ToEmail { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
        public List<IFormFile> Attachments { get; set; } = null!;
    }
}
