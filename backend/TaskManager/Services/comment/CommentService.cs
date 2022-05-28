using AutoMapper;
using System;
using System.Collections.Generic;
using TaskManager.Dtos.CommentDto;
using TaskManager.Models.comment;
using TaskManager.Repository.comment;

namespace TaskManager.Services.comment
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IMapper _mapper;

        public CommentService(ICommentRepository commentRepository, IMapper mapper)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
        }

        public CommentResponseModel AddComment(CommentCreateModel comment)
        {
            var commentToCreate = _mapper.Map<Comment>(comment);
            _commentRepository.AddComment(commentToCreate);
            var commentResponse = _mapper.Map<CommentResponseModel>(commentToCreate);
            return commentResponse;
        }

        public IEnumerable<CommentResponseModel> GetComments()
        {
            var comments = _commentRepository.GetComments();
            var commentsDto = _mapper.Map<IEnumerable<CommentResponseModel>>(comments);
            return commentsDto;
        }

        public CommentResponseModel GetComment(Guid commentId)
        {
            var existingComment = _commentRepository.GetComment(commentId);
            if (existingComment == null)
            {
                throw new KeyNotFoundException();
            }

            return _mapper.Map<CommentResponseModel>(existingComment);
        }

        public void DeleteComment(Guid commentId)
        {
            var commentToDelete = _commentRepository.GetComment(commentId);
            if (commentToDelete == null)
            {
                throw new KeyNotFoundException();
            }

            _commentRepository.DeleteComment(commentToDelete); 
        }
    }
}
