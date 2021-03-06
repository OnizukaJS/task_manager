using AutoMapper;
using System;
using System.Collections.Generic;
using TaskManager.Dtos.tagDto;
using TaskManager.Models.tag;
using TaskManager.Repository.tag;

namespace TaskManager.Services.tag
{
    public class TagService : ITagService
    {
        private readonly ITagRepository _tagRepository;
        private readonly IMapper _mapper;

        public TagService(ITagRepository tagRepository, IMapper mapper)
        {
            _tagRepository = tagRepository;
            _mapper = mapper;
        }

        public TagResponseModel AddTag(TagCreateModel tag)
        {
            var tagToCreate = _mapper.Map<Tag>(tag);
            _tagRepository.AddTag(tagToCreate);
            var tagResponse = _mapper.Map<TagResponseModel>(tagToCreate);
            return tagResponse;
        }

        public IEnumerable<TagResponseModel> GetTags()
        {
            var tags = _tagRepository.GetTags();
            var tagsDto = _mapper.Map<IEnumerable<TagResponseModel>>(tags);
            return tagsDto;
        }

        public TagResponseModel GetTag(Guid tagId)
        {
            var existingTag = _tagRepository.GetTag(tagId);
            if (existingTag == null)
            {
                throw new KeyNotFoundException($"Tag with id {tagId} not found");
            }

            return _mapper.Map<TagResponseModel>(existingTag);
        }

        public void DeleteTag(Guid tagId)
        {
            var TagToDelete = _tagRepository.GetTag(tagId);
            if (TagToDelete == null)
            {
                throw new KeyNotFoundException($"Tag with id {tagId} not found");
            }

            _tagRepository.DeleteTag(TagToDelete);
        }
    }
}
