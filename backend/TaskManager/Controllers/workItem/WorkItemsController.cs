﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TaskManager.Dtos.CommentDto;
using TaskManager.Dtos.tagDto;
using TaskManager.Dtos.taskToDoDto;
using TaskManager.Dtos.workItemDto;
using TaskManager.Models.workItem;
using TaskManager.Repository.comment;
using TaskManager.Repository.tag;
using TaskManager.Repository.taskToDo;
using TaskManager.Repository.workItem;
using TaskManager.Services.workItem;

namespace TaskManager.Controllers.workItem
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkItemsController : ControllerBase
    {
        private readonly IWorkItemService _workItemService;

        public WorkItemsController(IWorkItemService workItemService)
        {
            _workItemService = workItemService;
        }

        [HttpPost]
        public IActionResult AddWorkItem(WorkItemCreateUpdateModel workItemCreate)
        {
            var workItemResponse = _workItemService.AddWorkItem(workItemCreate);
            return Created(HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + "/" + workItemResponse.Id, workItemResponse);
        }

        [HttpPatch("{workItemId}")]
        public IActionResult UpdateWorkItem(Guid workItemId, WorkItemCreateUpdateModel workItemUpdate)
        {
            var workItem =  _workItemService.UpdateWorkItem(workItemId, workItemUpdate);
            return Ok(workItem);
        }

        [HttpGet]
        public IActionResult GetWorkItems()
        {
            var workItems = _workItemService.GetWorkItems();
            return Ok(workItems);
        }

        [HttpGet("{workItemId}")]
        public IActionResult GetWorkItem(Guid workItemId)
        {
            var workItem = _workItemService.GetWorkItem(workItemId);
            return Ok(workItem);
        }

        [HttpGet("{workItemId}/taskToDos")]
        public IActionResult GetTasksPerWorkItem(Guid workItemId)
        {
            var tasksPerWorkItem = _workItemService.GetTasksPerWorkItem(workItemId);
            return Ok(tasksPerWorkItem);
        }

        [HttpGet("{workItemId}/comments")]
        public IActionResult GetWorkItemComments(Guid workItemId)
        {
            var commentsPerWorkItem = _workItemService.GetCommentsPerWorkItem(workItemId);
            return Ok(commentsPerWorkItem);
        }

        [HttpGet("{workItemId}/tags")]
        public IActionResult GetTagsPerWorkItemOrderedByAlphabeticText(Guid workItemId)
        {
            var tagsPerWorkItem = _workItemService.GetTagsPerWorkItem(workItemId);
            return Ok(tagsPerWorkItem);
        }

        [HttpDelete("{workItemId}")]
        public IActionResult DeleteWorkItem(Guid workItemId)
        {
            _workItemService.DeleteWorkItem(workItemId);
            return Ok();
        }
    }
}
