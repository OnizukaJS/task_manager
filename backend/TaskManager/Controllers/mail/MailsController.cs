using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TaskManager.Dtos.mail;
using TaskManager.Models.mail;
using TaskManager.Repository.mail;

namespace TaskManager.Controllers.mail
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailsController : ControllerBase
    {
        private readonly IMailRepository _mailQueries;

        public MailsController(IMailRepository mailQueries)
        {
            _mailQueries = mailQueries;
        }

        [HttpPost]
        [Route("Email")]
        public async Task<IActionResult> SendMail([FromForm] MailRequest request)
        {
            await _mailQueries.SendMailAsync(request);
            return Ok();
        }

        [HttpPost]
        [Route("WelcomeEmail")]
        public async Task<IActionResult> SendWelcomeMail([FromForm] WelcomeEmail welcomeEmail)
        {
            await _mailQueries.SendWelcomeEmailAsync(welcomeEmail);
            return Ok();

        }
    }
}
