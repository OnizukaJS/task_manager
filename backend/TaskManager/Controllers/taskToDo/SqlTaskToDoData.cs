using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskManager.Interfaces.task;
using TaskManager.Models;
using TaskManager.Models.tag;
using TaskManager.Models.taskToDo;

namespace TaskManager.Controllers.taskToDo
{
    public class SqlTaskToDoData : ITaskToDoData
    {
        private TaskToDoContext _taskToDoContext;
        public SqlTaskToDoData(TaskToDoContext taskToDoContext)
        {
            _taskToDoContext = taskToDoContext;
        }
        
        public TaskToDo AddTask(TaskToDo taskToDo)
        {
            taskToDo.Id = Guid.NewGuid();
            _taskToDoContext.TaskToDos.Add(taskToDo);
            _taskToDoContext.SaveChanges();
            return taskToDo;
        }

        public void DeleteTask(TaskToDo taskToDo)
        {
            _taskToDoContext.TaskToDos.Remove(taskToDo);
            _taskToDoContext.SaveChanges();
        }

        public TaskToDo EditTask(TaskToDo taskToDo)
        {
            var existingTaskToDo = _taskToDoContext.TaskToDos.Find(taskToDo.Id);
            if(existingTaskToDo != null)
            {
                existingTaskToDo.Name = taskToDo.Name;
                existingTaskToDo.Description = taskToDo.Description;
                existingTaskToDo.Status = taskToDo.Status;
                existingTaskToDo.EmployeeId = taskToDo.EmployeeId;
                _taskToDoContext.TaskToDos.Update(existingTaskToDo);
                _taskToDoContext.SaveChanges();
            }
            return taskToDo;
        }

        public TaskToDo GetTask(Guid id)
        {
            var existingTaskToDo = _taskToDoContext.TaskToDos
                .Include(t => t.Comments)
                .Include(t => t.Tags)
                .FirstOrDefault(t => t.Id == id);

            return existingTaskToDo;
        }

        public List<TaskToDo> GetTasks()
        {
            return _taskToDoContext.TaskToDos.ToList();
        }

        public List<Comment> GetTaskComments(Guid taskId)
        {
            return _taskToDoContext.Comments.Where(x => x.TaskToDoId == taskId)
                .OrderByDescending(x => x.CreationDate).ToList();
        }

        public List<TaskToDo> GetTasksPerWorkItem(Guid workItemId)
        {
            return _taskToDoContext.TaskToDos
                .Where(x => x.WorkItemId == workItemId)
                .ToList();
        }
    }
}
