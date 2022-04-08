using System;
using System.Collections.Generic;
using System.Linq;
using TaskManager.Dtos.employeeDto;
using TaskManager.Interfaces.employee;
using TaskManager.Models;
using TaskManager.Models.employee;
using TaskManager.Models.taskToDo;

namespace TaskManager.Controllers.employee
{
    public class SqlEmployeeData : IEmployeeData
    {
        private TaskToDoContext _taskToDoContext;
        public SqlEmployeeData(TaskToDoContext taskToDoContext)
        {
            _taskToDoContext = taskToDoContext;
        }

        public Employee AddEmployee(Employee employee)
        {
            employee.EmployeeId = Guid.NewGuid();

            _taskToDoContext.Employees.Add(employee);
            _taskToDoContext.SaveChanges();
            return employee;
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

        public List<Employee> GetEmployeeLogin(string employeeEmail, string employeePassword)
        {
            return _taskToDoContext.Employees
                .Where(x => x.Email.Equals(employeeEmail) && x.Password.Equals(employeePassword))
                .ToList();
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
    }
}
