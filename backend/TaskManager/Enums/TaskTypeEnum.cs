using System.ComponentModel;

namespace TaskManager.Enums
{
    public enum TaskTypeEnum
    {
        Task,
        Bug,
        [Description("Work Item")]
        WorkItem
    }
}
