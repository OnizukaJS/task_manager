export const EmployeeUrlBasePath = "https://localhost:44358/api/Employees";
export const TaskUrlBasePath = "https://localhost:44358/api/TasksToDo";
export const WorkItemUrlBasePath = "https://localhost:44358/api/WorkItems";
export const CommentUrlBasePath = "https://localhost:44358/api/Comments";
export const TagUrlBasePath = "https://localhost:44358/api/Tags";

const apiUrls = {
  comment: {},
  employee: {
    getEmployee: (employeeId?: string): string =>
      `${EmployeeUrlBasePath}/${employeeId}`,
    getEmployees: `${EmployeeUrlBasePath}`,
    updatePassword: (employeeId: string): string =>
      `${EmployeeUrlBasePath}/${employeeId}/password`,
  },
  tag: {
    deleteTag: (tagId: string): string => `${TagUrlBasePath}/${tagId}`,
  },
  task: {
    getTask: (taskId: string): string => `${TaskUrlBasePath}/${taskId}`,
    getTasks: `${TaskUrlBasePath}`,
    getCommentsPerTask: (taskId: string): string =>
      `${TaskUrlBasePath}/${taskId}/comments`,
    getTagsPerTask: (taskId: string): string =>
      `${TaskUrlBasePath}/${taskId}/tags`,
    getTasksPerEmployee: (employeeId: string): string =>
      `${TaskUrlBasePath}/employee/${employeeId}`,
    updateTask: (taskId: string): string => `${TaskUrlBasePath}/${taskId}`,
  },
  workItem: {
    getWorkItem: (workItemId: string): string =>
      `${WorkItemUrlBasePath}/${workItemId}`,
    getWorkItems: `${WorkItemUrlBasePath}`,
    getCommentsPerWorkItem: (workItemId: string): string =>
      `${WorkItemUrlBasePath}/${workItemId}/comments`,
    getTagsPerWorkItem: (workItemId: string): string =>
      `${WorkItemUrlBasePath}/${workItemId}/tags`,
    updateWorkItem: (workItemId: string): string =>
      `${WorkItemUrlBasePath}/${workItemId}`,
  },
};

export default apiUrls;
