using AutoMapper;
using System;
using System.Collections.Generic;
using TaskManager.Dtos.workItemDto;
using TaskManager.Repository.workItem;

namespace TaskManager.Services.workItem
{
    public class WorkItemService : IWorkItemService
    {
        private readonly IWorkItemRepository _workItemRepository;
        private readonly IMapper _mapper;

        public WorkItemService(IWorkItemRepository workItemRepository, IMapper mapper)
        {
            _workItemRepository = workItemRepository;
            _mapper = mapper;
        }

        public IEnumerable<WorkItemResponseModel> GetWorkItems()
        {
            var workItems = _workItemRepository.GetWorkItems();
            var workItemsDto = _mapper.Map<IEnumerable<WorkItemResponseModel>>(workItems);
            return workItemsDto;
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
    }
}
