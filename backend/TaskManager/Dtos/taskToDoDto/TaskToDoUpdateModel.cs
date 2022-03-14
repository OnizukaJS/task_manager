using System;
using TaskManager.Enums;

namespace TaskManager.Dtos.taskToDoDto
{
    public class TaskToDoUpdateModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public TaskStatusEnum Status { get; set; } = TaskStatusEnum.New;
        public Guid EmployeeId { get; set; }
    }
}
