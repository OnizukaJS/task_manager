import React, { useState, useEffect, useMemo } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import EmployeeLogin from "../models/employeeModels/EmployeeLogin";
import { useHistory } from "react-router-dom";
import routes from "../config/routes";
import Box from "@material-ui/core/Box";
import { Divider, makeStyles, TextField, Typography } from "@material-ui/core";
import ButtonComponent from "../components/buttons/ButtonComponent";
import { withStyles } from "@material-ui/styles";
import GoogleLoginButton from "../components/buttons/GoogleLoginButton";
import MicrosoftLoginButton from "../components/buttons/MicrosoftLoginButton";
import LinkedinLoginButton from "../components/buttons/LinkedinLoginButton";

const useStyles = makeStyles({
  containerLogin: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 40px 30px 40px",
    margin: "0 auto",
    maxWidth: "500px",
    borderTop: "4px solid",
    borderColor: "#3f51b5",
    boxShadow:
      "0 0.1875rem 0.4375rem 0.1875rem rgb(3, 3, 3, 13%), 0 0.6875rem 1.5rem 1rem rgb(3, 3, 3, 12%)",
  },
  containerLoginTitle: {
    display: "flex",
    justifyContent: "center",
    margin: "10px 0 20px 0",
  },
  loginTitle: {
    fontSize: 24,
    margin: "20px 0",
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
}

const LoginPage = ({ triggerRefresh }: LoginPageProps) => {
  const classes = useStyles();
  const history = useHistory();
  const baseLoginUrl = "https://localhost:44358/api/Employees";
  const [login, setLogin] = useState<EmployeeLogin>({
    employeeEmail: "",
    employeePassword: "",
  });
  const cookies = useMemo(() => {
    const cook = new Cookies();
    return cook;
  }, []);

  useEffect(() => {
    if (cookies.get("employeeId")) {
      history.push(routes.tasksList);
    }
  }, [cookies, history]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const startSession = async () => {
    await axios
      .get(baseLoginUrl + `/${login.employeeEmail}/${login.employeePassword}`)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        if (data.length > 0) {
          const answer = data[0];
          cookies.set("employeeId", answer.employeeId, { path: "/" });
          cookies.set("email", answer.email, { path: "/" });
          cookies.set("password", answer.password, { path: "/" });
          cookies.set("employeeName", answer.employeeName, { path: "/" });
          cookies.set("employeeSurname", answer.employeeSurname, { path: "/" });
          cookies.set("employeeAge", answer.employeeAge, { path: "/" });
          cookies.set("city", answer.city, { path: "/" });

          alert(
            "Welcome: " + answer.employeeName + " " + answer.employeeSurname
          );
          history.push(routes.tasksList);
          triggerRefresh();
        } else {
          alert("The email or the password are incorrects");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleKeyPress = (e: any) => {
    if (e.code === "Enter") {
      startSession();
    }
  };

  return (
    <Box className={classes.containerLogin}>
      <Box className={classes.containerLoginTitle}>
        <Typography variant="h1" gutterBottom className={classes.loginTitle}>
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
        name="password"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <br />
      <ButtonComponent
        text="Login"
        color="primary"
        onClick={startSession}
        variant="contained"
        marginTop="1rem"
        marginBottom="2rem"
      />

      <Divider />

      <GoogleLoginButton />
      <MicrosoftLoginButton />
      <LinkedinLoginButton />
    </Box>
  );
};

export default LoginPage;
