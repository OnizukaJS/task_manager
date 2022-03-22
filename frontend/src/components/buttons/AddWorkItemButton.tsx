import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import routes from "../../config/routes";
import { Add } from "@material-ui/icons";
import ButtonComponent from "./ButtonComponent";

interface AddWorkItemButtonProps {
  handleOpenCreateWorkItem: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: "none",
      display: "flex",
      marginLeft: theme.spacing(1),

      "&:hover": {
        backgroundColor: "#EAEAEA",
      },
    },
  })
);

const AddWorkItemButton = ({
  handleOpenCreateWorkItem,
}: AddWorkItemButtonProps) => {
  const classes = useStyles();

  return (
    <Link to={routes.createTask} className={classes.link}>
      <ButtonComponent
        text="New Work Item"
        onClick={() => handleOpenCreateWorkItem()}
        variant="text"
        startIcon={<Add fontSize="large" color="primary" />}
      />
    </Link>
  );
};

export default AddWorkItemButton;
