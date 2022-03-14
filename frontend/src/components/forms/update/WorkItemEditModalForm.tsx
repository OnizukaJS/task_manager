import React, { useMemo, useState } from "react";

import {
  Box,
  CircularProgress,
  createStyles,
  makeStyles,
  Modal,
  TextField,
  Theme,
  withStyles,
} from "@material-ui/core";
import ButtonComponent from "../../buttons/ButtonComponent";
import TaskStatusSelect from "../../selects/TaskStatusSelect";
import { MenuBook } from "@material-ui/icons";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import TaskStatusColorIcon from "../../ColorIconStatus";
import CommentItem from "../../CommentItem";
import EmployeeModel from "../../../models/employeeModels/EmployeeModel";
import ProfilePicture from "../../ProfilePicture";
import Cookies from "universal-cookie";
import TaskEmployeeSelect from "../../selects/TaskEmployeeSelect";
import useFetchEmployeeData from "../../../hooks/useFetchEmployeeData";
import AccordionComponent from "../../AccordionComponent";
import WorkItemModel from "../../../models/workItemModels/WorkItemModel";
import useFetchCommentsPerWorkItem from "../../../hooks/useFetchCommentsPerWorkItem";

interface WorkItemEditModalFormProps {
  openEditWorkItem: boolean;
  handleCloseWorkItem: () => void;
  handleChangeEditWorkItem: (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => void;
  workItemToEdit: WorkItemModel;
  setWorkItemToEdit: React.Dispatch<React.SetStateAction<WorkItemModel>>;
  triggerRefresh: () => void;
  refreshState: number;
  employeeId: string | undefined;
  employees: EmployeeModel[] | undefined;
}

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    avatarEditTitle: {
      display: "flex",
      alignItems: "center",
      paddingTop: theme.spacing(1.66),
    },
    avatarIcon: {
      marginRight: theme.spacing(1),
    },
    avatarHeaderIcon: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    avatarCommentsIcons: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    bugType: {
      color: "#CC293D",
    },
    commentIcon: {
      color: "#3E93DC",
      marginRight: theme.spacing(1),
    },
    commentsContainer: {
      maxHeight: "250px",
      overflow: "scroll",
      overflowX: "hidden",
      marginTop: theme.spacing(2),
    },
    containerAvatarsHeaderInfo: {
      display: "flex",
      alignItems: "center",
      flex: 1,
    },
    containerButtons: {
      marginTop: theme.spacing(3),
      display: "flex",
      justifyContent: "flex-end",

      "&:last-child": {
        marginLeft: "20px",
      },
    },
    containerHeader: {
      borderLeft: "9px solid #009CCC",
      padding: `0 ${theme.spacing(1.5)}px`,
    },
    containerStatus: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#F8F8F8",
      padding: theme.spacing(1),
      borderBottom: "1px solid #EAEAEA",
      borderTop: "1px solid #EAEAEA",
    },
    containerTextFieldsButtons: {
      padding: `0 ${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(
        3
      )}px`,
      overflowY: "scroll",
      height: "450px",
    },
    discussionButton: {},
    editType: {
      margin: 0,
    },
    employeeSelect: {
      border: "1px solid transparent",
      "&:hover": {
        border: "1px solid #EAEAEA",
      },
    },
    formContainer: {
      height: "100%",
      overflowX: "hidden",
    },
    fullWidth: {
      width: "100%",
    },
    headerInfo: {
      display: "flex",
      alignItems: "center",
      marginRight: theme.spacing(1),
      paddingBottom: theme.spacing(1.66),
      width: "75%",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    myAvatarDiscussion: {
      display: "flex",
      width: "100%",
      marginTop: theme.spacing(2),
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      width: "60%",
    },
    state: {
      marginRight: theme.spacing(3),
      color: theme.palette.grey[600],
    },
    subTitlesTexts: {
      marginBottom: 0,
    },
    workItemId: {
      font: "caption",
    },
    taskType: {
      color: "#F2CB1D",
    },
    titleWorkItem: {
      display: "flex",
      alignItems: "center",
    },
    workItemType: {
      color: "#009CCC",
    },
  })
);

