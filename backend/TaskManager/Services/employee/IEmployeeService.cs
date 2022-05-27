using System;
using System.Collections.Generic;
using TaskManager.Dtos.employeeDto;

namespace TaskManager.Services.employee
{
    public interface IEmployeeService
    {
        IEnumerable<EmployeeResponseModel> GetEmployees();
        EmployeeResponseModel GetEmployee(Guid employeeId);
        EmployeeResponseModel UpdateEmployee(Guid employeeId, EmployeeUpdateModel employeeUpdateModel);
        void DeleteEmployee(Guid employeeId);
    }
}
