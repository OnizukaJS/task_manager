using BC = BCrypt.Net.BCrypt; // NEW
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskManager.Dtos.employeeDto;
using TaskManager.Interfaces.employee;
using TaskManager.Models.employee;
using TaskManager.Models.taskToDo;

namespace TaskManager.Controllers.employee
{
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private IEmployeeData _employeeData;
        private readonly TaskToDoContext _context;
        private readonly IMapper _mapper;

        public EmployeesController(IEmployeeData employeeData, TaskToDoContext context, IMapper mapper)
        {
            _employeeData = employeeData;
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("api/[controller]")]
        public IActionResult RegisterEmployee(EmployeeRegistrationModel employeeRegistration)
        {
            var employee = _mapper.Map<Employee>(employeeRegistration);

            if (_context.Employees.Any(e => e.Email == employeeRegistration.Email))
            {
                return NotFound("Email already in use.");
            }

            _employeeData.RegisterEmployee(employee);

            var employeeResponse = _mapper.Map<EmployeeResponseModel>(employee);

            return Created(HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + "/" + employeeResponse.EmployeeId, employeeResponse);
        }

        [HttpPost]
        [Route("api/[controller]/authenticate")]
        public ActionResult<List<Employee>> AuthenticateEmployee([FromBody] EmployeeLoginModel employeeLogin)
        {
            var employee = _employeeData.GetEmployeeByEmail(employeeLogin.EmployeeEmail);

            if (employee == null)
            {
                return NotFound("User not found.");
            }

            if (!BC.Verify(employeeLogin.EmployeePassword, employee.Password))
            {
                return NotFound("Invalid password");
            }

            var employeesDto = new EmployeeResponseModel()
            {
                EmployeeId = employee.EmployeeId,
                Email = employee.Email,
                Password = employee.Password,
                EmployeeName = employee.EmployeeName,
                EmployeeSurname = employee.EmployeeSurname,
                EmployeeAge = employee.EmployeeAge,
                City = employee.City,
                JobDescription = employee.JobDescription,
                PhoneNumber = employee.PhoneNumber,
            };

            return Ok(employeesDto);
        }

        [HttpGet]
        [Route("api/[controller]")]
        public IActionResult GetEmployees()
        {
            try
            {
                var employees = _employeeData.GetEmployees();

                var employeesDto = _mapper.Map<IEnumerable<EmployeeResponseModel>>(employees);
                return Ok(employeesDto);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
            
        }

        [HttpGet]
        [Route("api/[controller]/{employeeId}")]
        public IActionResult GetEmployee(Guid employeeId)
        {
            var existingEmployee = _employeeData.GetEmployeeById(employeeId);

            if (existingEmployee != null)
            {
                var employeeDto = _mapper.Map<EmployeeResponseModel>(existingEmployee);
                return Ok(employeeDto);
            }

            return NotFound($"The employee with the Id: {employeeId} does not exist");
        }

        [HttpPatch]
        [Route("api/[controller]/{employeeId}")]
        public IActionResult EditEmployee(EmployeeUpdateModel employeeUpdate, Guid employeeId)
        {
            var existingEmployee = _employeeData.GetEmployeeById(employeeId);

            if (existingEmployee != null)
            {
                var employee = _mapper.Map<Employee>(employeeUpdate);
                employee.EmployeeId = existingEmployee.EmployeeId;
                _employeeData.EditEmployee(employee);

            }

            return Ok(employeeUpdate);
        }

        [HttpPatch]
        [Route("api/[controller]/{employeeId}/password")]
        public IActionResult EditEmployeePassword(EmployeeUpdatePasswordModel employeePassword, Guid employeeId)
        {
            var existingEmployee = _employeeData.GetEmployeeById(employeeId);

            if (existingEmployee != null)
            {
                if (employeePassword.Password != employeePassword.ConfirmPassword)
                {
                    return NotFound("The password and the confirmation do not match");
                }

                var employee = _mapper.Map<Employee>(employeePassword);
                employee.EmployeeId = existingEmployee.EmployeeId;
                _employeeData.EditEmployeePassword(employee);
                return Ok(employeePassword); 
            }

            return NotFound($"The employee with the Id: {employeeId} does not exist");
        }

        [HttpDelete]
        [Route("api/[controller]/delete/{employeeId}")]
        public IActionResult DeleteEmployee(Guid employeeId)
        {
            var employeeToDelete = _employeeData.GetEmployeeById(employeeId);

            if (employeeToDelete != null)
            {
                _employeeData.DeleteEmployee(employeeToDelete);
                return Ok();
            }

            return NotFound($"The employee with the Id: {employeeId} does not exist");
        }
    }
}
