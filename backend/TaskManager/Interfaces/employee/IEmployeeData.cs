using System;
using System.Collections.Generic;
using TaskManager.Dtos.employeeDto;
using TaskManager.Models.employee;

namespace TaskManager.Interfaces.employee
{
    public interface IEmployeeData
    {
        List<Employee> GetEmployees();
        Employee GetEmployeeById(Guid employeeId);
        List<Employee> AuthenticateEmployee(string employeeEmail, string employeePassword);
        Employee AuthenticateNew(EmployeeLoginModel employeeLogin);
        Employee RegisterEmployee(Employee employee);
        Employee EditEmployee(Employee employee);
        Employee EditEmployeePassword(Employee employee);
    }
}
