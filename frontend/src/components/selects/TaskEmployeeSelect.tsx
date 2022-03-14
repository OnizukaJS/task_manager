import { NativeSelect } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import EmployeeModel from "../../models/employeeModels/EmployeeModel";
import TaskModel from "../../models/taskModels/TaskModel";
import WorkItemModel from "../../models/workItemModels/WorkItemModel";
import EmployeeOptionSelect from "./EmployeeOptionSelect";

interface TaskEmployeeSelectProps {
  employees: EmployeeModel[] | undefined;
  taskToEdit: TaskModel | WorkItemModel;
  handleChange: (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => void;
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

const TaskEmployeeSelect = ({
  employees,
  taskToEdit,
  handleChange,
}: TaskEmployeeSelectProps) => {
  return (
    <EmployeeSelect
      name="employeeId"
      value={taskToEdit.employeeId}
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

export default TaskEmployeeSelect;
