using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using TaskManager.Dtos.taskToDoDto;
using TaskManager.Repository.comment;
using TaskManager.Repository.tag;
using TaskManager.Repository.taskToDo;
using TaskManager.Services.taskToDo;

namespace TaskManager.Controllers.taskToDo
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksToDoController : ControllerBase
    {
        private readonly ITaskToDoService _taskToDoService;

        public TasksToDoController(ITaskToDoService taskToDoService)
        {
            _taskToDoService = taskToDoService;
        }

        [HttpPost]
        public IActionResult AddTask(TaskToDoCreateModel taskToDoCreate)
        {
            var taskToDoResponse = _taskToDoService.AddTask(taskToDoCreate);
            return Created(HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + "/" + taskToDoResponse.Id, taskToDoResponse);
        }

        [HttpPatch("{taskId}")]
        public IActionResult UpdateTask(Guid taskId, TaskToDoUpdateModel taskToDoUpdate)
        {
            var task = _taskToDoService.UpdateTask(taskId, taskToDoUpdate);
            return Ok(task);
        }

        [HttpGet]
        public IActionResult GetTasks()
        {
            var tasks = _taskToDoService.GetTasks();
            return Ok(tasks);
        }

        [HttpGet("{taskId}")]
        public IActionResult GetTask(Guid taskId)
        {
            var task = _taskToDoService.GetTask(taskId);
            return Ok(task);
        }

        [HttpGet("{taskId}/comments")]
        public IActionResult GetCommentsPerTask(Guid taskId)
        {
            var commentsPerTask = _taskToDoService.GetCommentsPerTask(taskId);
            return Ok(commentsPerTask);
        }

        [HttpGet("{taskId}/tags")]
        public IActionResult GetTagsPerTask(Guid taskId)
        {
            var tagsPerTask = _taskToDoService.GetTagsPerTask(taskId);
            return Ok(tagsPerTask);
        }

        [HttpDelete("{taskId}")]
        public IActionResult DeleteTask(Guid taskId)
        {
            _taskToDoService.DeleteTask(taskId);
            return Ok();
        }        
    }
}
