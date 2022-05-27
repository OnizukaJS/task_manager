using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskManager.Dtos.CommentDto;
using TaskManager.Dtos.tag;
using TaskManager.Dtos.taskToDoDto;
using TaskManager.Models.taskToDo;
using TaskManager.Repository.comment;
using TaskManager.Repository.tag;
using TaskManager.Repository.taskToDo;
using TaskManager.Services.taskToDo;

namespace TaskManager.Controllers.taskToDo
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksToDoController : ControllerBase
    {
        private ITaskToDoRepository _taskToDoRepository;
        private ICommentRepository _commentRepository;
        private ITagRepository _tagRepository;
        private IMapper _mapper;
        private readonly ITaskToDoService _taskToDoService;

        public TasksToDoController(ITaskToDoRepository taskToDoRepository, ICommentRepository commentRepository, ITagRepository tagRepository, IMapper mapper,
            ITaskToDoService taskToDoService)
        {
            _taskToDoRepository = taskToDoRepository;
            _commentRepository = commentRepository;
            _tagRepository = tagRepository;
            _mapper = mapper;
            _taskToDoService = taskToDoService;
        }

        [HttpPost]
        public IActionResult AddTask(TaskToDoCreateModel taskToDoCreate)
        {
            var taskToDo = _mapper.Map<TaskToDo>(taskToDoCreate);

            _taskToDoRepository.AddTask(taskToDo);

            var taskToDoResponse = _mapper.Map<TaskToDoResponseModel>(taskToDo);

            return Created(HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + "/" + taskToDoResponse.Id, taskToDoResponse);
        }

        [HttpPatch]
        [Route("{taskId}")]
        public IActionResult EditTask(Guid taskId, TaskToDoUpdateModel taskToDoUpdate)
        {
            try
            {
                var task = _taskToDoService.UpdateTask(taskId, taskToDoUpdate);
                return Ok(task);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpGet]
        public IActionResult GetTasks()
        {
            var tasks = _taskToDoService.GetTasks();
            return Ok(tasks);
        }

        [HttpGet]
        [Route("{taskId}")]
        public IActionResult GetTask(Guid taskId)
        {
            var existingTaskToDo = _taskToDoRepository.GetTask(taskId);

            if (existingTaskToDo != null)
            {
                var taskToDoDto = _mapper.Map<TaskToDoResponseModel>(existingTaskToDo);
                return Ok(taskToDoDto);
            }

            return NotFound($"This task with the Id: {taskId} does not exist");
        }

        [HttpGet]
        [Route("{taskId}/comments")]
        public IActionResult GetCommentsPerTaskToDoOrderedByCreationDataDesc(Guid taskId)
        {
            var existingCommentsPerTasks = _commentRepository.GetCommentsPerTaskToDoOrderedByCreationDataDesc(taskId);

            var commentsPerTaskDto = _mapper.Map<IEnumerable<CommentResponseModel>>(existingCommentsPerTasks);
            return Ok(commentsPerTaskDto);
        }

        [HttpGet]
        [Route("{taskId}/tags")]
        public IActionResult GetTagsPerTaskToDoOrderedByAlphabeticText(Guid taskId)
        {
            var existingTagsPerTasks = _tagRepository.GetTagsPerTaskToDoOrderedByAlphabeticText(taskId);

            var tagsPerTaskDto = _mapper.Map<IEnumerable<TagResponseModel>>(existingTagsPerTasks);
            return Ok(tagsPerTaskDto);
        }

        [HttpGet]
        [Route("employee/{employeeId}")]
        public IActionResult GetActionResult(Guid employeeId)
        {
            return Ok(_taskToDoRepository.GetTasks().Where(x => x.EmployeeId == employeeId));
        }

        [HttpDelete]
        [Route("{taskId}")]
        public IActionResult DeleteTask(Guid taskId)
        {
            var taskToDelete = _taskToDoRepository.GetTask(taskId);

            if (taskToDelete != null)
            {
                _taskToDoRepository.DeleteTask(taskToDelete);
                return Ok();
            }

            return NotFound($"The task with the Id: {taskId} does not exist");
        }        
    }
}
