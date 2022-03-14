import WorkItemModel from "../workItemModels/WorkItemModel";

interface TaskModel extends WorkItemModel {
  workItemId: string;
}

export default TaskModel;
