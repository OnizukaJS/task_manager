import React from "react";
import artifactsIcon from "../images/artifacts-icon.png";
import navCode from "../images/Nav-Code.png";
import navDashboard from "../images/Nav-Dashboard.png";
import navFirstIcon from "../images/Nav-First-icon.png";
import navLaunch from "../images/Nav-Launch.png";
import navPlan from "../images/Nav-Plan.png";
import navTest from "../images/Nav-Test.png";
import { ListItemButton, ListItemIcon } from "@mui/material";
import {
  Box,
  Divider,
  Drawer,
  List,
  makeStyles,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import { ChevronRight, Close, SettingsOutlined } from "@material-ui/icons";

const menuDrawerIcons = [
  {
    image: navDashboard,
    text: "Overview",
  },
  {
    image: navPlan,
    text: "Boards",
  },
  {
    image: navCode,
    text: "Repos",
  },
  {
    image: navLaunch,
    text: "Pipelines",
  },
  {
    image: navTest,
    text: "Test Plans",
  },
  {
    image: artifactsIcon,
    text: "Artifacts",
  },
];

const DrawerCustom = withStyles({
  root: {
    "& .MuiDrawer-paper": {
      backgroundColor: "#EAEAEA",
      top: "4.14em",
      display: "flex",
      //   justifyContent: "space-between",
      maxWidth: "50px",
    },
  },
})(Drawer);

const useStyles = makeStyles({
  boardsIcon: {
    backgroundColor: "#dcdcdc!important",
    borderLeft: "4px solid #0078d4!important",
  },
  plusIcon: {
    transform: "rotate(45deg)",
  },
});

const DrawerMenu = () => {
  const classes = useStyles();

  return (
    <DrawerCustom variant="permanent">
      <List>
        <Tooltip title="VBS.ZASV" arrow>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: "center",
            }}
          >
            <ListItemIcon
              sx={{
                mr: "auto",
                justifyContent: "center",
              }}
            >
              <img
                src={navFirstIcon}
                alt=""
                style={{ width: "27px", borderRadius: "3px" }}
              />
            </ListItemIcon>
          </ListItemButton>
        </Tooltip>

        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: "center",
            mb: 1,
          }}
        >
          <ListItemIcon
            sx={{
              mr: "auto",
              justifyContent: "center",
            }}
          >
            <Close className={classes.plusIcon} />
          </ListItemIcon>
        </ListItemButton>

        <Divider />
        {menuDrawerIcons.map((menuIcon) => (
          <Tooltip title={menuIcon.text} arrow>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: "center",
              }}
              className={
                menuIcon.text === "Boards" ? classes.boardsIcon : undefined
              }
            >
              <ListItemIcon
                sx={{
                  mr: "auto",
                  justifyContent: "center",
                }}
              >
                <img
                  src={menuIcon.image}
                  alt=""
                  style={{ width: "27px", borderRadius: "3px" }}
                />
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>
        ))}
      </List>

      <Box>
        <Divider />

        <List>
          <Tooltip title="Project settings" arrow>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: "center",
                mb: 1,
              }}
            >
              <ListItemIcon
                sx={{
                  mr: "auto",
                  justifyContent: "center",
                }}
              >
                <SettingsOutlined />
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>

          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: "center",
              mb: 1,
            }}
          >
            <ListItemIcon
              sx={{
                mr: "auto",
                justifyContent: "center",
              }}
            >
              <ChevronRight />
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Box>
    </DrawerCustom>
  );
};

export default DrawerMenu;
