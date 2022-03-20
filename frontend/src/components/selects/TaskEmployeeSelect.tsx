import {
  Box,
  createStyles,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";
import EmployeeModel from "../../models/employeeModels/EmployeeModel";
import TaskModel from "../../models/taskModels/TaskModel";
import WorkItemModel from "../../models/workItemModels/WorkItemModel";
import ProfilePicture from "../ProfilePicture";

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

const useStyles = makeStyles((theme) =>
  createStyles({
    containerEmployeeName: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      marginLeft: theme.spacing(1),
    },
    containerMenuItem: {
      display: "flex",
      alignItems: "center",
    },
  })
);

const TaskEmployeeSelect = ({
  employees,
  taskToEdit,
  handleChange,
}: TaskEmployeeSelectProps) => {
  const classes = useStyles();

  return (
    <Select
      name="employeeId"
      value={taskToEdit.employeeId}
      disableUnderline
      variant="standard"
      onChange={handleChange}
    >
      {employees?.map((employee) => (
        <MenuItem key={employee.employeeName} value={employee.employeeId}>
          <Box className={classes.containerMenuItem}>
            <ProfilePicture
              name={employee.employeeName}
              surname={employee.employeeSurname}
              height={30}
              width={30}
              fontSize={12}
            />
            <span className={classes.containerEmployeeName}>
              {employee.employeeName} {employee.employeeSurname}
            </span>
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
};

export default TaskEmployeeSelect;
