using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskManager.Dtos.CommentDto;
using TaskManager.Dtos.tag;
using TaskManager.Dtos.taskToDoDto;
using TaskManager.Dtos.workItem;
using TaskManager.Interfaces.comment;
using TaskManager.Interfaces.tag;
using TaskManager.Interfaces.task;
using TaskManager.Interfaces.workItem;
using TaskManager.Models.workItem;

namespace TaskManager.Controllers.workItem
{
    [ApiController]
    public class WorkItemsController : ControllerBase
    {
        private IWorkItemData _workItemData;
        private ITaskToDoData _taskToDoData;
        private ICommentData _commentData;
        private ITagData _tagData;
        private IMapper _mapper;

        public WorkItemsController(IWorkItemData workItemData, ITaskToDoData taskToDoData, ICommentData commentData, ITagData tagData, IMapper mapper)
        {
            _workItemData = workItemData;
            _taskToDoData = taskToDoData;
            _commentData = commentData;
            _tagData = tagData;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("api/[controller]")]
        public IActionResult GetWorkItems()
        {
            var existingWorkItems = _workItemData.GetWorkItems();

            var workItemsDto = _mapper.Map<IEnumerable<WorkItemResponseModel>>(existingWorkItems);
            return Ok(workItemsDto);
        }

        [HttpGet]
        [Route("api/[controller]/{workItemId}")]
        public IActionResult GetWorkItem(Guid workItemId)
        {
            var existingWorkItemToDo = _workItemData.GetWorkItem(workItemId);

            if (existingWorkItemToDo != null)
            {
                var workItemDto = _mapper.Map<WorkItemResponseModel>(existingWorkItemToDo);
                return Ok(workItemDto);
            }

            return NotFound($"This workItem with the Id: {workItemId} does not exist");
        }

        [HttpGet]
        [Route("api/[controller]/{workItemId}/taskToDos")]
        public IActionResult GetTasksPerWorkItem(Guid workItemId)
        {
            var existingTasksPerWorkItem = _taskToDoData.GetTasksPerWorkItem(workItemId);

            var tasksPerWorkItemDto = _mapper.Map<IEnumerable<TaskToDoResponseModel>>(existingTasksPerWorkItem);
            return Ok(tasksPerWorkItemDto);
        }

        [HttpGet]
        [Route("api/[controller]/{workItemId}/comments")]
        public IActionResult GetWorkItemComments(Guid workItemId)
        {
            // TODO: Make the order in the SQL (more powerful because SQL is to manage data) and change the name
            var existingCommentsPerWorkItem = _commentData.GetCommentsPerWorkItemOrderedByCreationDataDesc(workItemId);

            var commentsPerWorkItemDto = _mapper.Map <IEnumerable<CommentResponseModel>>(existingCommentsPerWorkItem);
            return Ok(commentsPerWorkItemDto);
        }

        [HttpGet]
        [Route("api/[controller]/{workItemId}/tags")]
        public IActionResult GetTagsPerWorkItemOrderedByAlphabeticText(Guid workItemId)
        {
            var existingTagsPerWorkItem = _tagData.GetTagsPerWorkItemOrderedByAlphabeticText(workItemId);

            var tagsPerWorkItemDto = _mapper.Map<IEnumerable<TagResponseModel>>(existingTagsPerWorkItem);
            return Ok(tagsPerWorkItemDto);
        }

        [HttpPost]
        [Route("api/[controller]")]
        public IActionResult AddTask(WorkItemCreateEditModel workItemCreate)
        {
            var workItem = _mapper.Map<WorkItem>(workItemCreate);

            _workItemData.AddWorkItem(workItem);

            var workItemResponse = _mapper.Map<WorkItemResponseModel>(workItem);

            return Created(HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + "/" + workItemResponse.Id, workItemResponse);
        }

        [HttpDelete]
        [Route("api/[controller]/{workItemId}")]
        public IActionResult DeleteWorkItem(Guid workItemId)
        {
            var workItemToDelete = _workItemData.GetWorkItem(workItemId);

            if (workItemToDelete != null)
            {
                _workItemData.DeleteWorkItem(workItemToDelete);
                return Ok();
            }

            return NotFound($"The workItem with the Id: {workItemId} does not exist");
        }

        [HttpPatch]
        [Route("api/[controller]/{workItemId}")]
        public IActionResult EditWorkItem(Guid workItemId, WorkItemCreateEditModel workItemUpdate)
        {
            var existingWorkItem = _workItemData.GetWorkItem(workItemId);

            if (existingWorkItem != null)
            {
                var workItemDto = _mapper.Map<WorkItem>(workItemUpdate);
                workItemDto.Id = existingWorkItem.Id;
                _workItemData.EditWorkItem(workItemDto);
            }

            return Ok(workItemUpdate);
        }
    }
}
