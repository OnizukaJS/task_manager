import {
  Box,
  CircularProgress,
  IconButton,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import AddTagButton from "./buttons/AddTagButton";
import TagComponent from "./TagComponent";
import useRefresh from "../hooks/useRefresh";
import useFetchTagsPerWorkItem from "../hooks/useFetchTagsPerWorkItem";

interface TagsListProps {
  workItemId: string;
}

const useStyles = makeStyles({
  containerTagAndDeleteButton: {
    display: "flex",
    "& :focus": {
      backgroundColor: "#0078d4",
    },
  },
  containerTagInfo: {
    display: "flex",
    alignItems: "center",
  },
  isTagsLoading: {
    display: "flex",
    alignItems: "center",
  },
});

const DeleteTagButton = withStyles({
  root: {
    backgroundColor: "#EFF6FC",
    marginRight: ".3em",
    border: "none",
    borderRadius: 0,
    padding: "0px 0px",

    "&:hover": {
      backgroundColor: "#DEECF9",
    },
    "&:focus": {
      backgroundColor: "#0078d4",
    },
  },
})(IconButton);

const TagsList = ({ workItemId }: TagsListProps) => {
  const [refreshTagState, triggerRefreshTag] = useRefresh();
  const classes = useStyles();

  const [tags, isTagLoading] = useFetchTagsPerWorkItem(
    workItemId,
    refreshTagState
  );

  const handleDeleteTag = (tagId: string) => {
    fetch(`https://localhost:44358/api/WorkItems/${tagId}`, {
      method: "DELETE",
    })
      .then(() => console.log("Tag deleted"))
      .then(() => triggerRefreshTag())
      .catch(() => console.log("ERROR while deleting tag"));
  };

  if (isTagLoading) {
    return (
      <Box className={classes.isTagsLoading}>
        <CircularProgress
          style={{ height: "20px", width: "20px", marginRight: 8 }}
        />
        <p>Loading...</p>
      </Box>
    );
  } else {
    return (
      <Box className={classes.containerTagInfo}>
        {tags
          ? tags.map((tag) => (
              <Box className={classes.containerTagAndDeleteButton}>
                <TagComponent tag={tag} />
                <DeleteTagButton onClick={() => handleDeleteTag(tag.tagId)}>
                  <Close fontSize="small" />
                </DeleteTagButton>
              </Box>
            ))
          : null}
        <AddTagButton
          tags={tags}
          workItemId={workItemId}
          triggerRefreshTag={triggerRefreshTag}
        />
      </Box>
    );
  }
};

export default TagsList;
