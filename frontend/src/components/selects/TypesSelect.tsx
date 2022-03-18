import {
  ListItemAvatar,
  MenuItem,
  SvgIcon,
  SvgIconTypeMap,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { AssignmentTurnedIn, BugReport, MenuBook } from "@material-ui/icons";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useState } from "react";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

interface TypesSelectProps {
  filterTypeSelected: string;
}

interface OptionsTypesSelectProps {
  type: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

const handleChange = () => {};

const OptionsTypesSelect = ({ type, icon }: OptionsTypesSelectProps) => {
  const color =
    type === "Bug" ? "#CC293D" : type === "Task" ? "#F2CB1D" : "#009CCC";
  return (
    <MenuItem key={type} value={type}>
      <Checkbox />
      <ListItemAvatar style={{ display: "flex" }}>
        <SvgIcon component={icon} style={{ color }} />
      </ListItemAvatar>
      <ListItemText primary={type} />
    </MenuItem>
  );
};

const TypesSelect = ({ filterTypeSelected }: TypesSelectProps) => {
  const [typeSelected, setTypeSelected] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof typeSelected>) => {
    const {
      target: { value },
    } = event;
    setTypeSelected(typeof value === "string" ? value.split(",") : value);
  };

  const handlerClear = () => {
    setTypeSelected([]);
  };

  const ClearButton = () => {
    return <></>;
  };

  return (
    <>
      <Select
        name="type"
        value={typeSelected}
        disableUnderline
        variant="standard"
        onChange={handleChange}
      >
        <OptionsTypesSelect type="Bug" icon={BugReport} />
        <OptionsTypesSelect type="Task" icon={AssignmentTurnedIn} />
        <OptionsTypesSelect type="User Story" icon={MenuBook} />
      </Select>

      <ClearButton />
    </>
  );
};

export default TypesSelect;
