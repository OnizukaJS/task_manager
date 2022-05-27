using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TaskManager.Dtos.CommentDto;
using TaskManager.Models.comment;
using TaskManager.Repository.comment;
using TaskManager.Services.comment;

namespace TaskManager.Controllers.comment
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IMapper _mapper;
        private readonly ICommentService _commentService;

        public CommentsController(ICommentRepository commentRepository, IMapper mapper, ICommentService commentService)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
            _commentService = commentService;
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
