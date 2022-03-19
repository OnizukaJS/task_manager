import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Tooltip,
} from "@material-ui/core";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import React from "react";
import TypesSelect from "./selects/filters/TypesFilterSelect";

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    closeFilterBarIcon: {
      "&:hover": {
        cursor: "pointer",
      },
    },
    containerFilterBar: {
      backgroundColor: "#F0F0F0",
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
      borderRadius: "4px",
      padding: theme.spacing(1),
      display: "flex",
      justifyContent: "end",
      alignItems: "center",
    },
  })
);

interface FilterBarProps {
  setDisplayFilterBar: (value: React.SetStateAction<boolean>) => void;
}

const FilterBar = ({ setDisplayFilterBar }: FilterBarProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.containerFilterBar}>
      <TypesSelect />
      <Tooltip title="Clear and dismiss filters">
        <CloseOutlinedIcon
          className={classes.closeFilterBarIcon}
          onClick={() => setDisplayFilterBar(false)}
        />
      </Tooltip>
    </Box>
  );
};

export default FilterBar;
