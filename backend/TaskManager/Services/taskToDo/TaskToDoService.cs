using AutoMapper;
using System;
using System.Collections.Generic;
using TaskManager.Dtos.tagDto;
using TaskManager.Dtos.taskToDoDto;
using TaskManager.Models.taskToDo;
using TaskManager.Repository.tag;
using TaskManager.Repository.taskToDo;

namespace TaskManager.Services.taskToDo
{
    public class TaskToDoService : ITaskToDoService
    {
        private readonly ITaskToDoRepository _taskToDoRepository;
        private readonly IMapper _mapper;
        private readonly ITagRepository _tagRepository;

        public TaskToDoService(ITaskToDoRepository taskToDoRepository, IMapper mapper, ITagRepository tagRepository)
        {
            _taskToDoRepository = taskToDoRepository;
            _mapper = mapper;
            _tagRepository = tagRepository;
        }

        public IEnumerable<TaskToDoResponseModel> GetTasks()
        {
            var tasks = _taskToDoRepository.GetTasks();
            var tasksDto = _mapper.Map<IEnumerable<TaskToDoResponseModel>>(tasks);
            return tasksDto;
        }

        public TaskToDoResponseModel GetTask(Guid taskId)
        {
            var existingTask = _taskToDoRepository.GetTask(taskId);
            if(existingTask == null)
            {
                throw new KeyNotFoundException();
            }

            return _mapper.Map<TaskToDoResponseModel>(existingTask);
        }

        public TaskToDoResponseModel UpdateTask(Guid taskId, TaskToDoUpdateModel taskUpdateModel)
        {
            var existingTask = _taskToDoRepository.GetTask(taskId);
            if (existingTask == null)
            {
                throw new KeyNotFoundException();
            }

            var taskToUpdate = _mapper.Map(taskUpdateModel, existingTask);
            _taskToDoRepository.UpdateTask(taskToUpdate);

            return _mapper.Map<TaskToDoResponseModel>(existingTask);
        }

        public void DeleteTask(Guid taskId)
        {
            var taskToDelete = _taskToDoRepository.GetTask(taskId);
            if (taskToDelete == null)
            {
                throw new KeyNotFoundException();
            }

            _taskToDoRepository.DeleteTask(taskToDelete);
        }

        public IEnumerable<TagResponseModel> GetTagsPerTask(Guid taskId)
        {
            var existingTask = _taskToDoRepository.GetTask(taskId);
            if (existingTask == null)
            {
                throw new KeyNotFoundException();
            }

            var tagsPerTask = _tagRepository.GetTagsPerTask(existingTask.Id);
            
            return _mapper.Map<IEnumerable<TagResponseModel>>(tagsPerTask);
        }
    }
}
