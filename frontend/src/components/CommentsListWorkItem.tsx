import {
  Box,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  withStyles,
} from "@material-ui/core";
import React from "react";
import { CommentUrlBasePath } from "../constants/apiUrls";
import useFetchCommentsPerWorkItem from "../hooks/useFetchCommentsPerWorkItem";
import useFetchEmployeeData from "../hooks/useFetchEmployeeData";
import useRefresh from "../hooks/useRefresh";
import WorkItemModel from "../models/workItemModels/WorkItemModel";
import ButtonComponent from "./buttons/ButtonComponent";
import CommentItem from "./CommentItem";
import LoadingCommentsList from "./loadings/LoadingCommentsList";
import ProfilePicture from "./ProfilePicture";

interface CommentsListWorkItemItemProps {
  handleChangeEditWorkItem: (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => void;
  workItemToEdit: WorkItemModel;
  setWorkItemToEdit: React.Dispatch<React.SetStateAction<WorkItemModel>>;
  employeeId: string | undefined;
}

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    avatar: {
      marginRight: theme.spacing(1),
      display: "flex",
    },
    commentsContainer: {
      maxHeight: "250px",
      overflow: "scroll",
      overflowX: "hidden",
      marginTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    fullWidth: {
      width: "100%",
    },
    myAvatarDiscussion: {
      display: "flex",
      width: "100%",
      marginTop: theme.spacing(2),
    },
  })
);

const TextFieldDiscussion = withStyles({
  root: {
    width: "100%",

    "& .MuiInputBase-multiline": {
      paddingTop: 0,
    },
    "& .MuiInputBase-input": {
      border: "1px solid #EAEAEA",
      borderRadius: "5px",
      padding: "16px",

      "&:focus": {
        border: "1px solid #0078D4",
      },
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:hover:before": {
      border: "none",
    },
    "& .MuiInput-underline:after": {
      border: "none",
    },
  },
})(TextField);

const CommentsListWorkItemItem = ({
  handleChangeEditWorkItem,
  workItemToEdit,
  setWorkItemToEdit,
  employeeId,
}: CommentsListWorkItemItemProps) => {
  const classes = useStyles();

  const [refreshCommentsState, triggerRefreshComments] = useRefresh();
  const [comments, areCommentsLoading] = useFetchCommentsPerWorkItem(
    workItemToEdit.id,
    refreshCommentsState
  );

  const [employeeData] = useFetchEmployeeData(
    employeeId!,
    refreshCommentsState
  );

  const handleAddCommentWorkItem = () => {
    fetch(CommentUrlBasePath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: workItemToEdit.comment,
        employeeId: employeeId,
        workItemId: workItemToEdit.id,
      }),
    })
      .then((response) => response.json())
      .then(() => triggerRefreshComments())
      .then(() => setWorkItemToEdit({ ...workItemToEdit, comment: "" })) // Used to empty the TextField
      .catch(() => console.log("ERROR while adding a comment"));
  };

  return (
    <>
      <Box className={classes.myAvatarDiscussion}>
        <Box className={classes.avatar}>
          <ProfilePicture
            name={employeeData?.employeeName!}
            surname={employeeData?.employeeSurname!}
            sasUriProfilPicture={employeeData?.sasUriProfilPicture!}
          />
        </Box>
        <Box className={`${classes.fullWidth}`}>
          <TextFieldDiscussion
            name="comment"
            multiline
            rows={4}
            onChange={handleChangeEditWorkItem}
            placeholder="Add a comment. Use # to link a work item, ! to link a pull request, or @ to mention a person."
            value={workItemToEdit.comment}
          />
          <ButtonComponent
            text="Add Comment"
            onClick={handleAddCommentWorkItem}
            color="primary"
            variant="contained"
            borderRadius="0"
            boxShadow="none"
            backgroundColor="#0078d4"
            onHoverColor="#106ebe"
          />
        </Box>
      </Box>

      {areCommentsLoading ? (
        <>
          <LoadingCommentsList />
          <LoadingCommentsList />
        </>
      ) : (
        <Box className={classes.commentsContainer}>
          {comments?.map((comment) => {
            return (
              <CommentItem
                comment={comment}
                refreshState={refreshCommentsState}
              />
            );
          })}
        </Box>
      )}
    </>
  );
};

export default CommentsListWorkItemItem;
