using System;
using System.Collections.Generic;
using TaskManager.Models.tag;

namespace TaskManager.Repository.tag
{
    public interface ITagRepository
    {
        List<Tag> GetTags();
        Tag? GetTag(Guid tagId);
        List<Tag> GetTagsPerWorkItem(Guid workItemId);
        List<Tag> GetTagsPerTask(Guid taskId);
        Tag AddTag(Tag tag);
        void DeleteTag(Tag tag);
    }
}
