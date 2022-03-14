import TaskStatusEnum from "../enum/TaskStatusEnum";
import TaskTypeEnum from "../enum/TaskTypeEnum";

interface WorkItemModel {
  id: string;
  name: string;
  description: string;
  status: TaskStatusEnum;
  type: TaskTypeEnum;
  comment?: string;
  employeeId: string;
}

export default WorkItemModel;
