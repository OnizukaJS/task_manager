import { makeStyles } from "@material-ui/core";
import { Skeleton, Box } from "@mui/material";
import React from "react";

const useStyles = makeStyles({
  avatar: {
    marginRight: "8px",
  },
  comment: {
    height: "95px",
    width: "100%",
    borderRadius: "5px",
  },
  containerLoadingComment: {
    display: "flex",
    width: "100%",
    marginTop: "16px",
  },
});

const LoadingCommentsList = () => {
  const classes = useStyles();
  return (
    <Box className={classes.containerLoadingComment}>
      <Box className={classes.avatar}>
        <Skeleton variant="circular" animation="wave" height={40} width={40} />
      </Box>

      <Skeleton
        variant="rectangular"
        height={120}
        animation="wave"
        className={classes.comment}
      />
    </Box>
  );
};

export default LoadingCommentsList;
