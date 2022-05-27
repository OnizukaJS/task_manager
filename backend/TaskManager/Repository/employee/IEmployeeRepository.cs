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
        Employee EditEmployeePassword(Employee employee);
        void DeleteEmployee(Employee employee);
        Employee EditEmployeeProfilePicture(Guid employeeId, string profilePicture);
        Employee DeleteEmployeeProfilePicture(Guid employeeId);
    }
}
