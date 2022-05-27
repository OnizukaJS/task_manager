using System;
using System.Collections.Generic;
using TaskManager.Dtos.tagDto;
using TaskManager.Dtos.taskToDoDto;
using TaskManager.Models.taskToDo;

namespace TaskManager.Services.taskToDo
{
    public interface ITaskToDoService
    {
        IEnumerable<TaskToDoResponseModel> GetTasks();
        TaskToDoResponseModel GetTask(Guid taskId);
        TaskToDoResponseModel UpdateTask(Guid taskId, TaskToDoUpdateModel taskUpdateModel);
        void DeleteTask(Guid taskId);
        IEnumerable<TagResponseModel> GetTagsPerTask(Guid taskId);
    }
}
