using System;

namespace TaskManager.Dtos.tag
{
    public class TagResponseModel
    {
        public Guid TagId { get; set; }
        public string Text { get; set; } = string.Empty;
        public DateTime CreationDate { get; set; }
        public Guid? TaskToDoId { get; set; }
        public Guid? WorkItemId { get; set; }
    }
}
