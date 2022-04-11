import {
  Box,
  createStyles,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ButtonComponent from "../components/buttons/ButtonComponent";
import LoadingUpdatePassword from "../components/loadings/LoadingUpdatePassword";
import useErrorSnackbar, {
  useSuccessSnackbar,
} from "../hooks/useErrorSnackbar";
import useFetchEmployeeData from "../hooks/useFetchEmployeeData";
import EmployeePassword from "../models/employeeModels/EmployeePassword";

interface UpdatePasswordPageProps {
  employeeId: string;
  refreshState: number;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    containerInputs: {
      margin: "16px 0",
    },
    containerUpdatePassword: {
      backgroundColor: "white",
      width: "80%",
    },
    containerUpdatePasswordButtons: {
      marginTop: theme.spacing(4),
    },
    containerUpdatePasswordForm: {},
    containerUpdatePasswordFormAndTitle: {
      width: "35%",
      height: "100%",
      marginLeft: theme.spacing(3),
    },
    containerUpdatePasswordPage: {
      backgroundColor: "#f8f8f8",
      display: "flex",
      justifyContent: "center",
      height: "100%",
    },
    containerUserId: {
      margin: "16px 0",
    },
    textFieldInputs: {
      width: "100%",
    },
    updatePasswordForm: {},
    inputTitles: {
      fontWeight: "bold",
    },
    updatePasswordTitle: {
      fontSize: "28px",
      margin: "3rem 0",
    },
  })
);

const UpdatePasswordPage = ({
  employeeId,
  refreshState,
}: UpdatePasswordPageProps) => {
  const classes = useStyles();
  const history = useHistory();
  const { showMessage: showSuccessMessage } = useSuccessSnackbar();
  const { showMessage: showErrorMessage } = useErrorSnackbar();
  const [newPassword, setNewPassword] = useState<EmployeePassword>({
    password: "",
    confirmPassword: "",
  });

  const [employeeData, isLoading] = useFetchEmployeeData(
    employeeId,
    refreshState
  );

  const handleUpdatePassword = (
    e: React.FormEvent<HTMLFormElement> | undefined
  ) => {
    e?.preventDefault();

    fetch(`https://localhost:44358/api/Employees/${employeeId}/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: newPassword.password,
        confirmPassword: newPassword.confirmPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Error ${response.status}`);
        return response.json();
      })
      .then((data) => {
        showSuccessMessage({ message: "Password updated successfully." });
        setNewPassword({ ...newPassword, password: "", confirmPassword: "" });
      })
      .catch(() => {
        showErrorMessage({
          message:
            "Something went wrong. Double check both passwords are equals.",
        });
      });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };

  return (
    <Box className={classes.containerUpdatePasswordPage}>
      <Box className={classes.containerUpdatePassword}>
        <Box className={classes.containerUpdatePasswordFormAndTitle}>
          <Typography className={classes.updatePasswordTitle}>
            Change password
          </Typography>

          {isLoading ? (
            <LoadingUpdatePassword />
          ) : (
            <Box className={classes.containerUpdatePasswordForm}>
              <Box className={classes.containerUserId}>
                <Typography className={classes.inputTitles}>User ID</Typography>
                <Typography>{employeeData?.email}</Typography>
              </Box>
              <form
                onSubmit={handleUpdatePassword}
                className={classes.updatePasswordForm}
              >
                <Box className={classes.containerInputs}>
                  <Typography className={classes.inputTitles}>
                    Create new password
                  </Typography>
                  <TextField
                    name="password"
                    onChange={handleChangePassword}
                    variant="outlined"
                    size="small"
                    className={classes.textFieldInputs}
                  />
                </Box>

                <Box className={classes.containerInputs}>
                  <Typography className={classes.inputTitles}>
                    Confirm new password
                  </Typography>
                  <TextField
                    name="confirmPassword"
                    onChange={handleChangePassword}
                    variant="outlined"
                    size="small"
                    className={classes.textFieldInputs}
                  />
                </Box>

                <Box className={classes.containerUpdatePasswordButtons}>
                  <ButtonComponent
                    text="Submit"
                    type="submit"
                    variant="contained"
                    backgroundColor="#7fba00"
                    onHoverColor="#7fba00"
                    color="secondary"
                    borderRadius="0"
                    boxShadow="none"
                  />
                  <ButtonComponent
                    text="Cancel"
                    type="reset"
                    variant="contained"
                    backgroundColor="transparent"
                    onHoverColor="transparent"
                    boxShadow="none"
                    onClick={() => history.push("/my-account")}
                  />
                </Box>
              </form>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UpdatePasswordPage;
