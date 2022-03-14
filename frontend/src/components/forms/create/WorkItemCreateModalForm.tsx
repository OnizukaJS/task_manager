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
import { useHistory } from "react-router-dom";
import TaskTypeEnum from "../../../models/enum/TaskTypeEnum";
import WorkItemModelToCreate from "../../../models/workItemModels/WorkItemModelToCreate";

interface WorkItemCreateModalFormProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  workItemToCreate: WorkItemModelToCreate;
  triggerRefresh: () => void;
  setOpenCreateWorkItem: Dispatch<SetStateAction<boolean>>;
  openCreateWorkItem: boolean;
  employeeId: string | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    titleTaskToCreate: {
      fontFamily: "sans-serif",
    },
  })
);

const WorkItemCreateModalForm = ({
  handleChange,
  workItemToCreate,
  triggerRefresh,
  setOpenCreateWorkItem,
  openCreateWorkItem,
  employeeId,
}: WorkItemCreateModalFormProps) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClose = () => {
    setOpenCreateWorkItem(false);
    history.push("/task");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault();

    fetch(`https://localhost:44358/api/WorkItems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: workItemToCreate.name,
        description: workItemToCreate.description,
        status: workItemToCreate.status,
        type: workItemToCreate.type,
        employeeId: employeeId,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => triggerRefresh())
      .catch(() => console.log("ERROR while posting new work item"));

    handleClose();
  };

  const body = (
    <Box className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <Box className={classes.displayCenter}>
          <h2 className={classes.titleTaskToCreate}>
            Add {TaskTypeEnum[workItemToCreate.type]}
          </h2>
        </Box>
        <TextField label="Name" name="name" onChange={handleChange} /> <br />
        <TextField
          label="Description"
          name="description"
          onChange={handleChange}
        />
        <br />
        <Box className={classes.displayCenter}>
          <ButtonComponent
            text={`Create ${TaskTypeEnum[workItemToCreate.type]}`}
            type="submit"
            color="primary"
            variant="contained"
            marginTop="2rem"
          />
        </Box>
      </form>
    </Box>
  );

  return (
    <Modal
      open={openCreateWorkItem}
      onClose={handleClose}
      className={classes.modal}
    >
      {body}
    </Modal>
  );
};

export default WorkItemCreateModalForm;
