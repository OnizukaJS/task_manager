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
    border: "1px solid transparent",

    "&:hover": {
      backgroundColor: "white",
      border: "1px solid #eeeeee",
    },
  },
  icon: {
    color: "transparent",
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

export default TaskStatusSelect;
