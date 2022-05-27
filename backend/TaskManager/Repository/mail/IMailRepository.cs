using System.Threading.Tasks;
using TaskManager.Dtos.mailDto;
using TaskManager.Models.mail;

namespace TaskManager.Repository.mail
{
    public interface IMailRepository
    {
        Task SendMailAsync(MailRequest mailRequest);
        Task SendWelcomeEmailAsync(WelcomeEmail welcomeEmail);
    }
}
