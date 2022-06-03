using BC = BCrypt.Net.BCrypt;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskManager.Models.employee;
using TaskManager.Models.taskToDo;

namespace TaskManager.Repository.employee
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly TaskToDoContext _taskToDoContext;

        public EmployeeRepository(TaskToDoContext taskToDoContext)
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

        public Employee UpdateEmployee(Employee employee)
        {
            _taskToDoContext.Employees.Update(employee);
            _taskToDoContext.SaveChanges();
            return employee;
        }

        public Employee UpdateEmployeePassword(Employee employee)
        {
            _taskToDoContext.Employees.Update(employee);
            _taskToDoContext.SaveChanges();
            return employee;
        }

        public Employee GetEmployee(Guid employeeId)
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

        public Employee UpdateEmployeeProfilePicture(Employee employee)
        {
            _taskToDoContext.Employees.Update(employee);
            _taskToDoContext.SaveChanges();
            return employee;
        }

        public Employee DeleteEmployeeProfilePicture(Employee employee)
        {
            _taskToDoContext.Employees.Update(employee);
            _taskToDoContext.SaveChanges();
            return employee;
        }

        public bool EmployeeEmailAlreadyInUse(string employeeEmail)
        {
            var alreadyInUse = _taskToDoContext.Employees.Any(e => e.Email == employeeEmail);
            return alreadyInUse;
        }
    }
}
