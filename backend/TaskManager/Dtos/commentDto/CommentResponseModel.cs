using System;

namespace TaskManager.Dtos.CommentDto
{
    public class CommentResponseModel // What you return to the frontend
    {
        public Guid CommentId { get; set; }
        public string Text { get; set; } = string.Empty;
        public DateTime CreationDate { get; set; }
        public Guid EmployeeId { get; set; }
        public Guid? WorkItemId { get; set; }
        public Guid? TaskToDoId { get; set; }
    }
}
