import {
  ListItemAvatar,
  MenuItem,
  Box,
  makeStyles,
  createStyles,
  Divider,
  Button,
} from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { AssignmentTurnedIn, BugReport, MenuBook } from "@material-ui/icons";
import FormControl from "@mui/material/FormControl";
import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) =>
  createStyles({
    bugIconColor: {
      color: "#CC293D",
    },
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
    taskIconColor: {
      color: "#F2CB1D",
    },
    workItemIconColor: {
      color: "#009CCC",
    },
  })
);

const TypesFilterSelect = () => {
  const classes = useStyles();
  const [types, setTypes] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof types>) => {
    const {
      target: { value },
    } = event;
    setTypes(
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
    setTypes([]);
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
        value={types}
        onChange={handleChange}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Types</em>;
          }
          if (selected.length === 1) {
            return selected;
          } else {
            return `${selected[0]} (+${selected.length - 1})`;
          }
        }}
        MenuProps={MenuProps}
      >
        <MenuItem key="Bug" value="Bug">
          <Checkbox checked={types.indexOf("Bug") > -1} />
          <ListItemAvatar style={{ display: "flex" }}>
            <BugReport className={classes.bugIconColor} fontSize="medium" />
          </ListItemAvatar>
          <ListItemText primary="Bug" />
        </MenuItem>

        <MenuItem key="Task" value="Task">
          <Checkbox checked={types.indexOf("Task") > -1} />
          <ListItemAvatar style={{ display: "flex" }}>
            <AssignmentTurnedIn
              className={classes.taskIconColor}
              fontSize="medium"
            />
          </ListItemAvatar>
          <ListItemText primary="Task" />
        </MenuItem>

        <MenuItem key="WorkItem" value="WorkItem">
          <Checkbox checked={types.indexOf("WorkItem") > -1} />
          <ListItemAvatar style={{ display: "flex" }}>
            <MenuBook className={classes.workItemIconColor} fontSize="medium" />
          </ListItemAvatar>
          <ListItemText primary="Work Item" />
        </MenuItem>

        <Divider />

        <Box className={classes.containerCloseIcon}>
          <Button
            variant="text"
            onClick={handleClear}
            startIcon={<CloseIcon />}
            disabled={types.length === 0}
          >
            Clear
          </Button>
        </Box>
      </Select>
    </FormControl>
  );
};

export default TypesFilterSelect;
