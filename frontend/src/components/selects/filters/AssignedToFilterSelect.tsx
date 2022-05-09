import {
  MenuItem,
  Box,
  makeStyles,
  createStyles,
  Divider,
  Button,
} from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import EmployeeModel from "../../../models/employeeModels/EmployeeModel";
import ProfilePicture from "../../ProfilePicture";

const useStyles = makeStyles((theme) =>
  createStyles({
    containerCloseIcon: {
      display: "flex",
      margin: "8px 8px 0",
      justifyContent: "end",
    },
    containerForm: {
      padding: "0 8px!important",

      "&:hover": {
        backgroundColor: "#e2e2e2",
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

interface AssignedToFilterSelectProps {
  employees: EmployeeModel[] | undefined;
}

const AssignedToFilterSelect = ({ employees }: AssignedToFilterSelectProps) => {
  const classes = useStyles();
  const [employeesSelected, setEmployeesSelected] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof employeesSelected>) => {
    const {
      target: { value },
    } = event;
    setEmployeesSelected(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
      },
    },
  };

  const handleClear = () => {
    setEmployeesSelected([]);
  };

  return (
    <FormControl
      sx={{ minWidth: 100 }}
      variant="standard"
      className={classes.containerForm}
    >
      <Select
        disableUnderline
        multiple
        displayEmpty
        value={employeesSelected}
        onChange={handleChange}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Assigned to</em>;
          }
          if (selected.length === 1) {
            return selected;
          } else {
            return `${selected[0]} (+${selected.length - 1})`;
          }
        }}
        MenuProps={MenuProps}
      >
        {employees?.map((employee) => (
          <MenuItem key={employee.employeeName} value={employee.employeeName}>
            <Checkbox
              checked={employeesSelected.indexOf(employee.employeeName) > -1}
            />
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

        <Divider />

        <Box className={classes.containerCloseIcon}>
          <Button
            variant="text"
            onClick={handleClear}
            startIcon={<CloseIcon />}
            disabled={employeesSelected.length === 0}
          >
            Clear
          </Button>
        </Box>
      </Select>
    </FormControl>
  );
};

export default AssignedToFilterSelect;
