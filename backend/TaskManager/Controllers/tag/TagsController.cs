using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TaskManager.Dtos.tagDto;
using TaskManager.Models.tag;
using TaskManager.Repository.tag;

namespace TaskManager.Controllers.tag
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagsController : ControllerBase
    {
        private ITagRepository _tagRepository;
        private IMapper _mapper;

        public TagsController(ITagRepository tagRepository, IMapper mapper)
        {
            _tagRepository = tagRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult AddTag([FromBody] TagCreateModel tagCreate)
        {
            var tag = _mapper.Map<Tag>(tagCreate);

            _tagRepository.AddTag(tag);

            var tagResponse = _mapper.Map<TagResponseModel>(tag);

            return Created(HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + "/" + tagResponse.TagId, tagResponse);
        }

        [HttpGet]
        public IActionResult GetTags()
        {
            var existingTags = _tagRepository.GetTags();

            var tagsDto = _mapper.Map<IEnumerable<TagResponseModel>>(existingTags);
            return Ok(tagsDto);
        }

        [HttpGet("{tagId}")]
        public IActionResult GetTag(Guid tagId)
        {
            var existingTag = _tagRepository.GetTag(tagId);

            if (existingTag != null)
            {
                var tagDto = _mapper.Map<TagResponseModel>(existingTag);
                return Ok(tagDto);
            }

            return NotFound($"The tag with the Id: {tagId} does not exist");
        }

        [HttpDelete("{tagId}")]
        public IActionResult DeleteTag(Guid tagId)
        {
            var tagToDelete = _tagRepository.GetTag(tagId);

            if (tagToDelete != null)
            {
                _tagRepository.DeleteTag(tagToDelete);
                return Ok();
            }

            return NotFound($"The tag with the Id: {tagId} does not exist");
        }
    }
}
