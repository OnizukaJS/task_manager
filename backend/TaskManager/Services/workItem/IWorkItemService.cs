using System;
using System.Collections.Generic;
using TaskManager.Dtos.workItemDto;

namespace TaskManager.Services.workItem
{
    public interface IWorkItemService
    {
        IEnumerable<WorkItemResponseModel> GetWorkItems();
        WorkItemResponseModel UpdateWorkItem(Guid workItemId, WorkItemCreateUpdateModel workItemUpdateModel);
    }
}
