using System;
using System.Collections.Generic;
using TaskManager.Dtos.CommentDto;

namespace TaskManager.Services.comment
{
    public interface ICommentService
    {
        IEnumerable<CommentResponseModel> GetComments();
        CommentResponseModel GetComment(Guid commentId);
        void DeleteComment(Guid commentId);
    }
}
