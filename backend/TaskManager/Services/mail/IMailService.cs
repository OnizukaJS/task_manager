using System.Threading.Tasks;
using TaskManager.Dtos.mailDto;
using TaskManager.Models.mail;

namespace TaskManager.Services.mail
{
    public interface IMailService
    {
        Task SendMailAsync(MailRequest mailRequest);
        Task SendWelcomeEmailAsync(WelcomeEmail welcomeEmail);
    }
}
