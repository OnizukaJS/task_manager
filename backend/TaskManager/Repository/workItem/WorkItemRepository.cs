using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskManager.Enums;
using TaskManager.Models.comment;
using TaskManager.Models.tag;
using TaskManager.Models.taskToDo;
using TaskManager.Models.workItem;

namespace TaskManager.Repository.workItem
{
    public class WorkItemRepository : IWorkItemRepository
    {
        private readonly TaskToDoContext _taskToDoContext;

        public WorkItemRepository(TaskToDoContext taskToDoContext)
        {
            _taskToDoContext = taskToDoContext;
        }

        public WorkItem AddWorkItem(WorkItem workItem)
        {
            workItem.Id = Guid.NewGuid();
            workItem.Type = TaskTypeEnum.WorkItem;
            _taskToDoContext.WorkItems!.Add(workItem);
            _taskToDoContext.SaveChanges();
            return workItem;
        }

        public List<WorkItem> GetWorkItems()
        {
            return _taskToDoContext.WorkItems!.ToList();
        }

        public WorkItem? GetWorkItem(Guid workItemId)
        {
            var existingWorkItem = _taskToDoContext.WorkItems!
                .Include(w => w.TaskToDos!)
                    .ThenInclude(t => t.Comments!)
                .Include(w => w.TaskToDos!)
                    .ThenInclude(t => t.Tags)
                .Include(w => w.Comments)
                .Include(w => w.Tags)
                .FirstOrDefault(w => w.Id == workItemId);

            return existingWorkItem;
        }

        public List<Comment> GetWorkItemComments(Guid workItemId)
        {
            return _taskToDoContext.Comments!.Where(x => x.WorkItemId == workItemId)
                .OrderByDescending(x => x.CreationDate).ToList();
        }

        public List<Tag> GetWorkItemTags(Guid workItemId)
        {
            return _taskToDoContext.Tags!.Where(x => x.WorkItemId == workItemId)
                .OrderBy(x => x.Text).ToList();
        }

        public List<TaskToDo> GetWorkItemTaskToDos(Guid workItemId)
        {
            return _taskToDoContext.TaskToDos!.Where(x => x.WorkItemId == workItemId).ToList();
        }

        public WorkItem UpdateWorkItem(WorkItem workItem)
        {
            _taskToDoContext.WorkItems!.Update(workItem);
            _taskToDoContext.SaveChanges();
            return workItem;
        }

        public void DeleteWorkItem(WorkItem workItem)
        {
            _taskToDoContext.WorkItems!.Remove(workItem);
            _taskToDoContext.SaveChanges();
        }
    }
}
