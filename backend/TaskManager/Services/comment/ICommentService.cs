using System;
using System.Collections.Generic;
using TaskManager.Dtos.CommentDto;

namespace TaskManager.Services.comment
{
    public interface ICommentService
    {
        CommentResponseModel AddComment(CommentCreateModel comment);
        IEnumerable<CommentResponseModel> GetComments();
        CommentResponseModel GetComment(Guid commentId);
        void DeleteComment(Guid commentId);
    }
}
