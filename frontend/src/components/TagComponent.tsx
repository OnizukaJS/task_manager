import { Box } from "@material-ui/core";
import React from "react";
import TagModel from "../models/tagModels/TagModel";
import { makeStyles, createStyles } from "@material-ui/styles";
import { ButtonUnstyled, ButtonUnstyledProps } from "@mui/base";
import { styled } from "@mui/system";

const ContainerTagRoot = styled("button")`
  background-color: #eff6fc;
  padding: 2.5px 7px;
  color: black;
  border: none;
`;

const ContainerTag = (props: ButtonUnstyledProps) => {
  return <ButtonUnstyled {...props} component={ContainerTagRoot} />;
};

const useStyles = makeStyles(() =>
  createStyles({
    containerTag: {
      backgroundColor: "#EFF6FC",
    },
    containerTagAndDeleteButton: {
      display: "flex",
      "& :focus": {
        backgroundColor: "#0078d4",
      },
    },
  })
);

interface TagComponentProps {
  tag: TagModel;
}

const TagComponent = ({ tag }: TagComponentProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.containerTagAndDeleteButton}>
      <ContainerTag className={classes.containerTag}>{tag.text}</ContainerTag>
    </Box>
  );
};

export default TagComponent;
