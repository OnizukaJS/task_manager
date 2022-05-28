using Microsoft.AspNetCore.Mvc;
using System;
using TaskManager.Dtos.CommentDto;
using TaskManager.Services.comment;

namespace TaskManager.Controllers.comment
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpPost]
        public IActionResult AddComment(CommentCreateModel commentCreate)
        {
            var commentResponse = _commentService.AddComment(commentCreate);
            return Created(HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + "/" + commentResponse.CommentId, commentResponse);
        }

        [HttpGet]
        public IActionResult GetComments()
        {
            var comments = _commentService.GetComments();
            return Ok(comments);
        }

        [HttpGet("{commentId}")]
        public IActionResult GetComment(Guid commentId)
        {
            var comment = _commentService.GetComment(commentId);
            return Ok(comment);
        }

        [HttpDelete("{commentId}")]
        public IActionResult DeleteComment(Guid commentId)
        {
            _commentService.DeleteComment(commentId);
            return Ok();
        }
    }
}
