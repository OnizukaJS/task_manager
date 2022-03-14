import TaskStatusEnum from "../enum/TaskStatusEnum";
import TaskTypeEnum from "../enum/TaskTypeEnum";

interface WorkItemModelToCreate {
  name: string;
  description: string;
  status: TaskStatusEnum;
  type: TaskTypeEnum;
  employeeId: string;
}

export default WorkItemModelToCreate;
