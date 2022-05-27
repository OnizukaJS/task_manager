﻿using AutoMapper;
using System;
using System.Collections.Generic;
using TaskManager.Dtos.taskToDoDto;
using TaskManager.Repository.taskToDo;

namespace TaskManager.Services.taskToDo
{
    public class TaskToDoService : ITaskToDoService
    {
        private readonly ITaskToDoRepository _taskToDoRepository;
        private readonly IMapper _mapper;

        public TaskToDoService(ITaskToDoRepository taskToDoRepository, IMapper mapper)
        {
            _taskToDoRepository = taskToDoRepository;
            _mapper = mapper;
        }

        public IEnumerable<TaskToDoResponseModel> GetTasks()
        {
            var tasks = _taskToDoRepository.GetTasks();
            var tasksDto = _mapper.Map<IEnumerable<TaskToDoResponseModel>>(tasks);
            return tasksDto;
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
    }
}
