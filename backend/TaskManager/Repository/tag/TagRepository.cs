using System;
using System.Collections.Generic;
using System.Linq;
using TaskManager.Models.tag;
using TaskManager.Models.taskToDo;

namespace TaskManager.Repository.tag
{
    public class TagRepository : ITagRepository
    {
        private readonly TaskToDoContext _taskToDoContext;

        public TagRepository(TaskToDoContext taskToDoContext)
        {
            _taskToDoContext = taskToDoContext;
        }

        public Tag AddTag(Tag tag)
        {
            tag.TagId = Guid.NewGuid();
            tag.CreationDate = DateTime.Now;

            _taskToDoContext.Tags.Add(tag);
            _taskToDoContext.SaveChanges();
            return tag;
        }

        public void DeleteTag(Tag tag)
        {
            _taskToDoContext.Tags.Remove(tag);
            _taskToDoContext.SaveChanges();
        }

        public Tag GetTag(Guid tagId)
        {
            var existingTag = _taskToDoContext.Tags.Find(tagId);
            return existingTag;
        }

        public List<Tag> GetTags()
        {
            return _taskToDoContext.Tags.OrderBy(t => t.Text).ToList();
        }

        public List<Tag> GetTagsPerWorkItemOrderedByAlphabeticText(Guid workItemId)
        {
            return _taskToDoContext.Tags
                .Where(x => x.WorkItemId == workItemId)
                .OrderByDescending(t => t.Text).ToList();
        }

        public List<Tag> GetTagsPerTask(Guid taskId)
        {
            return _taskToDoContext.Tags
                .Where(x => x.TaskToDoId == taskId)
                .OrderByDescending(t => t.Text).ToList();
        }
    }
}
