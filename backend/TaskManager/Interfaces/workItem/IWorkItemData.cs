using System;
using System.Collections.Generic;
using TaskManager.Models;
using TaskManager.Models.tag;
using TaskManager.Models.workItem;

namespace TaskManager.Interfaces.workItem
{
    public interface IWorkItemData
    {
        List<WorkItem> GetWorkItems();
        WorkItem GetWorkItem(Guid workItemId);
        WorkItem AddWorkItem(WorkItem workItem);
        void DeleteWorkItem(WorkItem workItem);
        WorkItem EditWorkItem(WorkItem workItem);
    }
}
