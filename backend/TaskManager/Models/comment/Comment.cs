using System;
using TaskManager.Models.employee;
using TaskManager.Models.workItem;

namespace TaskManager.Models
{
    public class Comment
    {
        public Guid CommentId { get; set; }
        public string Text { get; set; } = string.Empty;
        public DateTime CreationDate { get; set; }

        // Navigation Properties
        public Guid EmployeeId { get; set; }
        public virtual Employee Employee { get; set; } = null!;
        public Guid? WorkItemId { get; set; }
        public virtual WorkItem? WorkItem { get; set; } = null!;
        public Guid? TaskToDoId { get; set; }
        public virtual TaskToDo? TaskToDo { get; set; } = null!;
    }
}
