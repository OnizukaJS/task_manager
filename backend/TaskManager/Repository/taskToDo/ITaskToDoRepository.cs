using System;
using System.Collections.Generic;
using TaskManager.Models.comment;
using TaskManager.Models.taskToDo;

namespace TaskManager.Repository.taskToDo
{
    public interface ITaskToDoRepository
    {
        List<TaskToDo> GetTasks();
        List<Comment> GetTaskComments(Guid taskId);
        List<TaskToDo> GetTasksPerWorkItem(Guid workItemId);
        TaskToDo GetTask(Guid taskId);
        TaskToDo AddTask(TaskToDo taskToDo);
        void DeleteTask(TaskToDo taskToDo);
        TaskToDo UpdateTask(TaskToDo taskToDo);
    }
}
