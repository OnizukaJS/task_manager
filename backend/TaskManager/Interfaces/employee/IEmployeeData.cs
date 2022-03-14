using System;
using System.Collections.Generic;
using TaskManager.Models.employee;

namespace TaskManager.Interfaces.employee
{
    public interface IEmployeeData
    {
        List<Employee> GetEmployees(); // used
        Employee GetEmployeeById(Guid employeeId); // used
        List<Employee> GetEmployeeLogin(string employeeEmail, string employeePassword); // used
        Employee AddEmployee(Employee employee); // used
        Employee EditEmployee(Employee employee); // used
    }
}
