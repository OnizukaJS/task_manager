﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskManager.Enums;
using TaskManager.Interfaces.workItem;
using TaskManager.Models;
using TaskManager.Models.tag;
using TaskManager.Models.taskToDo;
using TaskManager.Models.workItem;

namespace TaskManager.Controllers.workItem
{
    public class WorkItemQueries : IWorkItemData
    {
        private TaskToDoContext _taskToDoContext;
        public WorkItemQueries(TaskToDoContext taskToDoContext)
        {
            _taskToDoContext = taskToDoContext;
        }

        public WorkItem AddWorkItem(WorkItem workItem)
        {
            workItem.Id = Guid.NewGuid();
            workItem.Type = TaskTypeEnum.WorkItem;
            _taskToDoContext.WorkItems.Add(workItem);
            _taskToDoContext.SaveChanges();
            return workItem;
        }

        public void DeleteWorkItem(WorkItem workItem)
        {
            _taskToDoContext.WorkItems.Remove(workItem);
            _taskToDoContext.SaveChanges();
        }

        public WorkItem EditWorkItem(WorkItem workItem)
        {
            var existingWorkItem = _taskToDoContext.WorkItems.Find(workItem.Id);
            if(existingWorkItem != null)
            {
                existingWorkItem.Name = workItem.Name;
                existingWorkItem.Description = workItem.Description;
                existingWorkItem.Status = workItem.Status;
                existingWorkItem.EmployeeId = workItem.EmployeeId;
                _taskToDoContext.WorkItems.Update(existingWorkItem);
                _taskToDoContext.SaveChanges();
            }
            return workItem;
        }

        public List<WorkItem> GetWorkItems()
        {
            return _taskToDoContext.WorkItems.ToList();
        }

        public WorkItem GetWorkItem(Guid workItemId)
        {
            var existingWorkItem = _taskToDoContext.WorkItems
                .Include(w => w.TaskToDos)
                    .ThenInclude(t => t.Comments)
                .Include(w => w.TaskToDos)
                    .ThenInclude(t => t.Tags)
                .Include(w => w.Comments)
                .Include(w => w.Tags)
                .FirstOrDefault(w => w.Id == workItemId);

            return existingWorkItem;
        }

        public List<Comment> GetWorkItemComments(Guid workItemId)
        {
            return _taskToDoContext.Comments.Where(x => x.WorkItemId == workItemId)
                .OrderByDescending(x => x.CreationDate).ToList();
        }

        public List<Tag> GetWorkItemTags(Guid workItemId)
        {
            return _taskToDoContext.Tags.Where(x => x.WorkItemId == workItemId)
                .OrderBy(x => x.Text).ToList();
        }

        public List<TaskToDo> GetWorkItemTaskToDos(Guid workItemId)
        {
            return _taskToDoContext.TaskToDos.Where(x => x.WorkItemId == workItemId).ToList();
        }
    }
}