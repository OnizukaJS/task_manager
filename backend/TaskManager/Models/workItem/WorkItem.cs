using System;
using System.Collections.Generic;
using TaskManager.Enums;
using TaskManager.Models.employee;
using TaskManager.Models.tag;

namespace TaskManager.Models.workItem
{
    public class WorkItem
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public TaskStatusEnum Status { get; set; } = TaskStatusEnum.New;
        public TaskTypeEnum Type { get; set; } = TaskTypeEnum.WorkItem;

        // Navigatoin Properties
        public Guid? EmployeeId { get; set; }
        public virtual Employee? Employee { get; set; }

        public virtual ICollection<TaskToDo>? TaskToDos { get; set; } = null!;
        public virtual ICollection<Comment>? Comments { get; set; } = null!;
        public virtual ICollection<Tag>? Tags { get; set; } = null!;
    }
}
