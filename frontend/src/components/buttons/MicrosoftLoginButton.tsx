import { makeStyles } from "@material-ui/core";
import React from "react";
import microsoftIcon from "../../images/microsoft_icon.png";
import { useWarningSnackbar } from "../../hooks/useErrorSnackbar";

const useStyles = makeStyles({
  button: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginTop: "1rem",
    backgroundColor: "white",
    fontSize: "18px",
    borderRadius: ".3rem",
    border: "0.01rem solid rgb(204, 204, 204)",
  },
  icon: {
    width: "30px",
    margin: "8px",
  },
});

const MicrosoftLoginButton = () => {
  const classes = useStyles();
  const { showMessage: showWarningMessage } = useWarningSnackbar();

  const handleDoesNothing = () => {
    showWarningMessage({ message: "This button does nothing! ;)" });
  };

  return (
    <button className={classes.button} onClick={handleDoesNothing}>
      <img src={microsoftIcon} alt="microsoft_icon" className={classes.icon} />
      <span>Sign in with Microsoft</span>
    </button>
  );
};

export default MicrosoftLoginButton;
