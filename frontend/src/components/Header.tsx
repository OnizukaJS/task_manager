import {
  createStyles,
  ListItemIcon,
  makeStyles,
  MenuItem,
  MenuList,
  Theme,
  Typography,
  Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";
import Cookies from "universal-cookie";
import routes from "../config/routes";
import { TaskOutlined, Login, FormatListBulleted } from "@mui/icons-material";
import useFetchEmployeeData from "../hooks/useFetchEmployeeData";
import { withStyles } from "@material-ui/styles";
import MyAccountPopoverMenuItem from "./MyAccountPopoverMenuItem";
import azureDevopsLogo from "../images/azure-devops-logo.png";

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    containerHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 4px 2px -2px #CC293D",
    },
    containerLogo: {
      display: "flex",
      marginLeft: theme.spacing(2),
      alignItems: "center",
    },
    menuList: {
      display: "flex",
      alignItems: "center",
    },
    azureLogo: {
      width: "25px",
      height: "25px",
    },
    link: {
      textDecoration: "none",
    },
    menuItemsLogo: {
      display: "flex",
      color: "#7380a4",
      alignItems: "center",
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

const menuItemsLogo = ["is-propd", "VBS.ZASV", "Board", "Sprint"];

const handleDoesNothing = () => {
  alert("This button does nothing! :)");
};

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
    <Box className={classes.containerHeader}>
      <Box className={classes.containerLogo}>
        <img
          src={azureDevopsLogo}
          alt="Azure DevOps"
          className={classes.azureLogo}
        />

        <Box className={classes.menuItemsLogo}>
          {menuItemsLogo.map((menuItem, index) => (
            <>
              <MenuItem onClick={handleDoesNothing}>
                <Typography>{menuItem}</Typography>
              </MenuItem>
              {index + 1 !== menuItemsLogo.length && <Typography>/</Typography>}
            </>
          ))}
        </Box>
      </Box>

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
    </Box>
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
