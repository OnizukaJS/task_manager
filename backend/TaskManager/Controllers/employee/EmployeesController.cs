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
using Azure.Storage.Blobs;
using TaskManager.Interfaces.profilePicture;
using TaskManager.Interfaces.mail;
using TaskManager.Dtos.mail;

namespace TaskManager.Controllers.employee
{
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private string blobStorageConnectionString = "DefaultEndpointsProtocol=https;AccountName=mytaskmanagerblobstorage;AccountKey=8ko4p8gVDbsFNR+ix61bDQthTh5cD7OKCIPXkFaA6hfKPnPmciLVZeesH4UIQndUWbwq6On93UIfd3J94Tva7g==;EndpointSuffix=core.windows.net";
        private string blobStorageContainerName = "profilepicture";
        private IEmployeeData _employeeData;
        private IProfilePictureData _profilePictureData;
        private IMailData _mailData;
        private readonly TaskToDoContext _context;
        private readonly IMapper _mapper;

        public EmployeesController(IEmployeeData employeeData, IProfilePictureData profilePictureData, IMailData mailData, 
            TaskToDoContext context, IMapper mapper)
        {
            _employeeData = employeeData;
            _profilePictureData = profilePictureData;
            _mailData = mailData;
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
                return BadRequest("Email already in use.");
            }

            _employeeData.RegisterEmployee(employee);

            var employeeResponse = _mapper.Map<EmployeeResponseModel>(employee);

            var welcomeEmail = new WelcomeEmail()
            {
                ToEmail = employeeRegistration.Email,
                UserName = $"{employeeRegistration.EmployeeName} {employeeRegistration.EmployeeSurname}",
            };
            _mailData.SendWelcomeEmailAsync(welcomeEmail);

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

                foreach (var employee in employeesDto)
                {
                    var filename = employee.ProfilePicture;
                    BlobClient blobClient = new BlobClient(blobStorageConnectionString, blobStorageContainerName, filename);
                    employee.SasUriProfilPicture = filename != null ? _profilePictureData.GetServiceSasUriForBlob(blobClient) : null;
                }

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
            var filename = existingEmployee.ProfilePicture;
            BlobClient blobClient = new BlobClient(blobStorageConnectionString, blobStorageContainerName, filename);

            if (existingEmployee != null)
            {
                var employeeDto = _mapper.Map<EmployeeResponseModel>(existingEmployee);
                employeeDto.SasUriProfilPicture = filename != null ? _profilePictureData.GetServiceSasUriForBlob(blobClient) : null;
                //var employeeDto = new EmployeeResponseModel()
                //{
                //    EmployeeId = existingEmployee.EmployeeId,
                //    Email = existingEmployee.Email,
                //    Password = existingEmployee.Password,
                //    EmployeeName = existingEmployee.EmployeeName,
                //    EmployeeSurname = existingEmployee.EmployeeSurname,
                //    EmployeeAge = existingEmployee.EmployeeAge,
                //    City = existingEmployee.City,
                //    JobDescription = existingEmployee.JobDescription,
                //    PhoneNumber = existingEmployee.PhoneNumber,
                //    ProfilePicture = existingEmployee.ProfilePicture,
                //    SasUriProfilPicture = filename != null ? _profilePictureData.GetServiceSasUriForBlob(blobClient) : null,
                //};

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
