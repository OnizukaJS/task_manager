import { MenuItem, makeStyles, createStyles } from "@material-ui/core";
import FormControl from "@mui/material/FormControl";
import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import EmployeeModel from "../../models/employeeModels/EmployeeModel";
import ProfilePicture from "../ProfilePicture";

const useStyles = makeStyles((theme) =>
  createStyles({
    containerCloseIcon: {
      display: "flex",
      margin: "8px 8px 0",
      justifyContent: "end",
    },
    containerForm: {
      marginLeft: `${theme.spacing(1)}px !important`,
      "&:hover": {
        backgroundColor: "#EAEAEA",
      },
    },
    containerEmployeeName: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      marginLeft: theme.spacing(1),
    },
  })
);

interface PersonToDisplaySelectProps {
  employees: EmployeeModel[] | undefined;
  currentEmployee: EmployeeModel;
}

const PersonToDisplaySelect = ({
  employees,
  currentEmployee,
}: PersonToDisplaySelectProps) => {
  const classes = useStyles();
  const [employeeSelected, setEmployeeSelected] = useState<string>();

  const handleChange = (event: SelectChangeEvent<typeof employeeSelected>) => {
    const {
      target: { value },
    } = event;
    setEmployeeSelected(value);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
      },
    },
  };

  return (
    <FormControl
      sx={{ minWidth: 100 }}
      variant="standard"
      className={classes.containerForm}
    >
      <Select
        disableUnderline
        displayEmpty
        value={employeeSelected}
        defaultValue="All"
        onChange={handleChange}
        renderValue={(selected) => {
          if (selected) {
            return <span>Person: {selected}</span>;
          }
        }}
        MenuProps={MenuProps}
      >
        <MenuItem key="All" value="All">
          <span>All</span>
        </MenuItem>
        <MenuItem key="@Me" value="@Me">
          <span>@Me</span>
        </MenuItem>
        <MenuItem key="Unassigned" value="Unassigned">
          <span>Unassigned</span>
        </MenuItem>

        {employees?.map((employee) => (
          <MenuItem
            key={employee.employeeName}
            value={`${employee.employeeName} ${employee.employeeSurname}`}
          >
            <ProfilePicture
              name={employee.employeeName}
              surname={employee.employeeSurname}
              profilePictureBlobStorage={employee.profilePicture}
              height={25}
              width={25}
              fontSize={10}
            />
            <span className={classes.containerEmployeeName}>
              {employee.employeeName} {employee.employeeSurname}
            </span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PersonToDisplaySelect;
