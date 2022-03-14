using System;
using System.Collections.Generic;
using TaskManager.Models;

namespace TaskManager.Interfaces.comment
{
    public interface ICommentData
    {
        List<Comment> GetComments(); // used
        Comment GetComment(Guid commentId); // used
        List<Comment> GetCommentsPerWorkItemOrderedByCreationDataDesc(Guid workItemId); // used
        List<Comment> GetCommentsPerTaskToDoOrderedByCreationDataDesc(Guid taskToDoId); // used
        Comment AddComment(Comment comment); // used
        void DeleteComment(Comment comment); // used
    }
}
