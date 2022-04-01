import { makeStyles } from "@material-ui/core";
import { Skeleton, Stack, Box } from "@mui/material";
import React from "react";

const useStyles = makeStyles({
  avatar: {
    width: "30px",
    margin: "6px 0",
  },
  gridContainerRow: {
    display: "flex",
  },
  taskItemColumn: {
    flex: 1,
    margin: "0 3px",
  },
});

const LoadingTask = () => {
  const classes = useStyles();

  return (
    <Box className={classes.gridContainerRow}>
      <Stack className={classes.taskItemColumn}>
        <Box>
          <Skeleton variant="text" height={26} animation="wave" />
          <Skeleton
            variant="circular"
            height={30}
            animation="wave"
            className={classes.avatar}
          />
          <Skeleton variant="text" height={33} animation="wave" />
        </Box>
      </Stack>
    </Box>
  );
};

export default LoadingTask;
