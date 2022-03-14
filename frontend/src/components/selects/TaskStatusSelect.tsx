import React from "react";
import { NativeSelect } from "@material-ui/core";
import TaskStatusEnum from "../../models/enum/TaskStatusEnum";
import { withStyles } from "@material-ui/styles";

interface TaskStatusSelectProps {
  status: TaskStatusEnum;
  handleChange: (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => void;
}

const MuiNativeSelectComponent = withStyles({
  root: {
    paddingLeft: "8px",
    "&:hover": {
      backgroundColor: "white",
    },
  },
})(NativeSelect);

const TaskStatusSelect = ({ status, handleChange }: TaskStatusSelectProps) => {
  return (
    <MuiNativeSelectComponent
      value={status}
      onChange={handleChange}
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

export default TaskStatusSelect;
