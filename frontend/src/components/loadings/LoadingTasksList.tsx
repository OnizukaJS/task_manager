import { makeStyles } from "@material-ui/core";
import { Skeleton, Stack, Box } from "@mui/material";
import React from "react";

const useStyles = makeStyles({
  avatar: {
    width: "40px",
    marginBottom: "8px",
  },
  containerrLoadingTasksList: {
    height: "244.46px",
  },
  containerTask: {
    flex: 1,
    minWidth: "253px",
  },
  gridContainerRow: {
    display: "flex",
    padding: "10px 0",
  },
  header: {},
  taskItemColumn: {
    flex: 1,
    margin: "0 3px",
  },
  workItemColumn: {
    flex: 1,
    margin: "0 3px",
  },
});

const LoadingTasksList = () => {
  const classes = useStyles();

  return (
    <Box className={classes.containerrLoadingTasksList}>
      <Skeleton
        variant="rectangular"
        height={48}
        animation="wave"
        className={classes.header}
      />
      <Box className={classes.gridContainerRow}>
        <Stack className={classes.workItemColumn}>
          <Box>
            <Skeleton variant="rectangular" height={173.46} animation="wave" />
          </Box>
        </Stack>

        <Stack className={classes.taskItemColumn}>
          <Box>
            <Skeleton variant="rectangular" height={173.46} animation="wave" />
          </Box>
        </Stack>

        <Stack className={classes.taskItemColumn}>
          <Box>
            <Skeleton variant="rectangular" height={173.46} animation="wave" />
          </Box>
        </Stack>

        <Stack className={classes.taskItemColumn}>
          <Box>
            <Skeleton variant="rectangular" height={173.46} animation="wave" />
          </Box>
        </Stack>

        <Stack className={classes.taskItemColumn}>
          <Box>
            <Skeleton variant="rectangular" height={173.46} animation="wave" />
          </Box>
        </Stack>

        <Stack className={classes.taskItemColumn}>
          <Box>
            <Skeleton variant="rectangular" height={173.46} animation="wave" />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoadingTasksList;
