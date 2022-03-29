import { makeStyles } from "@material-ui/core";
import { Skeleton, Stack, Box } from "@mui/material";
import React from "react";

const useStyles = makeStyles({
  avatar: {
    width: "40px",
    marginBottom: "8px",
  },
  containerrLoadingTasksList: {
    display: "flex",
  },
  containerTask: {
    flex: 1,
    minWidth: "253px",
  },
  gridContainerRow: {
    display: "flex",
  },
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
    <Box>
      <Box className={classes.gridContainerRow}>
        <Stack className={classes.workItemColumn}>
          <Box>
            <Skeleton variant="text" height={50} animation="wave" />
            <Skeleton
              variant="circular"
              height={40}
              animation="wave"
              className={classes.avatar}
            />
            <Skeleton variant="rectangular" height={120} animation="wave" />
          </Box>
        </Stack>

        <Stack className={classes.taskItemColumn}>
          <Box>
            <Skeleton variant="text" height={50} animation="wave" />
            <Skeleton
              variant="circular"
              height={40}
              animation="wave"
              className={classes.avatar}
            />
            <Skeleton variant="rectangular" height={120} animation="wave" />
          </Box>
        </Stack>

        <Stack className={classes.taskItemColumn}>
          <Box>
            <Skeleton variant="text" height={50} animation="wave" />
            <Skeleton
              variant="circular"
              height={40}
              animation="wave"
              className={classes.avatar}
            />
            <Skeleton variant="rectangular" height={120} animation="wave" />
          </Box>
        </Stack>

        <Stack className={classes.taskItemColumn}>
          <Box>
            <Skeleton variant="text" height={50} animation="wave" />
            <Skeleton
              variant="circular"
              height={40}
              animation="wave"
              className={classes.avatar}
            />
            <Skeleton variant="rectangular" height={120} animation="wave" />
          </Box>
        </Stack>

        <Stack className={classes.taskItemColumn}>
          <Box>
            <Skeleton variant="text" height={50} animation="wave" />
            <Skeleton
              variant="circular"
              height={40}
              animation="wave"
              className={classes.avatar}
            />
            <Skeleton variant="rectangular" height={120} animation="wave" />
          </Box>
        </Stack>

        <Stack className={classes.taskItemColumn}>
          <Box>
            <Skeleton variant="text" height={50} animation="wave" />
            <Skeleton
              variant="circular"
              height={40}
              animation="wave"
              className={classes.avatar}
            />
            <Skeleton variant="rectangular" height={120} animation="wave" />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoadingTasksList;
