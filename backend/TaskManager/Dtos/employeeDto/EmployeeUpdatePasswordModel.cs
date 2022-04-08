namespace TaskManager.Dtos.employeeDto
{
    public class EmployeeUpdatePasswordModel
    {
        public string Password { get; set; } = string.Empty;
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
