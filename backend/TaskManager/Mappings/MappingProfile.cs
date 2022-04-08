using AutoMapper;
using TaskManager.Dtos.CommentDto;
using TaskManager.Dtos.employeeDto;
using TaskManager.Dtos.tag;
using TaskManager.Dtos.taskToDoDto;
using TaskManager.Dtos.workItem;
using TaskManager.Models;
using TaskManager.Models.employee;
using TaskManager.Models.tag;
using TaskManager.Models.workItem;

namespace TaskManager.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            #region Employee
            CreateMap<Employee, EmployeeResponseModel>();
            CreateMap<EmployeeRegistrationModel, Employee>();
            CreateMap<EmployeeUpdateModel, Employee>();
            CreateMap<EmployeeUpdatePasswordModel, Employee>();
            #endregion

            #region WorkItem
            CreateMap<WorkItem, WorkItemResponseModel>();
            CreateMap<WorkItemCreateEditModel, WorkItem>();
            #endregion

            #region TaskToDo
            CreateMap<TaskToDo, TaskToDoResponseModel>();
            CreateMap<TaskToDoCreateModel, TaskToDo>();
            CreateMap<TaskToDoUpdateModel, TaskToDo>();
            #endregion

            #region Comment
            CreateMap<Comment, CommentResponseModel>();
            CreateMap<CommentCreateModel, Comment>();
            #endregion

            #region Tag
            CreateMap<Tag, TagResponseModel>();
            CreateMap<TagCreateModel, Tag>();
            #endregion
        }
    }
}
