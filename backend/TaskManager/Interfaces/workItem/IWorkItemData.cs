using System;
using System.Collections.Generic;
using TaskManager.Models;
using TaskManager.Models.tag;
using TaskManager.Models.workItem;

namespace TaskManager.Interfaces.workItem
{
    public interface IWorkItemData
    {
        List<WorkItem> GetWorkItems(); // used
        WorkItem GetWorkItem(Guid workItemId); // used
        WorkItem AddWorkItem(WorkItem workItem); // used
        void DeleteWorkItem(WorkItem workItem); // used
        WorkItem EditWorkItem(WorkItem workItem); // used
    }
}
