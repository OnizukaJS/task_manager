import { makeStyles } from "@material-ui/core";
import { Skeleton, Stack, Box } from "@mui/material";
import React from "react";

const useStyles = makeStyles({
  buttonLeft: {
    marginRight: "4px",
  },
  buttonRight: {
    marginLeft: "4px",
  },
  buttons: {
    flex: 1,
  },
  containerButtons: {
    display: "flex",
  },
  containerInputs: {
    margin: "16px 0",
  },
  loadingInputTitle: {
    width: "40%",
    margin: "6px 0",
  },
  gridContainerRow: {
    display: "flex",
  },
  loadingInput: {
    flex: 1,
    margin: "0 3px",
  },
});

const LoadingUpdatePassword = () => {
  const classes = useStyles();

  return (
    <Box className={classes.gridContainerRow}>
      <Stack className={classes.loadingInput}>
        <Box className={classes.containerInputs}>
          <Skeleton
            height={40}
            animation="wave"
            className={classes.loadingInputTitle}
          />
          <Skeleton variant="text" height={40} animation="wave" />
        </Box>
        <Box className={classes.containerInputs}>
          <Skeleton
            height={40}
            animation="wave"
            className={classes.loadingInputTitle}
          />
          <Skeleton variant="text" height={40} animation="wave" />
        </Box>
        <Box className={classes.containerInputs}>
          <Skeleton
            height={40}
            animation="wave"
            className={classes.loadingInputTitle}
          />
          <Skeleton variant="text" height={40} animation="wave" />
        </Box>

        <Box className={classes.containerButtons}>
          <Skeleton
            height={70}
            animation="wave"
            className={`${classes.buttons} ${classes.buttonLeft}`}
          />
          <Skeleton
            height={70}
            animation="wave"
            className={`${classes.buttons} ${classes.buttonRight}`}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default LoadingUpdatePassword;
