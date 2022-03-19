import React from "react";

import { makeStyles } from "@material-ui/core";
import TaskStatusEnum from "../models/enum/TaskStatusEnum";

interface ColorIconStatusProps {
  status: TaskStatusEnum | string;
  height?: string;
  width?: string;
}

const ColorIconStatus = ({ status, height, width }: ColorIconStatusProps) => {
  let backgroundColor: string;

  switch (status as unknown as string) {
    case TaskStatusEnum[TaskStatusEnum.Active]:
      backgroundColor = "#1b88bd";
      break;
    case TaskStatusEnum[TaskStatusEnum.Resolved]:
      backgroundColor = "#fba500";
      break;
    case TaskStatusEnum[TaskStatusEnum.ReadyForTest]:
      backgroundColor = "#fba500";
      break;
    case TaskStatusEnum[TaskStatusEnum.Closed]:
      backgroundColor = "#109604";
      break;
    case TaskStatusEnum[TaskStatusEnum.New]:
    default:
      backgroundColor = "#bab8b3";
      break;
  }

  const useStyles = makeStyles((theme) => ({
    status: {
      backgroundColor: backgroundColor,
      minHeight: "10px",
      minWidth: "10px",
      borderRadius: "50%",
      marginRight: theme.spacing(1.5),
    },
  }));

  const classes = useStyles();

  return <div className={classes.status} style={{ height, width }} />;
};

export default ColorIconStatus;
