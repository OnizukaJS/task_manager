import { Grid, makeStyles } from "@material-ui/core";
import React from "react";

const useSyles = makeStyles({
  gridItem: {
    border: "1px solid",
    borderRadius: "4%",
    margin: "0 .5em",
  },
});

const HomePage = () => {
  const classes = useSyles();

  return (
    <Grid container justifyContent="center" spacing={5}>
      <Grid item className={classes.gridItem}>
        New Tasks
      </Grid>
      <Grid item className={classes.gridItem}>
        Active Tasks
      </Grid>
      <Grid item className={classes.gridItem}>
        Resolved Tasks
      </Grid>
      <Grid item className={classes.gridItem}>
        Tasks Ready For Test
      </Grid>
      <Grid item className={classes.gridItem}>
        Closed Tasks
      </Grid>
    </Grid>
  );
};

export default HomePage;
