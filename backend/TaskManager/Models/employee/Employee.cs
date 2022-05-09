using System;
using System.Collections.Generic;
using TaskManager.Models.workItem;

namespace TaskManager.Models.employee
{
    public class Employee
    {
        public Guid EmployeeId { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string EmployeeName { get; set; } = string.Empty;
        public string EmployeeSurname { get; set; } = string.Empty;
        public int EmployeeAge { get; set; }
        public string City { get; set; } = string.Empty;
        public string JobDescription { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string? ProfilePicture { get; set; } = string.Empty;

        // Navigation Properties
        public virtual ICollection<WorkItem> WorkItems { get; set; } = null!;
        public virtual ICollection<TaskToDo> TasksToDo { get; set; } = null!;
    }
}
