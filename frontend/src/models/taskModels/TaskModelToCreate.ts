import WorkItemModelToCreate from "../workItemModels/WorkItemModelToCreate";

interface TaskModelToCreate extends WorkItemModelToCreate {
  workItemId: string;
}

export default TaskModelToCreate;
