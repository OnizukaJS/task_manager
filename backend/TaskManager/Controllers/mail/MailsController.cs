using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using TaskManager.Dtos.mail;
using TaskManager.Interfaces.mail;
using TaskManager.Models.mail;

namespace TaskManager.Controllers.mail
{
    [ApiController]
    public class MailsController : ControllerBase
    {
        private readonly IMailData _mailQueries;

        public MailsController(IMailData mailQueries)
        {
            _mailQueries = mailQueries;
        }

        [HttpPost]
        [Route("api/[controller]/Email")]
        public async Task<IActionResult> SendMail([FromForm] MailRequest request)
        {
            await _mailQueries.SendMailAsync(request);
            return Ok();
        }

        [HttpPost]
        [Route("api/[controller]/WelcomeEmail")]
        public async Task<IActionResult> SendWelcomeMail([FromForm] WelcomeEmail welcomeEmail)
        {
            await _mailQueries.SendWelcomeEmailAsync(welcomeEmail);
            return Ok();

        }
    }
}
