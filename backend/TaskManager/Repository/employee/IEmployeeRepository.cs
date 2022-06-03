using System;
using System.Collections.Generic;
using TaskManager.Models.employee;

namespace TaskManager.Repository.employee
{
    public interface IEmployeeRepository
    {
        List<Employee> GetEmployees();
        Employee GetEmployee(Guid employeeId);
        Employee GetEmployeeByEmail(string employeeEmail);
        Employee RegisterEmployee(Employee employee);
        Employee UpdateEmployee(Employee employee);
        Employee UpdateEmployeePassword(Employee employee);
        void DeleteEmployee(Employee employee);
        Employee UpdateEmployeeProfilePicture(Employee employee);
        Employee DeleteEmployeeProfilePicture(Employee employee);
        bool EmployeeEmailAlreadyInUse(string employeeEmail);
    }
}
