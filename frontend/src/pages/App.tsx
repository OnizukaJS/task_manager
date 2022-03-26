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

      <Box sx={{ marginTop: "65px" }}>
        <Routes />
      </Box>
    </Container>
  );
};

export default App;
