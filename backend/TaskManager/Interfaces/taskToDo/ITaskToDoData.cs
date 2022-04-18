using System;
using System.Collections.Generic;
using TaskManager.Dtos.taskToDoDto;
using TaskManager.Models;
using TaskManager.Models.tag;

namespace TaskManager.Interfaces.task
{
    public interface ITaskToDoData
    {
        List<TaskToDo> GetTasks();
        List<Comment> GetTaskComments(Guid taskId);
        List<TaskToDo> GetTasksPerWorkItem(Guid workItemId);
        TaskToDo GetTask(Guid taskId);
        TaskToDo AddTask(TaskToDo taskToDo);
        void DeleteTask(TaskToDo taskToDo);
        TaskToDo EditTask(TaskToDo taskToDo);
    }
}
