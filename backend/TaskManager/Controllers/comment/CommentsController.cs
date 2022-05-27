using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TaskManager.Dtos.CommentDto;
using TaskManager.Models.comment;
using TaskManager.Repository.comment;

namespace TaskManager.Controllers.comment
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private ICommentRepository _commentRepository;
        private IMapper _mapper;

        public CommentsController(ICommentRepository commentRepository, IMapper mapper)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult AddComment(CommentCreateModel commentCreate)
        {
            var comment = _mapper.Map<Comment>(commentCreate);

            _commentRepository.AddComment(comment);

            var commentResponse = _mapper.Map<CommentResponseModel>(comment);

            // TODO: check notes
            return Created(HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + "/" + commentResponse.CommentId, commentResponse);
        }

        [HttpGet]
        public IActionResult GetComments()
        {
            var existingComments = _commentRepository.GetComments();

            var commentsDto = _mapper.Map<IEnumerable<CommentResponseModel>>(existingComments);
            return Ok(commentsDto);
        }

        [HttpGet("{commentId}")]
        public IActionResult GetComment(Guid commentId)
        {
            var existingComment = _commentRepository.GetComment(commentId);

            if (existingComment != null)
            {
                var commentsDto = _mapper.Map<CommentResponseModel>(existingComment);
                return Ok(commentsDto);
            }

            return NotFound($"The comment with the Id: {commentId} does not exist");
        }

        [HttpDelete("{commentId}")]
        public IActionResult DeleteComment(Guid commentId)
        {
            var commentToDelete = _commentRepository.GetComment(commentId);

            if (commentToDelete != null)
            {
                _commentRepository.DeleteComment(commentToDelete);
                return Ok();
            }

            return NotFound($"The comment with the Id: {commentId} does not exist");
        }
    }
}
