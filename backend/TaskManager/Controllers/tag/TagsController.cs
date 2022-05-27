﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TaskManager.Dtos.tagDto;
using TaskManager.Models.tag;
using TaskManager.Repository.tag;
using TaskManager.Services.tag;

namespace TaskManager.Controllers.tag
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagsController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;
        private readonly IMapper _mapper;
        private readonly ITagService _tagService;

        public TagsController(ITagRepository tagRepository, IMapper mapper, ITagService tagService)
        {
            _tagRepository = tagRepository;
            _mapper = mapper;
            _tagService = tagService;
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
