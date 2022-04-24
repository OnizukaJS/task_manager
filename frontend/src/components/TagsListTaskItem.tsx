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
import useFetchTagsPerTask from "../hooks/useFetchTagsPerTask";
import apiUrls from "../constants/apiUrls";

interface TagsListProps {
  taskId: string;
  tagHasBeenAdded: boolean;
  setTagHasBeenAdded: React.Dispatch<React.SetStateAction<boolean>>;
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
    height: "21px",
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

const TagsList = ({
  taskId,
  tagHasBeenAdded,
  setTagHasBeenAdded,
}: TagsListProps) => {
  const [refreshTagState, triggerRefreshTag] = useRefresh();
  const classes = useStyles();

  const [tags, isTagLoading] = useFetchTagsPerTask(taskId, refreshTagState);

  const handleDeleteTag = (tagId: string) => {
    fetch(apiUrls.tag.deleteTag(tagId), {
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
          taskId={taskId}
          triggerRefreshTag={triggerRefreshTag}
          tagHasBeenAdded={tagHasBeenAdded}
          setTagHasBeenAdded={setTagHasBeenAdded}
        />
      </Box>
    );
  }
};

export default TagsList;
