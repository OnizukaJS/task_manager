using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TaskManager.Dtos.tag;
using TaskManager.Interfaces.tag;
using TaskManager.Models.tag;

namespace TaskManager.Controllers.tag
{
    public class TagsController : ControllerBase
    {
        private ITagData _tagData;
        private IMapper _mapper;

        public TagsController(ITagData tagData, IMapper mapper)
        {
            _tagData = tagData;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("api/[controller]")]
        public IActionResult GetTags()
        {
            var existingTags = _tagData.GetTags();

            var tagsDto = _mapper.Map<IEnumerable<TagResponseModel>>(existingTags);
            return Ok(tagsDto);
        }

        [HttpGet]
        [Route("api/[controller]/{tagId}")]
        public IActionResult GetTag(Guid tagId)
        {
            var existingTag = _tagData.GetTag(tagId);

            if (existingTag != null)
            {
                var tagDto = _mapper.Map<TagResponseModel>(existingTag);
                return Ok(tagDto);
            }

            return NotFound($"The tag with the Id: {tagId} does not exist");
        }

        [HttpPost]
        [Route("api/[controller]")]
        public IActionResult AddTag([FromBody]TagCreateModel tagCreate)
        {
            var tag = _mapper.Map<Tag>(tagCreate);

            _tagData.AddTag(tag);

            var tagResponse = _mapper.Map<TagResponseModel>(tag);

            return Created(HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + "/" + tagResponse.TagId, tagResponse);
        }

        [HttpDelete]
        [Route("api/[controller]/{tagId}")]
        public IActionResult DeleteTag(Guid tagId)
        {
            var tagToDelete = _tagData.GetTag(tagId);

            if (tagToDelete != null)
            {
                _tagData.DeleteTag(tagToDelete);
                return Ok();
            }

            return NotFound($"The tag with the Id: {tagId} does not exist");
        }
    }
}
