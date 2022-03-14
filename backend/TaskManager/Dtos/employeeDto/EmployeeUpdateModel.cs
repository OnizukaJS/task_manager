namespace TaskManager.Dtos.employeeDto
{
    public class EmployeeUpdateModel
    {
        public string Email { get; set; } = string.Empty;
        public string EmployeeName { get; set; } = string.Empty;
        public string EmployeeSurname { get; set; } = string.Empty;
        public int EmployeeAge { get; set; }
        public string City { get; set; } = string.Empty;
    }
}
