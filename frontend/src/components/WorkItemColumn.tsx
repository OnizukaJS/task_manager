import { createStyles, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import EmployeeModel from "../models/employeeModels/EmployeeModel";
import WorkItemModel from "../models/workItemModels/WorkItemModel";
import WorkItemItem from "./WorkItemItem";

const useStyles = makeStyles(() =>
  createStyles({
    arrow: {
      transform: "rotate(45deg)",
    },
    paddingMarginGridContainer: {
      margin: "0 3px",
    },
    workItemContainer: {
      margin: "10px 10px 0",
      maxWidth: "230px",
    },
  })
);

interface WorkItemColumnProps {
  handleOpenEditWorkItem: (workItem: WorkItemModel) => void;
  id: number;
  triggerRefresh: () => void;
  workItem: WorkItemModel;
  employees: EmployeeModel[] | undefined;
  refreshState: number;
}

const WorkItemColumn = ({
  handleOpenEditWorkItem,
  id,
  triggerRefresh,
  workItem,
  employees,
  refreshState,
}: WorkItemColumnProps) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      xs
      className={classes.paddingMarginGridContainer}
    >
      <Grid item key={id} className={classes.workItemContainer}>
        <WorkItemItem
          workItem={workItem}
          id={id}
          handleOpenEditWorkItem={handleOpenEditWorkItem}
          triggerRefresh={triggerRefresh}
          employees={employees}
          refreshState={refreshState}
        />
      </Grid>
    </Grid>
  );
};

export default WorkItemColumn;
