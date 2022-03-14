import {
  Box,
  MenuItem,
  Popover,
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core";
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import EmployeeModel from "../models/employeeModels/EmployeeModel";
import ProfilePicture from "./ProfilePicture";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import routes from "../config/routes";
import Cookies from "universal-cookie";
import { useHistory } from "react-router";

const CustomMenuItem = withStyles({
  root: {
    "&:hover": {
      backgroundColor: "#FAFAFA",
    },
  },
})(MenuItem);

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    bold: {
      fontWeight: "bold",
    },
    containerFooterPopover: {
      backgroundColor: "#f4f4f4",
      "&:hover": {
        backgroundColor: "#EBEBEB",
        cursor: "pointer",
      },
    },
    containerHeaderPopover: {
      justifyContent: "space-between",
    },
    containerPopover: {
      width: "320px",
    },
    containerPopoverInfo: {},
    containerPopoverPictureInfo: {},
    displayFlexAlignItems: {
      display: "flex",
      alignItems: "center",
    },
    iconSignIn: {
      border: "1px solid",
      borderRadius: "50%",
      color: "#707070",
      marginRight: theme.spacing(1),
      padding: theme.spacing(1),
    },
    link: {
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    padding: {
      padding: theme.spacing(2),
    },
    profilePic: {
      marginRight: theme.spacing(2),
    },
    signOutButton: {
      "&:hover": {
        backgroundColor: "#EBEBEB",
        cursor: "pointer",
      },
    },
  })
);

interface MyAccountPopoverMenuItemProps {
  currentEmployeeData: EmployeeModel | undefined;
  triggerRefresh: () => void;
}

const MyAccountPopoverMenuItem = ({
  currentEmployeeData,
  triggerRefresh,
}: MyAccountPopoverMenuItemProps) => {
  const classes = useStyles();

  const cookies = useMemo(() => {
    const cook = new Cookies();
    return cook;
  }, []);

  const history = useHistory();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    cookies.remove("employeeId", { path: "/" });
    cookies.remove("email", { path: "/" });
    cookies.remove("password", { path: "/" });
    cookies.remove("employeeName", { path: "/" });
    cookies.remove("employeeSurname", { path: "/" });
    cookies.remove("employeeAge", { path: "/" });
    cookies.remove("city", { path: "/" });

    history.push("/");
    triggerRefresh();
  };

  return (
    <>
      <CustomMenuItem
        title={`Account Manager for ${currentEmployeeData?.employeeName} ${currentEmployeeData?.employeeSurname}`}
      >
        <Box onClick={handleClick}>
          <ProfilePicture
            name={currentEmployeeData?.employeeName!}
            surname={currentEmployeeData?.employeeSurname!}
            height={32}
            width={32}
            fontSize={15}
          />
        </Box>
      </CustomMenuItem>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box className={`${classes.containerPopover}`}>
          <Box
            className={`${classes.displayFlexAlignItems} ${classes.containerHeaderPopover}`}
          >
            <Box className={`${classes.padding}`}>ISOLUTIONS AG</Box>
            <Box
              className={`${classes.signOutButton} ${classes.padding}`}
              onClick={handleSignOut}
            >
              Sign out
            </Box>
          </Box>
          <Box
            className={`${classes.displayFlexAlignItems} ${classes.padding} ${classes.containerPopoverPictureInfo}`}
          >
            <Box className={classes.profilePic}>
              <ProfilePicture
                name={currentEmployeeData?.employeeName!}
                surname={currentEmployeeData?.employeeSurname!}
                height={88}
                width={88}
                fontSize={40}
              />
            </Box>
            <Box className={`${classes.containerPopoverInfo}`}>
              <Box className={classes.bold}>
                {currentEmployeeData?.employeeName}{" "}
                {currentEmployeeData?.employeeSurname}
              </Box>
              <Box>{currentEmployeeData?.email}</Box>
              <Link
                to={routes.myAccount}
                className={`${classes.link}`}
                onClick={handleClose}
              >
                View account
              </Link>
              <br />
              <Link to="#" className={classes.link}>
                Switch directory
              </Link>
            </Box>
          </Box>
          <Box
            className={`${classes.displayFlexAlignItems} ${classes.padding} ${classes.containerFooterPopover}`}
          >
            <PersonAddAltOutlinedIcon className={classes.iconSignIn} />
            Sign in with a different account
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default MyAccountPopoverMenuItem;
