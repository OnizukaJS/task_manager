using System;
using TaskManager.Models.taskToDo;
using TaskManager.Models.workItem;

namespace TaskManager.Models.tag
{
    public class Tag
    {
        public Guid TagId { get; set; }
        public string Text { get; set; } = string.Empty;
        public DateTime CreationDate { get; set; }

        // Navigation Properties
        public Guid? WorkItemId { get; set; }
        public virtual WorkItem? WorkItem { get; set; } = null!;
        public Guid? TaskToDoId { get; set; }
        public virtual TaskToDo? TaskToDo { get; set; } = null!;
    }
}
