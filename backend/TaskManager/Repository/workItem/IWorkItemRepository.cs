using System;
using System.Collections.Generic;
using TaskManager.Models.workItem;

namespace TaskManager.Repository.workItem
{
    public interface IWorkItemRepository
    {
        List<WorkItem> GetWorkItems();
        WorkItem GetWorkItem(Guid workItemId);
        WorkItem AddWorkItem(WorkItem workItem);
        void DeleteWorkItem(WorkItem workItem);
        WorkItem UpdateWorkItem(WorkItem workItem);
    }
}
