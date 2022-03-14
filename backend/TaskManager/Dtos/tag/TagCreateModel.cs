using System;

namespace TaskManager.Dtos.tag
{
    public class TagCreateModel
    {
        public string Text { get; set; } = string.Empty;
        public Guid? TaskToDoId { get; set; }
        public Guid? WorkItemId { get; set; }
    }
}
