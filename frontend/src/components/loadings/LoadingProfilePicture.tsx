import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { Skeleton, Stack } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  containerProfilePicture: {
    border: "6px solid white",
    boxShadow: "rgb(0 0 0 / 40%) 0px 0px 8px",
    borderRadius: "50%",
  },
}));

const LoadingProfilePicture = () => {
  const classes = useStyles();
  return (
    <Box>
      <Stack className={classes.containerProfilePicture}>
        <Skeleton variant="circular" height={100} width={100} />
      </Stack>
    </Box>
  );
};

export default LoadingProfilePicture;
