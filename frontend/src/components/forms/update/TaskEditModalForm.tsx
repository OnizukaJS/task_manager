import React, { useMemo, useState } from "react";

import {
  Box,
  CircularProgress,
  createStyles,
  IconButton,
  makeStyles,
  Modal,
  TextField,
  Theme,
  withStyles,
} from "@material-ui/core";
import TaskModel from "../../../models/taskModels/TaskModel";
import ButtonComponent from "../../buttons/ButtonComponent";
import TaskStatusSelect from "../../selects/TaskStatusSelect";
import TaskTypeEnum from "../../../models/enum/TaskTypeEnum";
import { AssignmentTurnedIn, BugReport } from "@material-ui/icons";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import TaskStatusColorIcon from "../../ColorIconStatus";
import CommentItem from "../../CommentItem";
import EmployeeModel from "../../../models/employeeModels/EmployeeModel";
import ProfilePicture from "../../ProfilePicture";
import Cookies from "universal-cookie";
import TaskEmployeeSelect from "../../selects/TaskEmployeeSelect";
import useFetchCommentsPerTask from "../../../hooks/useFetchCommentsPerTask";
import AccordionComponent from "../../AccordionComponent";
import AddTagButton from "../../buttons/AddTagButton";
import useFetchTagsPerTask from "../../../hooks/useFetchTagsPerTask";
import TagComponent from "../../TagComponent";
import TagModel from "../../../models/tagModels/TagModel";
import CloseIcon from "@mui/icons-material/Close";
import DeleteTaskDialog from "../../DeleteTaskDialog";

