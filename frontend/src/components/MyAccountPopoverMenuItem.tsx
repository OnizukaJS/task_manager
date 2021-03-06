import {
  Box,
  MenuItem,
  Popover,
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmployeeModel from "../models/employeeModels/EmployeeModel";
import ProfilePicture from "./ProfilePicture";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import routes from "../config/routes";
import { useHistory } from "react-router";
import { useWarningSnackbar } from "../hooks/useErrorSnackbar";

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
    emailAccount: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    iconSignIn: {
      border: "1px solid",
      borderRadius: "50%",
      color: "#707070",
      marginRight: theme.spacing(1),
      padding: theme.spacing(1),
    },
    link: {
      color: "#0078d6",

      "&:visited": {
        color: "#0078d6",
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
  const { showMessage: showWarningMessage } = useWarningSnackbar();
  const classes = useStyles();

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
    localStorage.removeItem("employeeId");
    localStorage.removeItem("employeeName");
    localStorage.removeItem("employeeSurname");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("jobDescription");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("employeeAge");
    localStorage.removeItem("city");
    localStorage.removeItem("jobDescription");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("profilePicture");
    localStorage.removeItem("sasUriProfilPicture");

    history.push("/");
    triggerRefresh();
  };

  const handleDoesNothing = () => {
    showWarningMessage({ message: "This button does nothing! :)" });
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
            sasUriProfilPicture={currentEmployeeData?.sasUriProfilPicture}
            height={37}
            width={37}
            fontSize={17}
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
                sasUriProfilPicture={currentEmployeeData?.sasUriProfilPicture}
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
              <Box>
                <span className={classes.emailAccount}>
                  {currentEmployeeData?.email}
                </span>
              </Box>
              <Link
                to={routes.myAccount}
                className={`${classes.link}`}
                onClick={handleClose}
              >
                View account
              </Link>
              <br />
              <Link to="#" className={classes.link} onClick={handleDoesNothing}>
                Switch directory
              </Link>
            </Box>
          </Box>
          <Box
            className={`${classes.displayFlexAlignItems} ${classes.padding} ${classes.containerFooterPopover}`}
            onClick={handleDoesNothing}
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
