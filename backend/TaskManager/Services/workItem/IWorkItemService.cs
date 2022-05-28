using System;
using System.Collections.Generic;
using TaskManager.Dtos.CommentDto;
using TaskManager.Dtos.tagDto;
using TaskManager.Dtos.taskToDoDto;
using TaskManager.Dtos.workItemDto;

namespace TaskManager.Services.workItem
{
    public interface IWorkItemService
    {
        WorkItemResponseModel AddWorkItem(WorkItemCreateUpdateModel workItem);
        IEnumerable<WorkItemResponseModel> GetWorkItems();
        WorkItemResponseModel GetWorkItem(Guid workItemId);
        WorkItemResponseModel UpdateWorkItem(Guid workItemId, WorkItemCreateUpdateModel workItemUpdateModel);
        void DeleteWorkItem(Guid workItemId);
        IEnumerable<TaskToDoResponseModel> GetTasksPerWorkItem(Guid workItemId);
        IEnumerable<TagResponseModel> GetTagsPerWorkItem(Guid workItemId);
        IEnumerable<CommentResponseModel> GetCommentsPerWorkItem(Guid workItemId);
    }
}
