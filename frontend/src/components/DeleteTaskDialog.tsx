import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import React from "react";
import WarningIcon from "@mui/icons-material/Warning";
import TaskTypeEnum from "../models/enum/TaskTypeEnum";

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    containerDialogContent: {
      display: "flex",
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
      <DialogTitle>Delete work item(s)</DialogTitle>
      <DialogContent className={classes.containerDialogContent}>
        <Box>
          <WarningIcon />
        </Box>
        <Box>
          Are you sure you want to delete the selected work item(s)? <br />
          You can restore deleted work items from the Recycle Bin.
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={() => setOpenDeleteTaskDialog(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskDialog;
