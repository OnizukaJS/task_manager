import { makeStyles } from "@material-ui/core";
import { Skeleton, Stack, Box } from "@mui/material";
import React from "react";

const useStyles = makeStyles({
  avatar: {
    width: "30px",
    margin: "5px 0",
  },
  gridContainerRow: {
    display: "flex",
  },
  rectangular2: {
    marginBottom: "2px",
  },
  rectangular3: {
    marginTop: "2px",
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
          <Skeleton variant="rectangular" height={17.5} animation="wave" />
          <Skeleton
            variant="circular"
            height={36}
            width={36}
            animation="wave"
            className={classes.avatar}
          />
          <Skeleton
            variant="rectangular"
            height={24.63}
            animation="wave"
            className={classes.rectangular2}
          />
          <Skeleton
            variant="rectangular"
            height={20.33}
            animation="wave"
            className={classes.rectangular3}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default LoadingTask;
