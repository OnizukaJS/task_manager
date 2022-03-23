import {
  Box,
  createStyles,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";
import EmployeeModel from "../../models/employeeModels/EmployeeModel";
import WorkItemModel from "../../models/workItemModels/WorkItemModel";
import ProfilePicture from "../ProfilePicture";
import { withStyles } from "@material-ui/styles";

interface WorkItemEmployeeSelectImmediateUpdateProps {
  employees: EmployeeModel[] | undefined;
  workItem: WorkItemModel;
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

const WorkItemEmployeeSelectImmediateUpdate = ({
  employees,
  workItem,
  triggerRefresh,
}: WorkItemEmployeeSelectImmediateUpdateProps) => {
  const classes = useStyles();

  const handleChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    fetch(`https://localhost:44358/api/WorkItems/${workItem.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: workItem.name,
        description: workItem.description,
        status: workItem.status,
        employeeId: e.target.value,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log("data to edit", data))
      .then(() => triggerRefresh())
      .catch(() => console.log("ERROR while updating workItem's employee"));
  };

  return (
    <MuiSelectComponent
      name="employeeId"
      value={workItem.employeeId}
      disableUnderline
      variant="standard"
      onChange={handleChange}
      style={{ width: "100%" }}
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

export default WorkItemEmployeeSelectImmediateUpdate;
