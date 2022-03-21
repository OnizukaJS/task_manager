import {
  createStyles,
  ListItemIcon,
  makeStyles,
  MenuItem,
  MenuList,
  Theme,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";
import Cookies from "universal-cookie";
import routes from "../config/routes";
import { TaskOutlined, Login, FormatListBulleted } from "@mui/icons-material";
import useFetchEmployeeData from "../hooks/useFetchEmployeeData";
import { withStyles } from "@material-ui/styles";
import MyAccountPopoverMenuItem from "./MyAccountPopoverMenuItem";

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    menuList: {
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
      boxShadow: "0 4px 2px -2px #CC293D",
    },
    link: {
      textDecoration: "none",
    },
  })
);

const CustomMenuItem = withStyles({
  root: {
    "&:hover": {
      backgroundColor: "#FAFAFA",
    },
  },
})(MenuItem);

interface HeaderProps {
  triggerRefresh: () => void;
  refreshState: number;
}

const Header = ({ triggerRefresh, refreshState }: HeaderProps) => {
  const cookies = new Cookies();
  const classes = useStyles();
  const [currentEmployeeData] = useFetchEmployeeData(
    cookies.get("employeeId"),
    refreshState
  );

  return cookies.get("employeeId") ? (
    <MenuList className={classes.menuList}>
      <Link to={routes.tasksList} className={classes.link}>
        <CustomMenuItem>
          <ListItemIcon>
            <TaskOutlined fontSize="small" />
            <Typography variant="inherit">Go to Tasks</Typography>
          </ListItemIcon>
        </CustomMenuItem>
      </Link>

      <MyAccountPopoverMenuItem
        currentEmployeeData={currentEmployeeData!}
        triggerRefresh={triggerRefresh}
      />
    </MenuList>
  ) : (
    <MenuList className={classes.menuList}>
      <Link to={routes.loginPage} className={classes.link}>
        <CustomMenuItem>
          <ListItemIcon>
            <Login fontSize="small" />
            <Typography variant="inherit">Login</Typography>
          </ListItemIcon>
        </CustomMenuItem>
      </Link>
      <Link to={routes.registrationPage} className={classes.link}>
        <CustomMenuItem>
          <ListItemIcon>
            <FormatListBulleted fontSize="small" />
            <Typography variant="inherit">Registration</Typography>
          </ListItemIcon>
        </CustomMenuItem>
      </Link>
    </MenuList>
  );
};

export default Header;
