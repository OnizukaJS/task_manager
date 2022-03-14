using System;
using TaskManager.Enums;

namespace TaskManager.Dtos.workItem
{
    public class WorkItemCreateEditModel
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public TaskStatusEnum Status { get; set; } = TaskStatusEnum.New;
        public TaskTypeEnum Type { get; set; } = TaskTypeEnum.WorkItem;
        public Guid? EmployeeId { get; set; }

    }
}
