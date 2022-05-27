using BC = BCrypt.Net.BCrypt;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskManager.Dtos.employeeDto;
using TaskManager.Models.employee;
using TaskManager.Models.taskToDo;
using Azure.Storage.Blobs;
using TaskManager.Dtos.mailDto;
using TaskManager.Services.employee;
using TaskManager.Repository.employee;
using TaskManager.Repository.mail;
using TaskManager.Services.profilePicture;

namespace TaskManager.Controllers.employee
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly string blobStorageConnectionString = "DefaultEndpointsProtocol=https;AccountName=mytaskmanagerblobstorage;AccountKey=8ko4p8gVDbsFNR+ix61bDQthTh5cD7OKCIPXkFaA6hfKPnPmciLVZeesH4UIQndUWbwq6On93UIfd3J94Tva7g==;EndpointSuffix=core.windows.net";
        private readonly string blobStorageContainerName = "profilepicture";
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IProfilePictureService _profilePictureService;
        private readonly IMailRepository _mailRepository;
        private readonly TaskToDoContext _context;
        private readonly IMapper _mapper;
        private readonly IEmployeeService _employeeService;

        public EmployeesController(IEmployeeRepository employeeRepository, IProfilePictureService profilePictureService, IMailRepository mailRepository,
            TaskToDoContext context, IMapper mapper, IEmployeeService employeeService)
        {
            _employeeRepository = employeeRepository;
            _profilePictureService = profilePictureService;
            _mailRepository = mailRepository;
            _context = context;
            _mapper = mapper;
            _employeeService = employeeService;
        }

        [HttpPost]
        public IActionResult RegisterEmployee(EmployeeRegistrationModel employeeRegistration)
        {
            var employee = _mapper.Map<Employee>(employeeRegistration);

            if (_context.Employees.Any(e => e.Email == employeeRegistration.Email))
            {
                return BadRequest("Email already in use.");
            }

            _employeeRepository.RegisterEmployee(employee);

            var employeeResponse = _mapper.Map<EmployeeResponseModel>(employee);

            var welcomeEmail = new WelcomeEmail()
            {
                ToEmail = employeeRegistration.Email,
                UserName = $"{employeeRegistration.EmployeeName} {employeeRegistration.EmployeeSurname}",
            };
            _mailRepository.SendWelcomeEmailAsync(welcomeEmail);

            return Created(HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + "/" + employeeResponse.EmployeeId, employeeResponse);
        }

        [HttpPost("authenticate")]
        public ActionResult<List<Employee>> AuthenticateEmployee([FromBody] EmployeeLoginModel employeeLogin)
        {
            var employee = _employeeRepository.GetEmployeeByEmail(employeeLogin.EmployeeEmail);

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
                EmployeeName = employee.EmployeeName,
                EmployeeSurname = employee.EmployeeSurname,
                EmployeeAge = employee.EmployeeAge,
                City = employee.City,
                JobDescription = employee.JobDescription,
                PhoneNumber = employee.PhoneNumber,
            };

            return Ok(employeesDto);
        }

        [HttpPatch("{employeeId}")]
        public IActionResult EditEmployee(EmployeeUpdateModel employeeUpdate, Guid employeeId)
        {
            var employee = _employeeService.UpdateEmployee(employeeId, employeeUpdate);
            return Ok(employee);
        }

        [HttpPatch("{employeeId}/password")]
        public IActionResult EditEmployeePassword(EmployeeUpdatePasswordModel employeePassword, Guid employeeId)
        {
            var existingEmployee = _employeeRepository.GetEmployee(employeeId);

            if (existingEmployee != null)
            {
                if (employeePassword.Password != employeePassword.ConfirmPassword)
                {
                    return NotFound("The password and the confirmation do not match");
                }

                var employee = _mapper.Map<Employee>(employeePassword);
                employee.EmployeeId = existingEmployee.EmployeeId;
                _employeeRepository.EditEmployeePassword(employee);
                return Ok(employeePassword);
            }

            return NotFound($"The employee with the Id: {employeeId} does not exist");
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
