using System;
using System.Collections.Generic;
using TaskManager.Models.tag;

namespace TaskManager.Interfaces.tag
{
    public interface ITagData
    {
        List<Tag> GetTags();
        Tag GetTag(Guid tagId);
        List<Tag> GetTagsPerWorkItemOrderedByAlphabeticText(Guid workItemId);
        List<Tag> GetTagsPerTaskToDoOrderedByAlphabeticText(Guid taskId);
        Tag AddTag(Tag tag);
        void DeleteTag(Tag tag);
    }
}
