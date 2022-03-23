import React from "react";
import { NativeSelect } from "@material-ui/core";
import TaskStatusEnum from "../../models/enum/TaskStatusEnum";
import { withStyles } from "@material-ui/styles";
import TaskModel from "../../models/taskModels/TaskModel";

interface TaskStatusSelectImmediateUpdateProps {
  task: TaskModel;
  triggerRefresh: () => void;
}

const MuiNativeSelectComponent = withStyles({
  root: {
    paddingLeft: "8px",

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
    fetch(`https://localhost:44358/api/TasksToDo/${task.id}`, {
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
        {TaskStatusEnum[TaskStatusEnum.New]}
      </option>
      <option value={TaskStatusEnum[TaskStatusEnum.Active]}>
        {TaskStatusEnum[TaskStatusEnum.Active]}
      </option>
      <option value={TaskStatusEnum[TaskStatusEnum.Resolved]}>
        {TaskStatusEnum[TaskStatusEnum.Resolved]}
      </option>
      <option value={TaskStatusEnum[TaskStatusEnum.ReadyForTest]}>
        {TaskStatusEnum[TaskStatusEnum.ReadyForTest]}
      </option>
      <option value={TaskStatusEnum[TaskStatusEnum.Closed]}>
        {TaskStatusEnum[TaskStatusEnum.Closed]}
      </option>
    </MuiNativeSelectComponent>
  );
};

export default TaskStatusSelectImmediateUpdate;
