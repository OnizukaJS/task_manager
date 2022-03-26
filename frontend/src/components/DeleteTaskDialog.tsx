import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import WarningIcon from "@mui/icons-material/Warning";
import TaskTypeEnum from "../models/enum/TaskTypeEnum";
import { Close } from "@material-ui/icons";
import ButtonComponent from "./buttons/ButtonComponent";

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    closeIcon: {
      cursor: "pointer",
      position: "absolute",
      right: 0,
      display: "flex",
      padding: "5px 15px",

      "&:hover": {
        backgroundColor: "#eff6fc",
      },
    },
    containerActionButtons: {
      margin: "1rem",
    },
    containerDialogContent: {
      display: "flex",
      alignItems: "center",
    },
    containerWarningIcon: {
      marginRight: theme.spacing(2),
    },
    warningIcon: {
      color: "#d67f3c",
    },
  })
);
interface DeleteTaskDialogProps {
  openDeleteTaskDialog: boolean;
  setOpenDeleteTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
  triggerRefresh: () => void;
  type: TaskTypeEnum;
  id: string;
}

const DeleteTaskDialog = ({
  openDeleteTaskDialog,
  setOpenDeleteTaskDialog,
  handleClose,
  triggerRefresh,
  type,
  id,
}: DeleteTaskDialogProps) => {
  const classes = useStyles();

  const taskOrWorkItem =
    type === TaskTypeEnum.WorkItem ? "WorkItems" : "TasksToDo";

  const handleDelete = () => {
    fetch(`https://localhost:44358/api/${taskOrWorkItem}/${id}`, {
      method: "DELETE",
    })
      .then(() => console.log("Item deleted"))
      .then(() => setOpenDeleteTaskDialog(false))
      .then(() => triggerRefresh())
      .catch(() => console.log("ERROR while deleting"));

    handleClose();
  };

  return (
    <Dialog open={openDeleteTaskDialog}>
      <Tooltip title="Close" arrow>
        <Box
          className={classes.closeIcon}
          onClick={() => setOpenDeleteTaskDialog(false)}
        >
          <Close />
        </Box>
      </Tooltip>
      <DialogTitle>Delete work item(s)</DialogTitle>
      <DialogContent className={classes.containerDialogContent}>
        <Box className={classes.containerWarningIcon}>
          <WarningIcon className={classes.warningIcon} fontSize="large" />
        </Box>
        <Box>
          <Typography>
            Are you sure you want to delete the selected work item(s)?
          </Typography>
          <br />
          <Typography>
            You can restore deleted work items from the Recycle Bin.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions className={classes.containerActionButtons}>
        <ButtonComponent
          text="Delete"
          variant="contained"
          color="primary"
          borderRadius="0"
          boxShadow="none"
          backgroundColor="#0078d4"
          onHoverColor="#106ebe"
          onClick={handleDelete}
        />

        <ButtonComponent
          text="Cancel"
          variant="contained"
          borderRadius="0"
          boxShadow="none"
          backgroundColor="#efefef"
          onHoverColor="#eaeaea"
          marginLeft="6px"
          onClick={() => setOpenDeleteTaskDialog(false)}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskDialog;
