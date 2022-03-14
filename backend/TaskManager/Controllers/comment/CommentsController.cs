using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TaskManager.Dtos.CommentDto;
using TaskManager.Interfaces.comment;
using TaskManager.Models;

namespace TaskManager.Controllers.comment
{
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private ICommentData _commentData;
        private IMapper _mapper;

        public CommentsController(ICommentData commentData, IMapper mapper)
        {
            _commentData = commentData;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("api/[controller]")]
        public IActionResult GetComments()
        {
            var existingComments = _commentData.GetComments();

            var commentsDto = _mapper.Map<IEnumerable<CommentResponseModel>>(existingComments);
            return Ok(commentsDto);
        }

        [HttpGet]
        [Route("api/[controller]/{commentId}")]
        public IActionResult GetComment(Guid commentId)
        {
            var existingComment = _commentData.GetComment(commentId);

            if (existingComment != null)
            {
                var commentsDto = _mapper.Map<CommentResponseModel>(existingComment);
                return Ok(commentsDto);
            }

            return NotFound($"The comment with the Id: {commentId} does not exist");
        }

        [HttpPost]
        [Route("api/[controller]")]
        public IActionResult AddComment(CommentCreateModel commentCreate)
        {
            var comment = _mapper.Map<Comment>(commentCreate);

            _commentData.AddComment(comment);

            var commentResponse = _mapper.Map<CommentResponseModel>(comment);

            return Created(HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + "/" + commentResponse.CommentId, commentResponse);
        }

        [HttpDelete]
        [Route("api/[controller]/{commentId}")]
        public IActionResult DeleteComment(Guid commentId)
        {
            var commentToDelete = _commentData.GetComment(commentId);

            if (commentToDelete != null)
            {
                _commentData.DeleteComment(commentToDelete);
                return Ok();
            }

            return NotFound($"The comment with the Id: {commentId} does not exist");
        }
    }
}
