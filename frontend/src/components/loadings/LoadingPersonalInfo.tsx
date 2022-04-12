import { makeStyles } from "@material-ui/core";
import { Skeleton, Stack, Box } from "@mui/material";
import React from "react";

const useStyles = makeStyles((theme) => ({
  containerIconInfo: {
    display: "flex",
  },
  containerJobInfo: {
    display: "flex",
    justifyContent: "center",
    margin: "16px 0",
  },
  containerLoadingPersonalInfo: {
    position: "relative",
    top: "-2rem",
  },
  icons: {
    marginRight: theme.spacing(1),
  },
}));

const LoadingPersonInfo = () => {
  const classes = useStyles();

  return (
    <Box className={classes.containerLoadingPersonalInfo}>
      <Stack>
        <Box>
          <Skeleton height={60} animation="wave" />
        </Box>

        <Box className={classes.containerJobInfo}>
          <Skeleton height={40} width="60%" animation="wave" />
        </Box>

        <Box className={classes.containerIconInfo}>
          <Skeleton
            height={40}
            width="9%"
            animation="wave"
            className={classes.icons}
          />
          <Skeleton variant="text" height={40} width="80%" animation="wave" />
        </Box>

        <Box className={classes.containerIconInfo}>
          <Skeleton
            height={40}
            width="9%"
            animation="wave"
            className={classes.icons}
          />
          <Skeleton variant="text" height={40} width="80%" animation="wave" />
        </Box>

        <Box className={classes.containerIconInfo}>
          <Skeleton
            height={40}
            width="9%"
            animation="wave"
            className={classes.icons}
          />
          <Skeleton variant="text" height={40} width="80%" animation="wave" />
        </Box>
      </Stack>
    </Box>
  );
};

export default LoadingPersonInfo;
