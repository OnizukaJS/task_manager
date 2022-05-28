using AutoMapper;
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

namespace TaskManager.Services.workItem
{
    public class WorkItemService : IWorkItemService
    {
        private readonly IWorkItemRepository _workItemRepository;
        private readonly IMapper _mapper;
        private readonly ITaskToDoRepository _taskToDoRepository;
        private readonly ITagRepository _tagRepository;
        private readonly ICommentRepository _commentRepository;

        public WorkItemService(IWorkItemRepository workItemRepository, IMapper mapper, ITaskToDoRepository taskToDoRepository, ITagRepository tagRepository,
            ICommentRepository commentRepository)
        {
            _workItemRepository = workItemRepository;
            _mapper = mapper;
            _taskToDoRepository = taskToDoRepository;
            _tagRepository = tagRepository;
            _commentRepository = commentRepository;
        }

        public WorkItemResponseModel AddWorkItem(WorkItemCreateUpdateModel workItem)
        {
            var workItemToCreate = _mapper.Map<WorkItem>(workItem);
            _workItemRepository.AddWorkItem(workItemToCreate);
            var workItemResponse = _mapper.Map<WorkItemResponseModel>(workItemToCreate);
            return workItemResponse;
        }

        public IEnumerable<WorkItemResponseModel> GetWorkItems()
        {
            var workItems = _workItemRepository.GetWorkItems();
            var workItemsDto = _mapper.Map<IEnumerable<WorkItemResponseModel>>(workItems);
            return workItemsDto;
        }

        public WorkItemResponseModel GetWorkItem(Guid workItemId)
        {
            var existingWorkItem = _workItemRepository.GetWorkItem(workItemId);
            if (existingWorkItem != null)
            {
                throw new KeyNotFoundException();
            }

            return _mapper.Map<WorkItemResponseModel>(existingWorkItem);
        }

        public WorkItemResponseModel UpdateWorkItem(Guid workItemId, WorkItemCreateUpdateModel workItemUpdateModel)
        {
            var existingWorkItem = _workItemRepository.GetWorkItem(workItemId);
            if (existingWorkItem == null)
            {
                throw new KeyNotFoundException();
            }

            var workItemToUpdate = _mapper.Map(workItemUpdateModel, existingWorkItem);
            _workItemRepository.UpdateWorkItem(workItemToUpdate);

            return _mapper.Map<WorkItemResponseModel>(existingWorkItem);
        }

        public void DeleteWorkItem(Guid workItemId)
        {
            var workItemToDelete = _workItemRepository.GetWorkItem(workItemId);
            if (workItemToDelete == null)
            {
                throw new KeyNotFoundException();
            }

            _workItemRepository.DeleteWorkItem(workItemToDelete);
        }

        public IEnumerable<TaskToDoResponseModel> GetTasksPerWorkItem(Guid workItemId)
        {
            var existingWorkItem = _workItemRepository.GetWorkItem(workItemId);
            if (existingWorkItem == null)
            {
                throw new KeyNotFoundException();
            }

            var tasksPerWorkItem = _taskToDoRepository.GetTasksPerWorkItem(existingWorkItem.Id);

            return _mapper.Map<IEnumerable<TaskToDoResponseModel>>(tasksPerWorkItem);
        }

        public IEnumerable<TagResponseModel> GetTagsPerWorkItem(Guid workItemId)
        {
            var existingWorkItem = _workItemRepository.GetWorkItem(workItemId);
            if (existingWorkItem == null)
            {
                throw new KeyNotFoundException();
            }

            var tagsPerWorkItem = _tagRepository.GetTagsPerWorkItem(existingWorkItem.Id);

            return _mapper.Map<IEnumerable<TagResponseModel>>(tagsPerWorkItem);
        }

        public IEnumerable<CommentResponseModel> GetCommentsPerWorkItem(Guid workItemId)
        {
            var existingWorkItem = _workItemRepository.GetWorkItem(workItemId);
            if (existingWorkItem == null)
            {
                throw new KeyNotFoundException();
            }

            var commentsPerWorkItem = _commentRepository.GetCommentsPerWorkItem(existingWorkItem.Id);

            return _mapper.Map<IEnumerable<CommentResponseModel>>(commentsPerWorkItem);
        }
    }
}
