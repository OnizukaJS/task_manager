import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Box, makeStyles } from "@material-ui/core";
import LoginPage from "./LoginPage";
import useRefresh from "../hooks/useRefresh";
import RegistrationPage from "./RegistrationPage";
import MyAccountPage from "./MyAccountPage";
import TasksListPage from "./TaskListPage";
import routes from "../config/routes";
import UpdatePasswordPage from "./UpdatePasswordPage";
import useFetchEmployeeData from "../hooks/useFetchEmployeeData";

const useStyles = makeStyles({
  containerRoutes: {
    overflow: "hidden",
    height: "100%",
  },
});

interface RoutesProps {
  triggerRefreshHeader: () => void;
}

const Routes = ({ triggerRefreshHeader }: RoutesProps) => {
  const [refreshState, triggerRefresh] = useRefresh();
  const classes = useStyles();

  const [employeeId, setEmployeeId] = useState<string>();
  const [employeeData] = useFetchEmployeeData(employeeId!, refreshState);

  return (
    <Box className={classes.containerRoutes} component="main">
      <Switch>
        <Route exact path={routes.loginPage}>
          <LoginPage
            triggerRefresh={triggerRefresh}
            triggerRefreshHeader={triggerRefreshHeader}
          />
        </Route>

        <Route path={routes.registrationPage}>
          <RegistrationPage />
        </Route>

        <Route path={routes.tasksList}>
          <TasksListPage
            refreshState={refreshState}
            triggerRefresh={triggerRefresh}
            setEmployeeIdRoutes={setEmployeeId}
          />
        </Route>

        <Route exact path={routes.myAccount}>
          <MyAccountPage
            triggerRefresh={triggerRefresh}
            triggerRefreshHeader={triggerRefreshHeader}
            refreshState={refreshState}
            employeeId={employeeId!}
            employeeData={employeeData!}
          />
        </Route>

        <Route exact path={routes.updatePassword}>
          <UpdatePasswordPage
            employeeId={employeeId!}
            refreshState={refreshState}
          />
        </Route>
      </Switch>
    </Box>
  );
};

export default Routes;
