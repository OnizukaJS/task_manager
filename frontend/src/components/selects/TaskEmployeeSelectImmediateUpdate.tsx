import { NativeSelect } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import EmployeeModel from "../../models/employeeModels/EmployeeModel";
import TaskModel from "../../models/taskModels/TaskModel";
import EmployeeOptionSelect from "./EmployeeOptionSelect";

interface TaskEmployeeSelectImmediateUpdateProps {
  employees: EmployeeModel[] | undefined;
  task: TaskModel;
  triggerRefresh: () => void;
}

const EmployeeSelect = withStyles({
  root: {
    border: "1px solid transparent",
    padding: "5px 24px 5px 7px",
    "&:hover": {
      border: "1px solid #EAEAEA",
    },
  },
})(NativeSelect);

const TaskEmployeeSelectImmediateUpdate = ({
  employees,
  task,
  triggerRefresh,
}: TaskEmployeeSelectImmediateUpdateProps) => {
  const handleChange = (
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
        status: task.status,
        employeeId: e.target.value,
        workItemId: task.workItemId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log("data to edit", data))
      .then(() => triggerRefresh())
      .catch(() => console.log("ERROR while updating task's employee"));
  };
  return (
    <EmployeeSelect
      name="employeeId"
      value={task.employeeId}
      disableUnderline
      variant="standard"
      onChange={handleChange}
    >
      {employees?.map((employee) => {
        return <EmployeeOptionSelect employee={employee} />;
      })}
    </EmployeeSelect>
  );
};

export default TaskEmployeeSelectImmediateUpdate;
