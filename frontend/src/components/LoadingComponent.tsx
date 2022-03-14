import { makeStyles } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const useStyles = makeStyles({
  textSpinner: {
    marginTop: "12px",
  },
});

const LoadingComponent = () => {
  const classes = useStyles();

  return (
    <Box m={1}>
      <CircularProgress />
      <p className={classes.textSpinner}>Loading...</p>
    </Box>
  );
};

export default LoadingComponent;
