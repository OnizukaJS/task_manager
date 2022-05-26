using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskManager.Dtos.CommentDto;
using TaskManager.Dtos.tag;
using TaskManager.Dtos.taskToDoDto;
using TaskManager.Interfaces.comment;
using TaskManager.Interfaces.tag;
using TaskManager.Interfaces.taskToDo;
using TaskManager.Models.taskToDo;

namespace TaskManager.Controllers.taskToDo
{
    [ApiController]
    public class TasksToDoController : ControllerBase
    {
        private ITaskToDoData _taskToDoData;
        private ICommentData _commentData;
        private ITagData _tagData;
        private IMapper _mapper;

        public TasksToDoController(ITaskToDoData taskToDoData, ICommentData commentData, ITagData tagData, IMapper mapper)
        {
            _taskToDoData = taskToDoData;
            _commentData = commentData;
            _tagData = tagData;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("api/[controller]")]
        public IActionResult GetTasks()
        {
            var existingTasks = _taskToDoData.GetTasks();

            var tasksToDoDto = _mapper.Map<IEnumerable<TaskToDoResponseModel>>(existingTasks);
            return Ok(tasksToDoDto);
        }

        [HttpGet]
        [Route("api/[controller]/{taskId}")]
        public IActionResult GetTask(Guid taskId)
        {
            var existingTaskToDo = _taskToDoData.GetTask(taskId);

            if (existingTaskToDo != null)
            {
                var taskToDoDto = _mapper.Map<TaskToDoResponseModel>(existingTaskToDo);
                return Ok(taskToDoDto);
            }

            return NotFound($"This task with the Id: {taskId} does not exist");
        }

        [HttpGet]
        [Route("api/[controller]/{taskId}/comments")]
        public IActionResult GetCommentsPerTaskToDoOrderedByCreationDataDesc(Guid taskId)
        {
            var existingCommentsPerTasks = _commentData.GetCommentsPerTaskToDoOrderedByCreationDataDesc(taskId);

            var commentsPerTaskDto = _mapper.Map<IEnumerable<CommentResponseModel>>(existingCommentsPerTasks);
            return Ok(commentsPerTaskDto);
        }

        [HttpGet]
        [Route("api/[controller]/{taskId}/tags")]
        public IActionResult GetTagsPerTaskToDoOrderedByAlphabeticText(Guid taskId)
        {
            var existingTagsPerTasks = _tagData.GetTagsPerTaskToDoOrderedByAlphabeticText(taskId);

            var tagsPerTaskDto = _mapper.Map<IEnumerable<TagResponseModel>>(existingTagsPerTasks);
            return Ok(tagsPerTaskDto);
        }

        [HttpGet]
        [Route("api/[controller]/employee/{employeeId}")]
        public IActionResult GetActionResult(Guid employeeId)
        {
            return Ok(_taskToDoData.GetTasks().Where(x => x.EmployeeId == employeeId));
        }

        [HttpPost]
        [Route("api/[controller]")]
        public IActionResult AddTask(TaskToDoCreateModel taskToDoCreate)
        {
            var taskToDo = _mapper.Map<TaskToDo>(taskToDoCreate);

            _taskToDoData.AddTask(taskToDo);

            var taskToDoResponse = _mapper.Map<TaskToDoResponseModel>(taskToDo);

            return Created(HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + "/" + taskToDoResponse.Id, taskToDoResponse);
        }

        [HttpDelete]
        [Route("api/[controller]/{taskId}")]
        public IActionResult DeleteTask(Guid taskId)
        {
            var taskToDelete = _taskToDoData.GetTask(taskId);

            if (taskToDelete != null)
            {
                _taskToDoData.DeleteTask(taskToDelete);
                return Ok();
            }

            return NotFound($"The task with the Id: {taskId} does not exist");
        }

        [HttpPatch]
        [Route("api/[controller]/{Id}")]
        public IActionResult EditTask(Guid Id, TaskToDoUpdateModel taskToDoUpdate)
        {
            var existingTask = _taskToDoData.GetTask(Id);

            if (existingTask != null)
            {
                var taskToDoDto = _mapper.Map<TaskToDo>(taskToDoUpdate);
                taskToDoDto.Id = existingTask.Id;
                _taskToDoData.EditTask(taskToDoDto);
            }

            return Ok(taskToDoUpdate);
        }
    }
}
