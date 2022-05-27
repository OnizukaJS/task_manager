using System;
using System.Collections.Generic;
using TaskManager.Models.comment;

namespace TaskManager.Repository.comment
{
    public interface ICommentRepository
    {
        List<Comment> GetComments();
        Comment GetComment(Guid commentId);
        List<Comment> GetCommentsPerWorkItem(Guid workItemId);
        List<Comment> GetCommentsPerTask(Guid taskToDoId);
        Comment AddComment(Comment comment);
        void DeleteComment(Comment comment);
    }
}
