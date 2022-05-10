using BC = BCrypt.Net.BCrypt;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskManager.Interfaces.employee;
using TaskManager.Models.employee;
using TaskManager.Models.taskToDo;
using TaskManager.Models.profilePicture;

namespace TaskManager.Controllers.employee
{
    public class EmployeeQueries : IEmployeeData
    {
        private TaskToDoContext _taskToDoContext;
        public EmployeeQueries(TaskToDoContext taskToDoContext)
        {
            _taskToDoContext = taskToDoContext;
        }

        public Employee RegisterEmployee(Employee employee)
        {
            employee.EmployeeId = Guid.NewGuid();

            employee.Password = BC.HashPassword(employee.Password);

            _taskToDoContext.Employees.Add(employee);
            _taskToDoContext.SaveChanges();
            return employee;
        }

        public Employee GetEmployeeByEmail(string employeeEmail)
        {
            return _taskToDoContext.Employees
                .SingleOrDefault(x => x.Email.Equals(employeeEmail));
        }

        public Employee EditEmployee(Employee employee)
        {
            var existingEmployee = _taskToDoContext.Employees.Find(employee.EmployeeId);
            if (existingEmployee != null)
            {
                existingEmployee.EmployeeName = employee.EmployeeName;
                existingEmployee.EmployeeSurname = employee.EmployeeSurname;
                existingEmployee.EmployeeAge = employee.EmployeeAge;
                existingEmployee.Email = employee.Email;
                existingEmployee.City = employee.City;
                existingEmployee.JobDescription = employee.JobDescription;
                existingEmployee.PhoneNumber = employee.PhoneNumber;
                _taskToDoContext.Employees.Update(existingEmployee);
                _taskToDoContext.SaveChanges();
            }
            return employee;
        }

        public Employee EditEmployeePassword(Employee employee)
        {
            var existingEmployee = _taskToDoContext.Employees.Find(employee.EmployeeId);
            if (existingEmployee != null)
            {
                existingEmployee.Password = employee.Password;
                _taskToDoContext.Employees.Update(existingEmployee);
                _taskToDoContext.SaveChanges();
            }
            return employee;
        }        

        public Employee GetEmployeeById(Guid employeeId)
        {
            var existingEmployee = _taskToDoContext.Employees
                .Find(employeeId);

            return existingEmployee;
        }

        public List<Employee> GetEmployees()
        {
            return _taskToDoContext.Employees.ToList();
        }

        public void DeleteEmployee(Employee employee)
        {
            _taskToDoContext.Employees.Remove(employee);
            _taskToDoContext.SaveChanges();
        }

        public Employee EditEmployeeProfilePicture(Guid employeeId, string profilePicture)
        {
            var existingEmployee = _taskToDoContext.Employees.Find(employeeId);

            if (existingEmployee != null)
            {
                existingEmployee.ProfilePicture = profilePicture;
                _taskToDoContext.Employees.Update(existingEmployee);
                _taskToDoContext.SaveChanges();

                return existingEmployee;
            }

            return existingEmployee;
        }

        public Employee DeleteEmployeeProfilePicture(Guid employeeId)
        {
            var existingEmployee = _taskToDoContext.Employees.Find(employeeId);

            if (existingEmployee != null)
            {
                existingEmployee.ProfilePicture = null;
                _taskToDoContext.Employees.Update(existingEmployee);
                _taskToDoContext.SaveChanges();
            }

            return existingEmployee;
        }
    }
}
