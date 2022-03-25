import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React, { ReactNode, useState } from "react";

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    subTitlesTexts: {
      margin: 0,
    },
  })
);

const MuiAccordionComponent = withStyles({
  root: {
    boxShadow: "0px 0px",
    margin: "0 !important",

    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },

    "& .MuiAccordionSummary-content": {
      margin: 0,
    },

    "& .MuiAccordionSummary-root.Mui-expanded": {
      minHeight: "48px",
    },
  },
})(Accordion);

const MuiAccordionSummary = withStyles({
  root: {
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    padding: "16px",

    "&:hover": {
      color: "#005A9E",
    },
  },
})(AccordionSummary);

const MuiAccordionDetailsComponent = withStyles({
  root: {
    display: "block",
    padding: 2,
    marginTop: 2,
  },
})(AccordionDetails);

interface AccordionComponentProps {
  title?: string;
  children: ReactNode;
}

const AccordionComponent = ({ title, children }: AccordionComponentProps) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<boolean>(true);
  const handleIsExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <MuiAccordionComponent expanded={expanded} onClick={handleIsExpanded}>
        <MuiAccordionSummary expandIcon={<ExpandMore />}>
          <h3 className={classes.subTitlesTexts}>{title}</h3>
        </MuiAccordionSummary>
        <MuiAccordionDetailsComponent>{children}</MuiAccordionDetailsComponent>
      </MuiAccordionComponent>
    </>
  );
};

export default AccordionComponent;
