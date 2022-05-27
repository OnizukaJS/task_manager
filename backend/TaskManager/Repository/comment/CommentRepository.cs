using System;
using System.Collections.Generic;
using System.Linq;
using TaskManager.Models.comment;
using TaskManager.Models.taskToDo;

namespace TaskManager.Repository.comment
{
    public class CommentRepository : ICommentRepository
    {
        private readonly TaskToDoContext _taskToDoContext;

        public CommentRepository(TaskToDoContext taskToDoContext)
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

        public List<Comment> GetCommentsPerWorkItem(Guid workItemId)
        {
            return _taskToDoContext.Comments
                .Where(x => x.WorkItemId == workItemId)
                .OrderByDescending(x => x.CreationDate).ToList();
        }

        public List<Comment> GetCommentsPerTask(Guid taskId)
        {
            return _taskToDoContext.Comments
                .Where(x => x.TaskToDoId == taskId)
                .OrderByDescending(x => x.CreationDate).ToList();
        }
    }
}
