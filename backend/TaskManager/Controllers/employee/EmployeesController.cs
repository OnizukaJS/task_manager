using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TaskManager.Dtos.employeeDto;
using TaskManager.Models.employee;
using TaskManager.Services.employee;

namespace TaskManager.Controllers.employee
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeesController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpPost]
        public IActionResult RegisterEmployee(EmployeeRegistrationModel employeeRegistration)
        {
            var employeeResponse = _employeeService.RegisterEmployee(employeeRegistration);
            return CreatedAtAction("RegisterEmployee", new { id = employeeResponse.EmployeeId }, employeeResponse);
        }

        [HttpPost("authenticate")]
        public ActionResult<List<Employee>> AuthenticateEmployee([FromBody] EmployeeLoginModel employeeLogin)
        {
            var employeeResponse = _employeeService.AuthenticateEmployee(employeeLogin);
            return Ok(employeeResponse);
        }

        [HttpPatch("{employeeId}")]
        public IActionResult UpdateEmployee(EmployeeUpdateModel employeeUpdate, Guid employeeId)
        {
            var employee = _employeeService.UpdateEmployee(employeeId, employeeUpdate);
            return Ok(employee);
        }

        [HttpPatch("{employeeId}/password")]
        public IActionResult UpdateEmployeePassword(Guid employeeId, EmployeeUpdatePasswordModel employeePassword)
        {
            var employee = _employeeService.UpdateEmployeePassword(employeeId, employeePassword);
            return Ok(employee);
        }

        [HttpGet]
        public IActionResult GetEmployees()
        {
            var employees = _employeeService.GetEmployees();
            return Ok(employees);
        }

        [HttpGet("{employeeId}")]
        public IActionResult GetEmployee(Guid employeeId)
        {
            var employee = _employeeService.GetEmployee(employeeId);
            return Ok(employee);
        }

        [HttpDelete("delete/{employeeId}")]
        public IActionResult DeleteEmployee(Guid employeeId)
        {
            _employeeService.DeleteEmployee(employeeId);
            return Ok();
        }
    }
}
