using System;
using System.Collections.Generic;
using TaskManager.Dtos.taskToDoDto;

namespace TaskManager.Services.taskToDo
{
    public interface ITaskToDoService
    {
        IEnumerable<TaskToDoResponseModel> GetTasks();
        TaskToDoResponseModel UpdateTask(Guid taskId, TaskToDoUpdateModel taskUpdateModel);
    }
}
