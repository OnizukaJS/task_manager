import {
  makeStyles,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router";
import ButtonComponent from "../components/buttons/ButtonComponent";
import EmployeeRegistration from "../models/employeeModels/EmployeeRegistration";
import axios from "axios";
import Cookies from "universal-cookie";
import routes from "../config/routes";

const useStyles = makeStyles({
  containerRegistration: {
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
  containerBoxFields: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0 -5px",
  },
  containerField: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: "0 5px",
  },
  containerRegistrationTitle: {
    display: "flex",
    justifyContent: "center",
    margin: "10px 0 20px 0",
  },
  registrationTitle: {
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

const RegistrationPage = () => {
  const classes = useStyles();

  const history = useHistory();
  const [registration, setRegistration] = useState<EmployeeRegistration>({
    email: "",
    password: "",
    employeeName: "",
    employeeSurname: "",
    employeeAge: 0,
    city: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistration({ ...registration, [name]: value });
  };

  const registerEmployee = async () => {
    const baseRegistrationUrl = "https://localhost:44358/api/Employees";
    await axios
      .post(baseRegistrationUrl, registration)
      .then(() => history.push("/"))
      .catch((error) => console.log(error));
  };

  const cookies = useMemo(() => {
    const cook = new Cookies();
    return cook;
  }, []);

  useEffect(() => {
    if (cookies.get("employeeId")) {
      history.push(routes.tasksList);
    }
  }, [cookies, history]);

  return (
    <Box className={classes.containerRegistration}>
      <Box className={classes.containerRegistrationTitle}>
        <Typography
          variant="h1"
          gutterBottom
          className={classes.registrationTitle}
        >
          Register your account
        </Typography>
      </Box>

      <Box className={classes.containerBoxFields}>
        <Box className={classes.containerField}>
          <Typography component="label">Name</Typography>
          <InputFields
            autoComplete="off"
            name="employeeName"
            onChange={handleChange}
            placeholder="John"
          />
        </Box>

        <Box className={classes.containerField}>
          <Typography component="label">Surname</Typography>
          <InputFields
            autoComplete="off"
            name="employeeSurname"
            onChange={handleChange}
            placeholder="Doe"
          />
        </Box>
      </Box>
      <br />

      <Box className={classes.containerBoxFields}>
        <Box className={classes.containerField}>
          <Typography component="label">Email</Typography>
          <InputFields
            autoComplete="off"
            name="email"
            onChange={handleChange}
            placeholder="test@gmail.com"
          />
        </Box>

        <Box className={classes.containerField}>
          <Typography component="label">Password</Typography>
          <InputFields
            autoComplete="off"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </Box>
      </Box>
      <br />

      <Box className={classes.containerBoxFields}>
        <Box className={classes.containerField}>
          <Typography component="label">Age</Typography>
          <InputFields
            autoComplete="off"
            name="age"
            onChange={handleChange}
            placeholder="32"
          />
        </Box>

        <Box className={classes.containerField}>
          <Typography component="label">City</Typography>
          <InputFields
            autoComplete="off"
            name="city"
            onChange={handleChange}
            placeholder="Barcelona"
          />
        </Box>
      </Box>
      <br />
      <br />
      <ButtonComponent
        text="Register"
        color="primary"
        onClick={registerEmployee}
        variant="contained"
      />
    </Box>
  );
};

export default RegistrationPage;