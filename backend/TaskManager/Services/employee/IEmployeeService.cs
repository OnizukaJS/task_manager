using System;
using System.Collections.Generic;
using TaskManager.Dtos.employeeDto;

namespace TaskManager.Services.employee
{
    public interface IEmployeeService
    {
        EmployeeResponseModel RegisterEmployee(EmployeeRegistrationModel employeeRegistration);
        EmployeeResponseModel AuthenticateEmployee(EmployeeLoginModel employeeLogin);
        IEnumerable<EmployeeResponseModel> GetEmployees();
        EmployeeResponseModel GetEmployee(Guid employeeId);
        EmployeeResponseModel UpdateEmployee(Guid employeeId, EmployeeUpdateModel employeeUpdateModel);
        EmployeeResponseModel UpdateEmployeePassword(Guid employeeId, EmployeeUpdatePasswordModel employeePassword);
        void DeleteEmployee(Guid employeeId);
    }
}
