using System;
using System.Collections.Generic;
using TaskManager.Dtos.taskToDoDto;
using TaskManager.Models;
using TaskManager.Models.tag;

namespace TaskManager.Interfaces.task
{
    public interface ITaskToDoData
    {
        List<TaskToDo> GetTasks(); // used
        List<Comment> GetTaskComments(Guid taskId); // used
        List<TaskToDo> GetTasksPerWorkItem(Guid workItemId); // used
        TaskToDo GetTask(Guid taskId); // used
        TaskToDo AddTask(TaskToDo taskToDo); // used
        void DeleteTask(TaskToDo taskToDo); // used
        TaskToDo EditTask(TaskToDo taskToDo); // used
    }
}
