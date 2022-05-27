using System;
using System.Collections.Generic;
using TaskManager.Dtos.tagDto;

namespace TaskManager.Services.tag
{
    public interface ITagService
    {
        IEnumerable<TagResponseModel> GetTags();
        TagResponseModel GetTag(Guid tagId);
        void DeleteTag(Guid tagId);
    }
}
