namespace TaskManager.Dtos.employeeDto
{
    public class EmployeeRegistrationModel
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string EmployeeName { get; set; } = string.Empty;
        public string EmployeeSurname { get; set; } = string.Empty;
        public int EmployeeAge { get; set; }
        public string City { get; set; } = string.Empty;
        public string JobDescription { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
    }
}
