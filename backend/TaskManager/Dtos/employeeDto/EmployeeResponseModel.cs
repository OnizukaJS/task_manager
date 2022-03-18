﻿using System;

namespace TaskManager.Dtos.employeeDto
{
    public class EmployeeResponseModel
    {
        public Guid EmployeeId { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string EmployeeName { get; set; } = null!;
        public string EmployeeSurname { get; set; } = null!;
        public int EmployeeAge { get; set; }
        public string City { get; set; } = null!;
    }
}