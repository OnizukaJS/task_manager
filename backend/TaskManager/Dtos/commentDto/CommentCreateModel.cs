using System;

namespace TaskManager.Dtos.CommentDto
{
    public class CommentCreateModel
    {
        public string Text { get; set; } = string.Empty;
        public Guid? TaskToDoId { get; set; }
        public Guid EmployeeId { get; set; }
        public Guid? WorkItemId { get; set; }
    }
}
