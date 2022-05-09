import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Box from "@mui/material/Box";
import useRefresh from "../hooks/useRefresh";
import Header from "../components/Header";
import Routes from "./Routes";

const useStyles = makeStyles({
  containerApp: {
    padding: "0 !important",
    fontFamily: "Roboto",
    height: "100%",
    overflow: "hidden",
  },
  containerRouteComponent: {
    marginTop: "65px",
    height: "calc(100% - 4rem)",
  },
  drawer: {},
  menuList: {
    borderRight: "1px solid",
    marginRight: "16px",
  },
  link: {
    textDecoration: "none",
  },
  plusIcon: {
    transform: "rotate(45deg)",
  },
});

const App = () => {
  const classes = useStyles();
  const [refreshState, triggerRefresh] = useRefresh();

  return (
    <Container className={classes.containerApp} maxWidth={false}>
      <Header refreshState={refreshState} triggerRefresh={triggerRefresh} />

      <Box className={classes.containerRouteComponent}>
        <Routes triggerRefreshHeader={triggerRefresh} />
      </Box>
    </Container>
  );
};

export default App;
