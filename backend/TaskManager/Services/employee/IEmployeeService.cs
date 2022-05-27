using System;
using System.Collections.Generic;
using TaskManager.Dtos.employeeDto;

namespace TaskManager.Services.employee
{
    public interface IEmployeeService
    {
        IEnumerable<EmployeeResponseModel> GetEmployees();
        EmployeeResponseModel UpdateEmployee(Guid employeeId, EmployeeUpdateModel employeeUpdateModel);
    }
}
