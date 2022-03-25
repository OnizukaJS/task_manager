import React, { useMemo } from "react";
import { Route, Switch } from "react-router-dom";
import { Box, makeStyles } from "@material-ui/core";
import LoginPage from "./LoginPage";
import useRefresh from "../hooks/useRefresh";
import RegistrationPage from "./RegistrationPage";
import MyAccountPage from "./MyAccountPage";
import TasksListPage from "./TaskListPage";
import routes from "../config/routes";
import Cookies from "universal-cookie";

const useStyles = makeStyles({
  containerRoutes: {
    padding: "16px 24px",
    overflow: "hidden",
    marginLeft: "55px",
  },
});

const Routes = () => {
  const [refreshState, triggerRefresh] = useRefresh();
  const classes = useStyles();

  const employeeId = useMemo(() => {
    const cookie = new Cookies();
    return cookie.get("employeeId");
  }, []);

  return (
    <Box
      className={classes.containerRoutes}
      component="main"
      sx={{ flexGrow: 1, p: 3 }}
    >
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
  );
};

export default Routes;
