import {
  MenuItem,
  Box,
  makeStyles,
  createStyles,
  Divider,
  Button,
} from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";
import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import ColorIconStatus from "../../ColorIconStatus";
import TaskStatusEnum from "../../../models/enum/TaskStatusEnum";

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
  })
);

const StatesFilterSelect = () => {
  const classes = useStyles();
  const [states, setStates] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof states>) => {
    const {
      target: { value },
    } = event;
    setStates(
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
    setStates([]);
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
        value={states}
        onChange={handleChange}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>States</em>;
          }
          if (selected.length === 1) {
            return selected;
          } else {
            return `${selected[0]} (+${selected.length - 1})`;
          }
        }}
        MenuProps={MenuProps}
      >
        <MenuItem key="Active" value="Active">
          <Checkbox checked={states.indexOf("Active") > -1} />
          <ColorIconStatus
            height="15px"
            width="15px"
            status={TaskStatusEnum[TaskStatusEnum.Active]}
          />
          <ListItemText primary="Active" />
        </MenuItem>

        <MenuItem key="Closed" value="Closed">
          <Checkbox checked={states.indexOf("Closed") > -1} />
          <ColorIconStatus
            height="15px"
            width="15px"
            status={TaskStatusEnum[TaskStatusEnum.Closed]}
          />
          <ListItemText primary="Closed" />
        </MenuItem>

        <MenuItem key="New" value="New">
          <Checkbox checked={states.indexOf("New") > -1} />
          <ColorIconStatus
            height="15px"
            width="15px"
            status={TaskStatusEnum[TaskStatusEnum.New]}
          />
          <ListItemText primary="New" />
        </MenuItem>

        <MenuItem key="Ready for Test" value="Ready for Test">
          <Checkbox checked={states.indexOf("Ready for Test") > -1} />
          <ColorIconStatus
            height="15px"
            width="15px"
            status={TaskStatusEnum[TaskStatusEnum.ReadyForTest]}
          />
          <ListItemText primary="Ready for Test" />
        </MenuItem>

        <MenuItem key="Resolved" value="Resolved">
          <Checkbox checked={states.indexOf("Resolved") > -1} />
          <ColorIconStatus
            height="15px"
            width="15px"
            status={TaskStatusEnum[TaskStatusEnum.Resolved]}
          />
          <ListItemText primary="Resolved" />
        </MenuItem>

        <Divider />

        <Box className={classes.containerCloseIcon}>
          <Button
            variant="text"
            onClick={handleClear}
            startIcon={<CloseIcon />}
            disabled={states.length === 0}
          >
            Clear
          </Button>
        </Box>
      </Select>
    </FormControl>
  );
};

export default StatesFilterSelect;
