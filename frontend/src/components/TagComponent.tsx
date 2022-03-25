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

interface TagComponentProps {
  tag: TagModel;
}

const TagComponent = ({ tag }: TagComponentProps) => {
  const useStyles = makeStyles(() =>
    createStyles({
      containerTag: {
        backgroundColor: "#EFF6FC",
      },
    })
  );
  const classes = useStyles();

  return (
    <ContainerTag className={classes.containerTag}>{tag.text}</ContainerTag>
  );
};

export default TagComponent;
