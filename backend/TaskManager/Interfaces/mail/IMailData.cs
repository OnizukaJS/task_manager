using System.Threading.Tasks;
using TaskManager.Dtos.mail;
using TaskManager.Models.mail;

namespace TaskManager.Interfaces.mail
{
    public interface IMailData
    {
        Task SendMailAsync(MailRequest mailRequest);
        Task SendWelcomeEmailAsync(WelcomeEmail welcomeEmail);
    }
}
