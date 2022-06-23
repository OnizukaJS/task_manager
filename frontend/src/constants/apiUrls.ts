export const EmployeeUrlBasePath = "/api/Employees";
export const TaskUrlBasePath = "/api/TasksToDo";
export const WorkItemUrlBasePath = "/api/WorkItems";
export const CommentUrlBasePath = "/api/Comments";
export const TagUrlBasePath = "/api/Tags";
export const ProfilePictureBasePath = "/api/ProfilePictures";

const apiUrls = {
  comment: {},
  employee: {
    authenticateEmployee: `${EmployeeUrlBasePath}/authenticate`,
    getEmployee: (employeeId?: string): string =>
      `${EmployeeUrlBasePath}/${employeeId}`,
    getEmployees: `${EmployeeUrlBasePath}`,
    updatePassword: (employeeId: string): string =>
      `${EmployeeUrlBasePath}/${employeeId}/password`,
  },
  profilePicture: {
    uploadProfilePicture: `${ProfilePictureBasePath}`,
    deleteProfilePicture: (employeeId: string): string =>
      `${ProfilePictureBasePath}/${employeeId}`,
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
