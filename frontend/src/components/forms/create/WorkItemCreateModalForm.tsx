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
import WorkItemModelToCreate from "../../../models/workItemModels/WorkItemModelToCreate";
import apiUrls from "../../../constants/apiUrls";

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
    containerForm: {
      padding: "0 16px 16px",
    },
    containerTitle: {
      borderLeft: "8px solid #009CCC",
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

    fetch(apiUrls.baseWorkItemUrl, {
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
      <Box className={`${classes.displayCenter} ${classes.containerTitle}`}>
        <h2 className={classes.titleTaskToCreate}>Add Work Item</h2>
      </Box>
      <Box className={classes.containerForm}>
        <form onSubmit={handleSubmit}>
          <Box>
            <TextField label="Name" name="name" onChange={handleChange} />
          </Box>
          <Box>
            <TextField
              label="Description"
              name="description"
              onChange={handleChange}
            />
          </Box>
          <Box className={classes.displayCenter}>
            <ButtonComponent
              text={`Create Work Item`}
              type="submit"
              color="primary"
              variant="contained"
              marginTop="2rem"
            />
          </Box>
        </form>
      </Box>
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
