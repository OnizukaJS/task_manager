import React, { useState } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import AddBoxSharpIcon from "@material-ui/icons/AddBoxSharp";
import { AssignmentTurnedIn, BugReport } from "@material-ui/icons";
import TaskTypeEnum from "../../models/enum/TaskTypeEnum";
import { Link } from "react-router-dom";
import routes from "../../config/routes";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerIconAddTask: {
      marginTop: "5px",
    },
    link: {
      textDecoration: "none",
    },
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(0.5),
    },
    addIcon: {
      color: "#107c10",
      height: "2rem",
      width: "2rem",
      cursor: "pointer",
    },
    typography: {
      padding: theme.spacing(0.5),
      cursor: "pointer",
      minWidth: "8rem",
      display: "flex",
      alignItems: "center",
      margin: theme.spacing(0.25),
      border: "1px solid transparent",

      "&:hover": {
        backgroundColor: "#DEECF9",
        border: "1px solid #C7E0F4",
      },
    },
    iconType: {
      height: "18px",
    },
    taskType: {
      color: "#F2CB1D",
    },
    bugType: {
      color: "#CC293D",
    },
  })
);

interface AddTaskButtonProps {
  handleClosePopover?: () => void;
  handleUpdateTaskItemType?: (
    taskOrBug: TaskTypeEnum,
    workItemId: string
  ) => void;
  workItemId: string;
  popoverToDisplay?: string;
  setPopoverToDisplay?: React.Dispatch<React.SetStateAction<string>>;
}

const PopoverElement = withStyles({
  root: {
    "& .MuiPaper-rounded": {
      borderRadius: 0,
    },
  },
})(Popover);

const AddTaskButton = ({
  handleClosePopover,
  handleUpdateTaskItemType,
  workItemId,
  popoverToDisplay,
  setPopoverToDisplay,
}: AddTaskButtonProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);

  // HIDDEN MESSAGE
  const [hiddenMessage, setHiddenMessage] = useState<SVGSVGElement | null>(
    null
  );

  const handlePopoverOpen = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    setHiddenMessage(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setHiddenMessage(null);
  };

  const openHiddenMessage = Boolean(hiddenMessage);

  // SELECT
  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
    setPopoverToDisplay!(workItemId);
  };

  return (
    <>
      <Box className={classes.containerIconAddTask}>
        <AddBoxSharpIcon
          onClick={handleClick}
          className={classes.addIcon}
          aria-owns={openHiddenMessage ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        />

        {/* SELECT */}
        <PopoverElement
          anchorEl={anchorEl}
          open={popoverToDisplay === workItemId}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Link to={routes.createTask} className={classes.link}>
            <Typography
              className={classes.typography}
              onClick={() =>
                handleUpdateTaskItemType!(TaskTypeEnum.Task, workItemId)
              }
            >
              <AssignmentTurnedIn
                className={`${classes.iconType} ${classes.taskType}`}
              />
              Task{" "}
            </Typography>
          </Link>
          <Typography
            className={classes.typography}
            onClick={() =>
              handleUpdateTaskItemType!(TaskTypeEnum.Bug, workItemId)
            }
          >
            <BugReport className={`${classes.iconType} ${classes.bugType}`} />
            Bug
          </Typography>
        </PopoverElement>

        {/* HIDDEN MESSAGE */}
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={openHiddenMessage}
          anchorEl={hiddenMessage}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography>New Item</Typography>
        </Popover>
      </Box>
    </>
  );
};

export default AddTaskButton;
