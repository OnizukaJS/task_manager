using AutoMapper;
using System.Collections.Generic;
using TaskManager.Dtos.CommentDto;
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

        public IEnumerable<CommentResponseModel> GetComments()
        {
            var comments = _commentRepository.GetComments();
            var commentsDto = _mapper.Map<IEnumerable<CommentResponseModel>>(comments);
            return commentsDto;
        }
    }
}
