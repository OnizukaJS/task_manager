import React from "react";
import { NativeSelect } from "@material-ui/core";
import TaskStatusEnum from "../../models/enum/TaskStatusEnum";
import { withStyles } from "@material-ui/styles";
import TaskModel from "../../models/taskModels/TaskModel";
import apiUrls from "../../constants/apiUrls";

interface TaskStatusSelectImmediateUpdateProps {
  task: TaskModel;
  triggerRefresh: () => void;
}

const MuiNativeSelectComponent = withStyles({
  root: {
    padding: "3px 0 3px",

    "&:hover": {
      backgroundColor: "white",
    },
  },
  icon: {
    color: "transparent",
  },
})(NativeSelect);

const TaskStatusSelectImmediateUpdate = ({
  task,
  triggerRefresh,
}: TaskStatusSelectImmediateUpdateProps) => {
  const handleUpdate = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    fetch(apiUrls.task.getTask(task.id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: task.name,
        description: task.description,
        status: e.target.value,
        employeeId: task.employeeId,
        workItemId: task.workItemId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log("data to edit", data))
      .then(() => triggerRefresh())
      .catch(() => console.log("ERROR while updating task's status"));
  };

  return (
    <MuiNativeSelectComponent
      value={task.status}
      onChange={handleUpdate}
      name="status"
      disableUnderline
    >
      <option
        value={TaskStatusEnum[TaskStatusEnum.New]}
        style={{ padding: "8px" }}
      >
        New
      </option>
      <option value={TaskStatusEnum[TaskStatusEnum.Active]}>Active</option>
      <option value={TaskStatusEnum[TaskStatusEnum.Resolved]}>Resolved</option>
      <option value={TaskStatusEnum[TaskStatusEnum.ReadyForTest]}>
        Ready for Test
      </option>
      <option value={TaskStatusEnum[TaskStatusEnum.Closed]}>Closed</option>
    </MuiNativeSelectComponent>
  );
};

export default TaskStatusSelectImmediateUpdate;
