using Microsoft.AspNetCore.Mvc;
using System;
using TaskManager.Dtos.tagDto;
using TaskManager.Services.tag;

namespace TaskManager.Controllers.tag
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagsController : ControllerBase
    {
        private readonly ITagService _tagService;

        public TagsController(ITagService tagService)
        {
            _tagService = tagService;
        }

        [HttpPost]
        public IActionResult AddTag([FromBody] TagCreateModel tagCreate)
        {
            var tagResponse = _tagService.AddTag(tagCreate);
            return CreatedAtAction("AddTag", new { id = tagResponse.TagId }, tagResponse);
        }

        [HttpGet]
        public IActionResult GetTags()
        {
            var tags = _tagService.GetTags();
            return Ok(tags);
        }

        [HttpGet("{tagId}")]
        public IActionResult GetTag(Guid tagId)
        {
            var tag = _tagService.GetTag(tagId);
            return Ok(tag);
        }

        [HttpDelete("{tagId}")]
        public IActionResult DeleteTag(Guid tagId)
        {
            _tagService.DeleteTag(tagId);
            return Ok();
        }
    }
}
