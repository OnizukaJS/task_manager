import React, { Dispatch, SetStateAction } from "react";

import {
  Box,
  createStyles,
  makeStyles,
  Modal,
  TextField,
  Theme,
} from "@material-ui/core";
import ButtonComponent from "../../buttons/ButtonComponent";
import TaskModelToCreate from "../../../models/taskModels/TaskModelToCreate";
import { useHistory } from "react-router-dom";
import TaskTypeEnum from "../../../models/enum/TaskTypeEnum";
import apiUrls from "../../../constants/apiUrls";

interface TaskCreateModalFormProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  taskToCreate: TaskModelToCreate;
  triggerRefresh: () => void;
  setOpenCreateTaskItem: Dispatch<SetStateAction<boolean>>;
  openCreateTaskItem: boolean;
  employeeId: string | undefined;
}

export interface StyleProps {
  type: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    containerForm: {
      padding: "0 16px 16px",
    },
    containerTitle: {
      borderLeft: (props) =>
        props.type === TaskTypeEnum[TaskTypeEnum.Task]
          ? "8px solid #F2CB1D"
          : "8px solid #CC293D",
    },
    displayCenter: {
      display: "flex",
      justifyContent: "center",
    },
    link: {
      textDecoration: "none",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: "5px",
      boxShadow: theme.shadows[5],
    },
    titleTaskToCreate: {
      fontFamily: "sans-serif",
    },
  })
);

const TaskCreateModalForm = ({
  handleChange,
  taskToCreate,
  triggerRefresh,
  setOpenCreateTaskItem,
  openCreateTaskItem,
  employeeId,
}: TaskCreateModalFormProps) => {
  const classes = useStyles({ type: TaskTypeEnum[taskToCreate.type] });
  const history = useHistory();

  const handleClose = () => {
    setOpenCreateTaskItem(false);
    history.push("/task");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault();

    fetch(apiUrls.baseTaskUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: taskToCreate.name,
        description: taskToCreate.description,
        status: taskToCreate.status,
        type: taskToCreate.type,
        employeeId: employeeId,
        workItemId: taskToCreate.workItemId,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => triggerRefresh())
      .catch(() => console.log("ERROR while posting new task"));

    handleClose();
  };

  const body = (
    <Box className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <Box className={`${classes.displayCenter} ${classes.containerTitle}`}>
          <h2 className={classes.titleTaskToCreate}>
            Add {TaskTypeEnum[taskToCreate.type]}
          </h2>
        </Box>
        <Box className={classes.containerForm}>
          <TextField label="Name" name="name" onChange={handleChange} /> <br />
          <TextField
            label="Description"
            name="description"
            onChange={handleChange}
          />
          <br />
          <Box className={classes.displayCenter}>
            <ButtonComponent
              text={`Create ${TaskTypeEnum[taskToCreate.type]}`}
              type="submit"
              color="primary"
              variant="contained"
              marginTop="2rem"
            />
          </Box>
        </Box>
      </form>
    </Box>
  );

  return (
    <Modal
      open={openCreateTaskItem}
      onClose={handleClose}
      className={classes.modal}
    >
      {body}
    </Modal>
  );
};

export default TaskCreateModalForm;
