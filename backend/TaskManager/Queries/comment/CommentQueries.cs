using System;
using System.Collections.Generic;
using System.Linq;
using TaskManager.Interfaces.comment;
using TaskManager.Models.comment;
using TaskManager.Models.taskToDo;

namespace TaskManager.Queries.comment
{
    public class CommentQueries : ICommentData
    {
        private TaskToDoContext _taskToDoContext;
        public CommentQueries(TaskToDoContext taskToDoContext)
        {
            _taskToDoContext = taskToDoContext;
        }

        public Comment AddComment(Comment comment)
        {
            comment.CommentId = Guid.NewGuid();
            comment.CreationDate = DateTime.Now;

            _taskToDoContext.Comments.Add(comment);
            _taskToDoContext.SaveChanges();
            return comment;
        }

        public void DeleteComment(Comment comment)
        {
            _taskToDoContext.Comments.Remove(comment);
            _taskToDoContext.SaveChanges();
        }

        public Comment GetComment(Guid commentId)
        {
            var existingComment = _taskToDoContext.Comments.Find(commentId);
            return existingComment;
        }

        public List<Comment> GetComments()
        {
            return _taskToDoContext.Comments
                .ToList();
        }

        public List<Comment> GetCommentsPerWorkItemOrderedByCreationDataDesc(Guid workItemId)
        {
            return _taskToDoContext.Comments
                .Where(x => x.WorkItemId == workItemId)
                .OrderByDescending(x => x.CreationDate).ToList();
        }

        public List<Comment> GetCommentsPerTaskToDoOrderedByCreationDataDesc(Guid taskId)
        {
            return _taskToDoContext.Comments
                .Where(x => x.TaskToDoId == taskId)
                .OrderByDescending(x => x.CreationDate).ToList();
        }
    }
}
