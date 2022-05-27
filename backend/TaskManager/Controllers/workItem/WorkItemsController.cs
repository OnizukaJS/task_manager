using AutoMapper;
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
        private readonly IWorkItemRepository _workItemRepository;
        private readonly ITaskToDoRepository _taskToDoRepository;
        private readonly ICommentRepository _commentRepository;
        private readonly ITagRepository _tagRepository;
        private readonly IMapper _mapper;
        private readonly IWorkItemService _workItemService;

        public WorkItemsController(IWorkItemRepository workItemRepository, ITaskToDoRepository taskToDoRepository, ICommentRepository commentRepository, 
            ITagRepository tagRepository, IMapper mapper, IWorkItemService workItemService)
        {
            _workItemRepository = workItemRepository;
            _taskToDoRepository = taskToDoRepository;
            _commentRepository = commentRepository;
            _tagRepository = tagRepository;
            _mapper = mapper;
            _workItemService = workItemService;
        }

        [HttpPost]
        public IActionResult AddTask(WorkItemCreateUpdateModel workItemCreate)
        {
            var workItem = _mapper.Map<WorkItem>(workItemCreate);

            _workItemRepository.AddWorkItem(workItem);

            var workItemResponse = _mapper.Map<WorkItemResponseModel>(workItem);

            return Created(HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + "/" + workItemResponse.Id, workItemResponse);
        }

        [HttpPatch("{workItemId}")]
        public IActionResult EditWorkItem(Guid workItemId, WorkItemCreateUpdateModel workItemUpdate)
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
            var existingTasksPerWorkItem = _taskToDoRepository.GetTasksPerWorkItem(workItemId);

            var tasksPerWorkItemDto = _mapper.Map<IEnumerable<TaskToDoResponseModel>>(existingTasksPerWorkItem);
            return Ok(tasksPerWorkItemDto);
        }

        [HttpGet("{workItemId}/comments")]
        public IActionResult GetWorkItemComments(Guid workItemId)
        {
            // TODO: Make the order in the SQL (more powerful because SQL is to manage data) and change the name
            var existingCommentsPerWorkItem = _commentRepository.GetCommentsPerWorkItemOrderedByCreationDataDesc(workItemId);

            var commentsPerWorkItemDto = _mapper.Map <IEnumerable<CommentResponseModel>>(existingCommentsPerWorkItem);
            return Ok(commentsPerWorkItemDto);
        }

        [HttpGet("{workItemId}/tags")]
        public IActionResult GetTagsPerWorkItemOrderedByAlphabeticText(Guid workItemId)
        {
            var existingTagsPerWorkItem = _tagRepository.GetTagsPerWorkItemOrderedByAlphabeticText(workItemId);

            var tagsPerWorkItemDto = _mapper.Map<IEnumerable<TagResponseModel>>(existingTagsPerWorkItem);
            return Ok(tagsPerWorkItemDto);
        }

        [HttpDelete("{workItemId}")]
        public IActionResult DeleteWorkItem(Guid workItemId)
        {
            _workItemService.DeleteWorkItem(workItemId);
            return Ok();
        }
    }
}