const TextFieldNoUnderline = withStyles({
  root: {
    width: "100%",

    "& .MuiInputBase-input": {
      border: "1px solid transparent",
      padding: "10px",

      "&:hover": {
        border: "1px solid #EAEAEA",
      },

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

const WorkItemEditModalForm = ({
  openEditWorkItem,
  handleCloseWorkItem,
  handleChangeEditWorkItem,
  workItemToEdit,
  setWorkItemToEdit,
  triggerRefresh,
  refreshState,
  employeeId,
  employees,
}: WorkItemEditModalFormProps) => {
  const classes = useStyles();
  const [employeeLogged, setEmployeeLogged] = useState({
    nameEmployeeLogged: "",
    surnameEmployeeLogged: "",
  });

  const [currentTaskEmployeeData] = useFetchEmployeeData(
    workItemToEdit.employeeId,
    refreshState
  );

  const [comments, isLoading] = useFetchCommentsPerWorkItem(
    workItemToEdit.id,
    refreshState
  );

  useMemo(() => {
    const cookie = new Cookies();

    setEmployeeLogged({
      ...employeeLogged,
      nameEmployeeLogged: cookie.get("employeeName"),
      surnameEmployeeLogged: cookie.get("employeeSurname"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault();

    fetch(`https://localhost:44358/api/WorkItems/${workItemToEdit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: workItemToEdit.id,
        name: workItemToEdit.name,
        description: workItemToEdit.description,
        status: workItemToEdit.status,
        employeeId: workItemToEdit.employeeId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log("data to edit", data))
      .then(() => triggerRefresh())
      .catch(() => console.log("ERROR while updating work item"));

    handleCloseWorkItem();
  };

  const handleAddCommentWorkItem = () => {
    fetch("https://localhost:44358/api/Comments", {
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
      .then(() => triggerRefresh())
      .then(() => setWorkItemToEdit({ ...workItemToEdit, comment: "" })) // Used to empty the TextField
      .catch(() => console.log("ERROR while adding a comment"));
  };

  const handleDelete = () => {
    fetch(`https://localhost:44358/api/WorkItems/${workItemToEdit.id}`, {
      method: "DELETE",
    })
      .then(() => console.log("Work Item deleted"))
      .then(() => triggerRefresh())
      .catch(() => console.log("ERROR while deleting"));

    handleCloseWorkItem();
  };

  const body = (
    <Box className={classes.paper}>
      <form onSubmit={handleUpdate} className={classes.formContainer}>
        <Box className={classes.containerHeader}>
          <Box className={classes.avatarEditTitle}>
            <Box className={classes.avatar}>
              <MenuBook className={classes.workItemType} fontSize="small" />
            </Box>
            <p className={classes.editType}>Edit {workItemToEdit.type}</p>
          </Box>
          <Box className={classes.titleWorkItem}>
            <p className={classes.workItemId}>
              {workItemToEdit.id.slice(0, 5).toUpperCase()}
            </p>
            <TextFieldNoUnderline
              name="name"
              onChange={handleChangeEditWorkItem}
              defaultValue={workItemToEdit.name}
            />
          </Box>

          <Box className={classes.headerInfo}>
            <Box className={classes.containerAvatarsHeaderInfo}>
              <Box className={classes.avatar}>
                <ProfilePicture
                  name={currentTaskEmployeeData?.employeeName!}
                  surname={currentTaskEmployeeData?.employeeSurname!}
                />
              </Box>
              <TaskEmployeeSelect
                employees={employees}
                taskToEdit={workItemToEdit}
                handleChange={handleChangeEditWorkItem}
              />
            </Box>

            <Box className={classes.containerAvatarsHeaderInfo}>
              <ForumOutlinedIcon
                fontSize="small"
                className={`${classes.avatarIcons} ${classes.commentIcon}`}
              />{" "}
              {comments?.length} Comment{comments?.length! > 1 ? "s" : null}
            </Box>
          </Box>
        </Box>

        <Box className={classes.containerStatus}>
          <span className={classes.state}>State</span>
          <TaskStatusColorIcon status={workItemToEdit.status} />
          <TaskStatusSelect
            status={workItemToEdit.status}
            handleChange={handleChangeEditWorkItem}
          />
        </Box>

        <Box className={classes.containerTextFieldsButtons}>
          <AccordionComponent title="Description">
            <TextFieldNoUnderline
              name="description"
              multiline
              rows={2}
              placeholder="Description to Edit"
              onChange={handleChangeEditWorkItem}
              defaultValue={workItemToEdit.description}
              className={classes.fullWidth}
            />
          </AccordionComponent>

          <AccordionComponent title="Discussion">
            <Box className={classes.myAvatarDiscussion}>
              <Box className={classes.avatar}>
                <ProfilePicture
                  name={employeeLogged.nameEmployeeLogged}
                  surname={employeeLogged.surnameEmployeeLogged}
                />
              </Box>
              <Box
                className={`${classes.discussionButton} ${classes.fullWidth}`}
              >
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
                />
              </Box>
            </Box>

            {isLoading ? (
              <Box component="div" className={classes.containerSpinner} m={1}>
                <CircularProgress />
                <p className={classes.textSpinner}>Loading...</p>
              </Box>
            ) : (
              <Box className={classes.commentsContainer}>
                {comments?.map((comment) => {
                  return (
                    <CommentItem
                      comment={comment}
                      refreshState={refreshState}
                    />
                  );
                })}
              </Box>
            )}
          </AccordionComponent>

          <Box className={classes.containerButtons}>
            <ButtonComponent
              text="Delete"
              onClick={handleDelete}
              color="secondary"
              variant="contained"
            />
            <ButtonComponent
              text="Edit"
              type="submit"
              color="primary"
              marginLeft="16px"
              variant="contained"
            />
          </Box>
        </Box>
      </form>
    </Box>
  );

  return (
    <Modal
      open={openEditWorkItem}
      onClose={handleCloseWorkItem}
      className={classes.modal}
    >
      {body}
    </Modal>
  );
};

export default WorkItemEditModalForm;
