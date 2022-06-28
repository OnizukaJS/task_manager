import {
  createStyles,
  ListItemIcon,
  makeStyles,
  MenuItem,
  MenuList,
  Theme,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Tooltip,
  styled,
  TooltipProps,
  Divider,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";
import routes from "../config/routes";
import {
  Search,
  Login,
  FormatListBulleted,
  FormatListBulletedSharp,
  ShoppingBagOutlined,
  HelpOutlineOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import useFetchEmployeeData from "../hooks/useFetchEmployeeData";
import { withStyles } from "@material-ui/styles";
import MyAccountPopoverMenuItem from "./MyAccountPopoverMenuItem";
import azureDevopsLogo from "../images/azure-devops-logo.png";
import { useWarningSnackbar } from "../hooks/useErrorSnackbar";
import { tooltipClasses } from "@mui/material/Tooltip";
import DrawerMenu from "./DrawerMenu";

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    azureLogo: {
      width: "25px",
      height: "25px",
    },
    containerHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: "65px",
    },
    containerHeaderNotLogged: {
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
      minHeight: "65px",
      marginRight: theme.spacing(2),
    },
    containerHeaderMenu: {
      position: "fixed",
      width: "100%",
      backgroundColor: "white",
    },
    containerLogo: {
      display: "flex",
      marginLeft: theme.spacing(2),
      alignItems: "center",
    },
    iconsHeader: {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
      color: "rgba(102,102,102,1)",

      "&:hover": {
        backgroundColor: "#FAFAFA",
      },
    },
    iconsNotLogged: {
      marginRight: theme.spacing(0.5),
      color: "#3f51b5",
    },
    iconSearch: {
      transform: "rotate(90deg)",
      color: "rgba(102,102,102,1)",
    },
    link: {
      textDecoration: "none",
    },
    linkToTaskList: {
      textDecoration: "none",
    },
    listItemIcon: {
      alignItems: "center",
    },
    menuList: {
      display: "flex",
      alignItems: "center",
    },
    menuItemsLogo: {
      display: "flex",
      color: "rgba(102,102,102,1)",
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

const CustomInputSearch = withStyles({
  root: {
    "& .MuiOutlinedInput-adornedStart": {
      paddingLeft: "10px",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "3px",
    },
    "& .MuiOutlinedInput-input": {
      padding: "10px 14px 10px 0",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(102,102,102,1)",
    },
  },
})(TextField);

const menuItemsLogo = ["is-propd", "VBS.ZASV", "Board", "Sprint"];

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

interface HeaderProps {
  triggerRefresh: () => void;
  refreshState: number;
}

const Header = ({ triggerRefresh, refreshState }: HeaderProps) => {
  const { showMessage: showWarningMessage } = useWarningSnackbar();
  const classes = useStyles();
  const [currentEmployeeData] = useFetchEmployeeData(
    localStorage.getItem("employeeId")!,
    refreshState
  );

  const handleDoesNothing = () => {
    showWarningMessage({ message: "This button does nothing! :)" });
  };

  return localStorage.getItem("employeeId") ? (
    <Box className={classes.containerHeaderMenu}>
      <Box className={classes.containerHeader}>
        <Box className={classes.containerLogo}>
          <Link to={routes.tasksList} className={classes.linkToTaskList}>
            <img
              src={azureDevopsLogo}
              alt="Azure DevOps"
              className={classes.azureLogo}
            />
          </Link>

          <Box className={classes.menuItemsLogo}>
            {menuItemsLogo.map((menuItem, index) => (
              <>
                <MenuItem onClick={handleDoesNothing}>
                  <Typography>{menuItem}</Typography>
                </MenuItem>
                {index + 1 !== menuItemsLogo.length && (
                  <Typography>/</Typography>
                )}
              </>
            ))}
          </Box>
        </Box>

        <MenuList className={classes.menuList}>
          <CustomInputSearch
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search className={classes.iconSearch} />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
          <MenuItem className={classes.iconsHeader} onClick={handleDoesNothing}>
            <FormatListBulletedSharp />
          </MenuItem>
          <MenuItem className={classes.iconsHeader} onClick={handleDoesNothing}>
            <ShoppingBagOutlined />
          </MenuItem>
          <MenuItem className={classes.iconsHeader} onClick={handleDoesNothing}>
            <Tooltip title="Help">
              <HelpOutlineOutlined />
            </Tooltip>
          </MenuItem>
          <MenuItem className={classes.iconsHeader} onClick={handleDoesNothing}>
            <Tooltip title="User settings">
              <PersonOutlineOutlined />
            </Tooltip>
          </MenuItem>

          <LightTooltip
            title={`Account manager for ${currentEmployeeData?.employeeName} ${currentEmployeeData?.employeeSurname}`}
          >
            <MyAccountPopoverMenuItem
              currentEmployeeData={currentEmployeeData!}
              triggerRefresh={triggerRefresh}
            />
          </LightTooltip>
        </MenuList>
      </Box>
      <Divider />
      <DrawerMenu />
    </Box>
  ) : (
    <Box className={classes.containerHeaderMenu}>
      <Box className={classes.containerHeaderNotLogged}>
        <MenuList className={classes.menuList}>
          <Link to={routes.loginPage} className={classes.link}>
            <CustomMenuItem>
              <ListItemIcon className={classes.listItemIcon}>
                <Login fontSize="small" className={classes.iconsNotLogged} />
                <Typography variant="inherit">Login</Typography>
              </ListItemIcon>
            </CustomMenuItem>
          </Link>
          <Link to={routes.registrationPage} className={classes.link}>
            <CustomMenuItem>
              <ListItemIcon className={classes.listItemIcon}>
                <FormatListBulleted
                  fontSize="small"
                  className={classes.iconsNotLogged}
                />
                <Typography variant="inherit">Registration</Typography>
              </ListItemIcon>
            </CustomMenuItem>
          </Link>
        </MenuList>
      </Box>
      <Divider />
    </Box>
  );
};

export default Header;
