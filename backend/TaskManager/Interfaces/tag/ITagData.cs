using System;
using System.Collections.Generic;
using TaskManager.Models.tag;

namespace TaskManager.Interfaces.tag
{
    public interface ITagData
    {
        List<Tag> GetTags(); // used
        Tag GetTag(Guid tagId); // used
        List<Tag> GetTagsPerWorkItemOrderedByAlphabeticText(Guid workItemId); // used
        List<Tag> GetTagsPerTaskToDoOrderedByAlphabeticText(Guid taskId); // used
        Tag AddTag(Tag tag); // used
        void DeleteTag(Tag tag); // used
    }
}
