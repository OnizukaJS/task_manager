using System;
using System.Collections.Generic;
using TaskManager.Models;

namespace TaskManager.Interfaces.comment
{
    public interface ICommentData
    {
        List<Comment> GetComments();
        Comment GetComment(Guid commentId);
        List<Comment> GetCommentsPerWorkItemOrderedByCreationDataDesc(Guid workItemId);
        List<Comment> GetCommentsPerTaskToDoOrderedByCreationDataDesc(Guid taskToDoId);
        Comment AddComment(Comment comment);
        void DeleteComment(Comment comment);
    }
}
