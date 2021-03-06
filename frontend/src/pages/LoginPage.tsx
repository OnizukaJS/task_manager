import React, { useState, useEffect, useMemo } from "react";
import EmployeeLogin from "../models/employeeModels/EmployeeLogin";
import { Link, useHistory } from "react-router-dom";
import routes from "../config/routes";
import Box from "@material-ui/core/Box";
import { Divider, makeStyles, TextField, Typography } from "@material-ui/core";
import ButtonComponent from "../components/buttons/ButtonComponent";
import { withStyles } from "@material-ui/styles";
import GoogleLoginButton from "../components/buttons/GoogleLoginButton";
import MicrosoftLoginButton from "../components/buttons/MicrosoftLoginButton";
import LinkedinLoginButton from "../components/buttons/LinkedinLoginButton";
import apiUrls from "../constants/apiUrls";
import LoginBackground from "../images/login-registration-background.jpg";

const useStyles = makeStyles({
  containerLogin: {
    padding: "40px",
  },
  containerLoginForm: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 40px 30px 40px",
    margin: "0 auto",
    maxWidth: "500px",
    borderTop: "4px solid",
    borderColor: "#3f51b5",
    boxShadow:
      "0 0.1875rem 0.4375rem 0.1875rem rgb(3, 3, 3, 13%), 0 0.6875rem 1.5rem 1rem rgb(3, 3, 3, 12%)",
    background: "white",
  },
  containerLoginPage: {
    height: "100%",
    overflow: "auto",
    background: `url(
      ${LoginBackground}
    ) no-repeat center center fixed`,
  },
  containerLoginTitle: {
    display: "flex",
    justifyContent: "center",
    margin: "10px 0 20px 0",
  },
  doNotHaveAnAccount: {
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
  },
  loginTitle: {
    fontSize: 24,
    margin: "20px 0",
  },
  registerLink: {
    textDecoration: "none",
    marginLeft: "4px",
    color: "#3f51b5",
  },
});

const InputFields = withStyles({
  root: {
    border: "1px solid #EDEDED",
    borderRadius: "4px",

    "& .MuiInputBase-root": {
      padding: "5px 10px",
    },
  },
})(TextField);

interface LoginPageProps {
  triggerRefresh: () => void;
  triggerRefreshHeader: () => void;
}

const LoginPage = ({
  triggerRefresh,
  triggerRefreshHeader,
}: LoginPageProps) => {
  const classes = useStyles();
  const history = useHistory();
  const [login, setLogin] = useState<EmployeeLogin>({
    employeeEmail: "",
    employeePassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("employeeId")) {
      history.push(routes.tasksList);
    }
  }, [history]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const startSession = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault();

    fetch(apiUrls.employee.authenticateEmployee, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeEmail: login.employeeEmail,
        employeePassword: login.employeePassword,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("employeeId", data.employeeId);
        localStorage.setItem("email", data.email);
        localStorage.setItem("password", data.password);
        localStorage.setItem("employeeName", data.employeeName);
        localStorage.setItem("employeeSurname", data.employeeSurname);
        localStorage.setItem("employeeAge", data.employeeAge);
        localStorage.setItem("city", data.city);
        localStorage.setItem("jobDescription", data.jobDescription);
        localStorage.setItem("phoneNumber", data.phoneNumber);
        localStorage.setItem("profilePicture", data.profilePicture);
        localStorage.setItem("sasUriProfilPicture", data.sasUriProfilPicture);

        history.push(routes.tasksList);
        triggerRefresh();
        triggerRefreshHeader();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box className={classes.containerLoginPage}>
      <Box className={classes.containerLogin}>
        <form className={classes.containerLoginForm} onSubmit={startSession}>
          <Box className={classes.containerLoginTitle}>
            <Typography
              variant="h1"
              gutterBottom
              className={classes.loginTitle}
            >
              Sign in to your account
            </Typography>
          </Box>
          <Typography component="label">Email</Typography>
          <InputFields
            autoComplete="off"
            name="employeeEmail"
            onChange={handleChange}
          />
          <br />
          <Typography component="label">Password</Typography>
          <InputFields
            autoComplete="off"
            type="password"
            name="employeePassword"
            onChange={handleChange}
          />
          <br />
          <ButtonComponent
            text="Login"
            color="primary"
            type="submit"
            variant="contained"
            marginTop="1rem"
            marginBottom="2rem"
          />

          <Divider />

          <GoogleLoginButton />
          <MicrosoftLoginButton />
          <LinkedinLoginButton />

          <Typography className={classes.doNotHaveAnAccount}>
            Don't have an account yet?{" "}
            <Link to="/registration" className={classes.registerLink}>
              Register
            </Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
