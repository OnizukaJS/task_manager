import React from "react";
import { NativeSelect } from "@material-ui/core";
import TaskStatusEnum from "../../models/enum/TaskStatusEnum";
import { withStyles } from "@material-ui/styles";
import WorkItemModel from "../../models/workItemModels/WorkItemModel";
import apiUrls from "../../constants/apiUrls";

interface WorkItemStatusSelectImmediateUpdateProps {
  workItem: WorkItemModel;
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

const WorkItemStatusSelectImmediateUpdate = ({
  workItem,
  triggerRefresh,
}: WorkItemStatusSelectImmediateUpdateProps) => {
  const handleUpdate = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    fetch(apiUrls.workItem.getWorkItem(workItem.id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: workItem.name,
        description: workItem.description,
        status: e.target.value,
        employeeId: workItem.employeeId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log("data to edit", data))
      .then(() => triggerRefresh())
      .catch(() => console.log("ERROR while updating work item-s status"));
  };

  return (
    <MuiNativeSelectComponent
      value={workItem.status}
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

export default WorkItemStatusSelectImmediateUpdate;
