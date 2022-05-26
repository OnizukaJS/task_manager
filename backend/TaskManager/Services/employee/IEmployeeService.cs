using System;
using System.Collections.Generic;
using TaskManager.Dtos.employeeDto;

namespace TaskManager.Interfaces.employee
{
    public interface IEmployeeService
    {
        IEnumerable<EmployeeResponseModel> GetEmployees();
        EmployeeResponseModel UpdateEmployee(Guid id, EmployeeUpdateModel employeeUpdateModel);
    }
}
