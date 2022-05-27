using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TaskManager.Dtos.CommentDto;
using TaskManager.Dtos.tag;
using TaskManager.Dtos.taskToDoDto;
using TaskManager.Dtos.workItem;
using TaskManager.Models.workItem;
using TaskManager.Repository.comment;
using TaskManager.Repository.tag;
using TaskManager.Repository.taskToDo;
using TaskManager.Repository.workItem;

namespace TaskManager.Controllers.workItem
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkItemsController : ControllerBase
    {
        private IWorkItemRepository _workItemRepository;
        private ITaskToDoRepository _taskToDoRepository;
        private ICommentRepository _commentRepository;
        private ITagRepository _tagRepository;
        private IMapper _mapper;

        public WorkItemsController(IWorkItemRepository workItemRepository, ITaskToDoRepository taskToDoRepository, ICommentRepository commentRepository, ITagRepository tagRepository, IMapper mapper)
        {
            _workItemRepository = workItemRepository;
            _taskToDoRepository = taskToDoRepository;
            _commentRepository = commentRepository;
            _tagRepository = tagRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult AddTask(WorkItemCreateEditModel workItemCreate)
        {
            var workItem = _mapper.Map<WorkItem>(workItemCreate);

            _workItemRepository.AddWorkItem(workItem);

            var workItemResponse = _mapper.Map<WorkItemResponseModel>(workItem);

            return Created(HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + "/" + workItemResponse.Id, workItemResponse);
        }

        [HttpPatch]
        [Route("{workItemId}")]
        public IActionResult EditWorkItem(Guid workItemId, WorkItemCreateEditModel workItemUpdate)
        {
            var existingWorkItem = _workItemRepository.GetWorkItem(workItemId);

            if (existingWorkItem != null)
            {
                var workItemDto = _mapper.Map<WorkItem>(workItemUpdate);
                workItemDto.Id = existingWorkItem.Id;
                _workItemRepository.EditWorkItem(workItemDto);
            }

            return Ok(workItemUpdate);
        }

        [HttpGet]
        public IActionResult GetWorkItems()
        {
            var existingWorkItems = _workItemRepository.GetWorkItems();

            var workItemsDto = _mapper.Map<IEnumerable<WorkItemResponseModel>>(existingWorkItems);
            return Ok(workItemsDto);
        }

        [HttpGet]
        [Route("{workItemId}")]
        public IActionResult GetWorkItem(Guid workItemId)
        {
            var existingWorkItemToDo = _workItemRepository.GetWorkItem(workItemId);

            if (existingWorkItemToDo != null)
            {
                var workItemDto = _mapper.Map<WorkItemResponseModel>(existingWorkItemToDo);
                return Ok(workItemDto);
            }

            return NotFound($"This workItem with the Id: {workItemId} does not exist");
        }

        [HttpGet]
        [Route("{workItemId}/taskToDos")]
        public IActionResult GetTasksPerWorkItem(Guid workItemId)
        {
            var existingTasksPerWorkItem = _taskToDoRepository.GetTasksPerWorkItem(workItemId);

            var tasksPerWorkItemDto = _mapper.Map<IEnumerable<TaskToDoResponseModel>>(existingTasksPerWorkItem);
            return Ok(tasksPerWorkItemDto);
        }

        [HttpGet]
        [Route("{workItemId}/comments")]
        public IActionResult GetWorkItemComments(Guid workItemId)
        {
            // TODO: Make the order in the SQL (more powerful because SQL is to manage data) and change the name
            var existingCommentsPerWorkItem = _commentRepository.GetCommentsPerWorkItemOrderedByCreationDataDesc(workItemId);

            var commentsPerWorkItemDto = _mapper.Map <IEnumerable<CommentResponseModel>>(existingCommentsPerWorkItem);
            return Ok(commentsPerWorkItemDto);
        }

        [HttpGet]
        [Route("{workItemId}/tags")]
        public IActionResult GetTagsPerWorkItemOrderedByAlphabeticText(Guid workItemId)
        {
            var existingTagsPerWorkItem = _tagRepository.GetTagsPerWorkItemOrderedByAlphabeticText(workItemId);

            var tagsPerWorkItemDto = _mapper.Map<IEnumerable<TagResponseModel>>(existingTagsPerWorkItem);
            return Ok(tagsPerWorkItemDto);
        }

        [HttpDelete]
        [Route("{workItemId}")]
        public IActionResult DeleteWorkItem(Guid workItemId)
        {
            var workItemToDelete = _workItemRepository.GetWorkItem(workItemId);

            if (workItemToDelete != null)
            {
                _workItemRepository.DeleteWorkItem(workItemToDelete);
                return Ok();
            }

            return NotFound($"The workItem with the Id: {workItemId} does not exist");
        }
    }
}
