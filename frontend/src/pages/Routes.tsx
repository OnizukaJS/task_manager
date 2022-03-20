import React, { useMemo, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import TasksListPage from "./TaskListPage";
import routes from "../config/routes";
import { Box, Container, makeStyles } from "@material-ui/core";
import LoginPage from "./LoginPage";
import useRefresh from "../hooks/useRefresh";
import RegistrationPage from "./RegistrationPage";
import MyAccountPage from "./MyAccountPage";
import Header from "../components/Header";
import Cookies from "universal-cookie";

const useStyles = makeStyles({
  container: {
    maxWidth: "100%",
    padding: "0 !important",
    fontFamily: "Roboto",
  },
  containerRoutes: {
    padding: "0 0.5rem",
  },
  menuList: {
    borderRight: "1px solid",
    marginRight: "16px",
  },
  link: {
    textDecoration: "none",
  },
});

const App = () => {
  const classes = useStyles();
  const employeeId = useMemo(() => {
    const cookie = new Cookies();
    return cookie.get("employeeId");
  }, []);
  const [refreshState, triggerRefresh] = useRefresh();

  // Add scrollbar to the body
  useEffect(() => {
    document.body.style.overflowY = "scroll";
  }, []);

  return (
    <Container className={classes.container}>
      <Header refreshState={refreshState} triggerRefresh={triggerRefresh} />

      <Box className={classes.containerRoutes}>
        <Switch>
          <Route exact path={routes.loginPage}>
            <LoginPage triggerRefresh={triggerRefresh} />
          </Route>

          <Route path={routes.registrationPage}>
            <RegistrationPage />
          </Route>

          <Route path={routes.tasksList}>
            <TasksListPage
              refreshState={refreshState}
              triggerRefresh={triggerRefresh}
            />
          </Route>

          <Route path={routes.myAccount}>
            <MyAccountPage
              triggerRefresh={triggerRefresh}
              refreshState={refreshState}
              employeeId={employeeId}
            />
          </Route>
        </Switch>
      </Box>
    </Container>
  );
};

export default App;
