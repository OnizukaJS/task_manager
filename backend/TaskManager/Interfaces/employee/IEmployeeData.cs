﻿using System;
using System.Collections.Generic;
using TaskManager.Dtos.employeeDto;
using TaskManager.Models.employee;

namespace TaskManager.Interfaces.employee
{
    public interface IEmployeeData
    {
        List<Employee> GetEmployees();
        Employee GetEmployeeById(Guid employeeId);
        Employee GetEmployeeByEmail(string employeeEmail);
        Employee RegisterEmployee(Employee employee);
        Employee UpdateEmployee(Employee employee);
        Employee EditEmployeePassword(Employee employee);
        void DeleteEmployee(Employee employee);
        Employee EditEmployeeProfilePicture(Guid employeeId, string profilePicture);
        Employee DeleteEmployeeProfilePicture(Guid employeeId);
    }
}
