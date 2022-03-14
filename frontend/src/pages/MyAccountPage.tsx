import React, { useEffect, useState } from "react";
import { Box, makeStyles, TextField, Theme } from "@material-ui/core";
import ButtonComponent from "../components/buttons/ButtonComponent";
import EmployeeUpdate from "../models/employeeModels/EmployeeUpdate";
import ProfilePicture from "../components/ProfilePicture";
import LoadingComponent from "../components/LoadingComponent";
import useFetchEmployeeData from "../hooks/useFetchEmployeeData";

const useStyles = makeStyles((theme: Theme) => ({
  closeSession: {
    position: "absolute",
    right: theme.spacing(1),
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "30%",
    margin: "auto",
  },
  logoAndName: {
    display: "flex",
    alignItems: "center",
  },
  maxWidth: {
    width: "100%",
  },
  nameAndSurname: {
    width: "100%",
    marginLeft: theme.spacing(1.875),
  },
  separationLine: {
    border: "1px solid",
  },
}));

interface MyAccountPageProps {
  triggerRefresh: () => void;
  refreshState: number;
  employeeId: string;
}

const MyAccountPage = ({
  triggerRefresh,
  refreshState,
  employeeId,
}: MyAccountPageProps) => {
  const classes = useStyles();

  const [employee, setEmployee] = useState<EmployeeUpdate>();

  const [employeeData, isLoading] = useFetchEmployeeData(
    employeeId,
    refreshState
  );

  useEffect(() => {
    setEmployee({
      ...setEmployee,
      email: employeeData?.email,
      password: employeeData?.password,
      employeeName: employeeData?.employeeName,
      employeeSurname: employeeData?.employeeSurname,
      employeeAge: employeeData?.employeeAge,
      city: employeeData?.city,
    });
  }, [employeeData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault();

    fetch(`https://localhost:44358/api/Employees/${employeeData?.employeeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: employee?.email,
        password: employee?.password,
        employeeName: employee?.employeeName,
        employeeSurname: employee?.employeeSurname,
        employeeAge: employee?.employeeAge,
        city: employee?.city,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log("employee updated" + data))
      .then(() => triggerRefresh())
      .catch(() => console.log("ERROR while updating employee"));
  };

  return isLoading ? (
    <LoadingComponent />
  ) : (
    <Box>
      <form onSubmit={handleSubmit} className={classes.formContainer}>
        <Box className={classes.logoAndName}>
          <ProfilePicture
            name={employeeData?.employeeName!}
            surname={employeeData?.employeeSurname!}
            height={80}
            width={80}
            fontSize={35}
          />
          <Box className={classes.nameAndSurname}>
            <TextField
              defaultValue={employeeData?.employeeName}
              name="employeeName"
              placeholder="Employee Name"
              onChange={handleChange}
              className={classes.maxWidth}
            />
            <br />
            <br />
            <TextField
              defaultValue={employeeData?.employeeSurname}
              name="employeeSurname"
              placeholder="Employee Surname"
              onChange={handleChange}
              className={classes.maxWidth}
            />
          </Box>
        </Box>
        <br />
        <TextField
          defaultValue={employeeData?.email}
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <br />
        <TextField
          defaultValue={employeeData?.employeeAge}
          name="employeeAge"
          placeholder="Age"
          onChange={handleChange}
        />
        <br />
        <TextField
          defaultValue={employeeData?.city}
          name="city"
          placeholder="City"
          onChange={handleChange}
        />
        <br />
        <br />
        <ButtonComponent
          type="submit"
          color="primary"
          text="Update Profile"
          variant="contained"
        />
      </form>

      <hr className={classes.separationLine} />

      {/* {tasksPerEmployee?.map((task, id) => {
        return (
          <TaskItem
            task={task}
            id={id}
            handleOpen={() => history.push(`/task/${task.id}`)}
            handleChangeEdit={handleChangeEdit}
          />
        );
      })} */}
    </Box>
  );
};

export default MyAccountPage;
