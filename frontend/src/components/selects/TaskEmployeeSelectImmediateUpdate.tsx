import {
  MenuItem,
  Select,
  makeStyles,
  createStyles,
  Box,
} from "@material-ui/core";
import React from "react";
import EmployeeModel from "../../models/employeeModels/EmployeeModel";
import TaskModel from "../../models/taskModels/TaskModel";
import ProfilePicture from "../ProfilePicture";
import { withStyles } from "@material-ui/styles";
import apiUrls from "../../constants/apiUrls";

interface TaskEmployeeSelectImmediateUpdateProps {
  employees: EmployeeModel[] | undefined;
  task: TaskModel;
  triggerRefresh: () => void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    containerEmployeeName: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      marginLeft: theme.spacing(1),
    },
    containerEmployeeSelect: {
      width: "100%",
      border: "1px solid transparent",
      padding: "2px 0 2px 2px",

      "&:hover": {
        borderColor: "rgba(102,102,102,1)",
      },
    },
    containerMenuItem: {
      display: "flex",
      alignItems: "center",
    },
  })
);

const MuiSelectComponent = withStyles({
  root: {
    padding: "0 24px 0 0",
  },
  icon: {
    color: "transparent",
  },
})(Select);

const TaskEmployeeSelectImmediateUpdate = ({
  employees,
  task,
  triggerRefresh,
}: TaskEmployeeSelectImmediateUpdateProps) => {
  const classes = useStyles();

  const handleChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    fetch(apiUrls.task.updateTask(task.id), {
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
    <MuiSelectComponent
      name="employeeId"
      value={task.employeeId}
      disableUnderline
      variant="standard"
      onChange={handleChange}
      className={classes.containerEmployeeSelect}
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
    </MuiSelectComponent>
  );
};

export default TaskEmployeeSelectImmediateUpdate;
