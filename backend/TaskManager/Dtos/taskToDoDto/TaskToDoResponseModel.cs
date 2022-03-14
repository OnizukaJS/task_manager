using System;
using TaskManager.Enums;

namespace TaskManager.Dtos.taskToDoDto
{
    public class TaskToDoResponseModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public TaskStatusEnum Status { get; set; } = TaskStatusEnum.New;
        public TaskTypeEnum Type { get; set; }
        public Guid? EmployeeId { get; set; }
        public Guid? WorkItemId { get; set; }
    }
}
