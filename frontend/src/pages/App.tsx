import React from "react";
import { Container, Divider, makeStyles } from "@material-ui/core";
import Box from "@mui/material/Box";
import useRefresh from "../hooks/useRefresh";
import Header from "../components/Header";
import DrawerMenu from "../components/DrawerMenu";
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

      <Divider />

      <Box sx={{ display: "flex" }}>
        <DrawerMenu />

        <Routes />
      </Box>
    </Container>
  );
};

export default App;
