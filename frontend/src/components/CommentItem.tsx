import React from "react";
import { Box, createStyles, makeStyles } from "@material-ui/core";
import CommentModel from "../models/commentModels/CommentModel";
import useFetchEmployeeData from "../hooks/useFetchEmployeeData";
import ProfilePicture from "./ProfilePicture";

interface CommentItemProps {
  comment: CommentModel;
  refreshState: number;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    commentAndIcon: {
      display: "flex",
      marginTop: theme.spacing(2),
      paddingRight: theme.spacing(1.25),
    },
    avatar: {
      marginRight: theme.spacing(1),
    },
    comment: {
      width: "90%",
      border: "1px solid #EAEAEA",
      borderRadius: "5px",
      padding: "8px",
    },
    name: {
      fontWeight: "bold",
      fontSize: "large",
    },
    nameDate: {
      color: "#737373",
      margin: 0,
    },
  })
);

const CommentItem = ({ comment, refreshState }: CommentItemProps) => {
  const classes = useStyles();
  const [employeeData] = useFetchEmployeeData(comment.employeeId, refreshState);

  return employeeData ? (
    <Box className={classes.commentAndIcon}>
      <Box className={classes.avatar}>
        <ProfilePicture
          name={employeeData?.employeeName!}
          surname={employeeData?.employeeSurname!}
          profilePictureBlobStorage={employeeData.profilePicture}
        />
      </Box>
      <Box className={classes.comment}>
        <p className={classes.nameDate}>
          <span className={classes.name}>
            {employeeData?.employeeName} {employeeData?.employeeSurname}
          </span>{" "}
          <small>commented {comment.creationDate}</small>
        </p>
        <p>{comment.text}</p>
      </Box>
    </Box>
  ) : (
    <></>
  );
};

export default CommentItem;
