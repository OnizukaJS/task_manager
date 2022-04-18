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
        Employee GetEmployeeByEmail(string employeeEmail);
        Employee RegisterEmployee(Employee employee);
        Employee EditEmployee(Employee employee);
        Employee EditEmployeePassword(Employee employee);
        void DeleteEmployee(Employee employee);
    }
}