interface TaskEditModalFormProps {
  openEditTaskItem: boolean;
  handleClose: () => void;
  handleChangeEditTaskItem: (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => void;
  taskToEdit: TaskModel;
  setTaskToEdit: React.Dispatch<React.SetStateAction<TaskModel>>;
  triggerRefresh: () => void;
  refreshState: number;
  employeeId: string | undefined;
  employees: EmployeeModel[] | undefined;
}

export interface StyleProps {
  type: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) =>
  createStyles({
    avatar: {
      marginRight: theme.spacing(1),
    },
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
    containerCommentInfo: {
      display: "flex",
      marginRight: "1em",
    },
    containerHeader: {
      borderLeft: (props) =>
        props.type === TaskTypeEnum[TaskTypeEnum.Task]
          ? "9px solid #F2CB1D"
          : "9px solid #CC293D",
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
    containerTagInfo: {
      display: "flex",
      alignItems: "center",
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
    taskId: {
      font: "caption",
    },
    taskType: {
      color: "#F2CB1D",
    },
    titleBugTask: {
      display: "flex",
      alignItems: "center",
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

const TaskEditModalForm = ({
  openEditTaskItem,
  handleClose,
  handleChangeEditTaskItem,
  taskToEdit,
  setTaskToEdit,
  triggerRefresh,
  refreshState,
  employeeId,
  employees,
}: TaskEditModalFormProps) => {
  const classes = useStyles({ type: taskToEdit.type as unknown as string });
  const [openDeleteTaskDialog, setOpenDeleteTaskDialog] =
    useState<boolean>(false);
  const [employeeLogged, setEmployeeLogged] = useState({
    nameEmployeeLogged: "",
    surnameEmployeeLogged: "",
  });

  const [comments, isLoading] = useFetchCommentsPerTask(
    taskToEdit.id,
    refreshState
  );

  console.log("task", taskToEdit);

  const [tags] = useFetchTagsPerTask(taskToEdit.id, refreshState);

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

    fetch(`https://localhost:44358/api/TasksToDo/${taskToEdit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: taskToEdit.name,
        description: taskToEdit.description,
        status: taskToEdit.status,
        employeeId: taskToEdit.employeeId,
        workItemId: taskToEdit.workItemId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log("data to edit", data))
      .then(() => triggerRefresh())
      .catch(() => console.log("ERROR while posting new task"));

    handleClose();
  };

  const handleAddCommentTask = () => {
    fetch("https://localhost:44358/api/Comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: taskToEdit.comment,
        employeeId: employeeId,
        taskToDoId: taskToEdit.id,
      }),
    })
      .then((response) => response.json())
      .then(() => triggerRefresh())
      .then(() => setTaskToEdit({ ...taskToEdit, comment: "" })) // Used to empty the TextField
      .catch(() => console.log("ERROR while adding a comment"));
  };

  const handleDelete = () => {
    fetch(`https://localhost:44358/api/TasksToDo/${taskToEdit.id}`, {
      method: "DELETE",
    })
      .then(() => console.log("Task deleted"))
      .then(() => triggerRefresh())
      .catch(() => console.log("ERROR while deleting"));

    handleClose();
  };

  const handleDeleteTag = (tag: TagModel) => {
    fetch(`https://localhost:44358/api/Tags/${tag.tagId}`, {
      method: "DELETE",
    })
      .then(() => console.log("Tag deleted"))
      .then(() => triggerRefresh!())
      .catch(() => console.log("ERROR while deleting tag"));
  };

  const body = (
    <Box className={classes.paper}>
      <form onSubmit={handleUpdate} className={classes.formContainer}>
        <Box className={classes.containerHeader}>
          <Box className={classes.avatarEditTitle}>
            <Box className={classes.avatar}>
              {(taskToEdit.type as unknown as string) === "Task" ? (
                <AssignmentTurnedIn
                  className={classes.taskType}
                  fontSize="small"
                />
              ) : (
                <BugReport className={classes.bugType} fontSize="small" />
              )}
            </Box>
            <p className={classes.editType}>Edit {taskToEdit.type}</p>
          </Box>
          <Box className={classes.titleBugTask}>
            <p className={classes.taskId}>
              {taskToEdit.id.slice(0, 5).toUpperCase()}
            </p>
            <TextFieldNoUnderline
              name="name"
              onChange={handleChangeEditTaskItem}
              defaultValue={taskToEdit.name}
            />
          </Box>

          <Box className={classes.headerInfo}>
            <Box className={classes.containerAvatarsHeaderInfo}>
              <TaskEmployeeSelect
                employees={employees}
                taskToEdit={taskToEdit}
                handleChange={handleChangeEditTaskItem}
              />
            </Box>

            <Box className={`${classes.containerAvatarsHeaderInfo}`}>
              <Box className={classes.containerCommentInfo}>
                <ForumOutlinedIcon
                  fontSize="small"
                  className={`${classes.avatarIcons} ${classes.commentIcon}`}
                />{" "}
                {comments?.length} Comment{comments?.length! > 1 ? "s" : null}
              </Box>
              <Box className={classes.containerTagInfo}>
                {tags
                  ? tags.map((tag) => (
                      <>
                        <TagComponent tag={tag} />
                        <DeleteTagButton onClick={() => handleDeleteTag(tag)}>
                          <CloseIcon fontSize="small" />
                        </DeleteTagButton>
                      </>
                    ))
                  : null}
                <AddTagButton
                  tags={tags}
                  taskId={taskToEdit.id}
                  triggerRefresh={triggerRefresh}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className={classes.containerStatus}>
          <span className={classes.state}>State</span>
          <TaskStatusColorIcon status={taskToEdit.status} />
          <TaskStatusSelect
            status={taskToEdit.status}
            handleChange={handleChangeEditTaskItem}
          />
        </Box>

        <Box className={classes.containerTextFieldsButtons}>
          <AccordionComponent title="Description">
            <TextFieldNoUnderline
              name="description"
              multiline
              rows={2}
              placeholder="Description to Edit"
              onChange={handleChangeEditTaskItem}
              defaultValue={taskToEdit.description}
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
                  onChange={handleChangeEditTaskItem}
                  placeholder="Add a comment. Use # to link a work item, ! to link a pull request, or @ to mention a person."
                  value={taskToEdit.comment}
                />
                <ButtonComponent
                  text="Add Comment"
                  onClick={handleAddCommentTask}
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

      <DeleteTaskDialog
        openDeleteTaskDialog={openDeleteTaskDialog}
        setOpenDeleteTaskDialog={setOpenDeleteTaskDialog}
        handleClose={handleClose}
        triggerRefresh={triggerRefresh}
        type={taskToEdit.type}
        id={taskToEdit.id}
      />
    </Box>
  );

  return (
    <Modal
      open={openEditTaskItem}
      onClose={handleClose}
      className={classes.modal}
    >
      {body}
    </Modal>
  );
};

export default TaskEditModalForm;
