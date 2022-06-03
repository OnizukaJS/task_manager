using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TaskManager.Dtos.mailDto;
using TaskManager.Models.mail;
using TaskManager.Services.mail;

namespace TaskManager.Controllers.mail
{
    [ApiController]
    [Route("api/[controller]")]
    public class MailsController : ControllerBase
    {
        private readonly IMailService _mailService;

        public MailsController(IMailService mailService)
        {
            _mailService = mailService;
        }

        [HttpPost("Email")]
        public async Task<IActionResult> SendMail([FromForm] MailRequest request)
        {
            await _mailService.SendMailAsync(request);
            return Ok();
        }

        [HttpPost("WelcomeEmail")]
        public async Task<IActionResult> SendWelcomeMail([FromForm] WelcomeEmail welcomeEmail)
        {
            await _mailService.SendWelcomeEmailAsync(welcomeEmail);
            return Ok();

        }
    }
}
