using System;
using System.Collections.Generic;
using TaskManager.Enums;
using TaskManager.Models.employee;
using TaskManager.Models.tag;
using TaskManager.Models.workItem;

namespace TaskManager.Models
{
    public class TaskToDo
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public TaskStatusEnum Status { get; set; } = TaskStatusEnum.New;
        public TaskTypeEnum Type { get; set; }

        // Navigation Properties
        public Guid EmployeeId { get; set; }
        public virtual Employee? Employee { get; set; } = null!;
        public Guid WorkItemId { get; set; }
        public virtual WorkItem? WorkItem { get; set; } = null!;

        public virtual ICollection<Comment>? Comments { get; set; } = null!;
        public virtual ICollection<Tag>? Tags { get; set; } = null!;
    }
}
