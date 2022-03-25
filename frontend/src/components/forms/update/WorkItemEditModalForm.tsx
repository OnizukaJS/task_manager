import React, { useMemo, useState } from "react";

import {
  Box,
  CircularProgress,
  createStyles,
  IconButton,
  makeStyles,
  Modal,
  Popover,
  TextField,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import {
  AssignmentTurnedIn,
  BugReport,
  CloseOutlined,
  Save,
} from "@material-ui/icons";
import {
  Close,
  CompassCalibrationOutlined,
  LockOutlined,
  MoreHorizOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
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
import AccordionComponent from "../../AccordionComponent";
import WorkItemModel from "../../../models/workItemModels/WorkItemModel";
import useFetchCommentsPerWorkItem from "../../../hooks/useFetchCommentsPerWorkItem";
import { Tooltip } from "@mui/material";
import { useWarningSnackbar } from "../../../hooks/useErrorSnackbar";
import useFetchTagsPerTask from "../../../hooks/useFetchTagsPerTask";
import TagComponent from "../../TagComponent";
import AddTagButton from "../../buttons/AddTagButton";
import DeleteTaskDialog from "../../DeleteTaskDialog";

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
    avatar: {
      marginRight: theme.spacing(1),
      display: "flex",
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
    blocWorkItemToEditInfo: {
      flex: 1,
      padding: "0 10px",
    },
    blockWorkItemToEditInfoSecondBloc: {
      display: "flex",
    },
    bugType: {
      color: "#CC293D",
    },
    closeIcon: {
      cursor: "pointer",
      position: "absolute",
      right: 0,
      border: "1px solid transparent",
      display: "flex",

      "&:hover": {
        borderColor: "black",
      },
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
    containerHeaderInfo: {
      display: "flex",
      alignItems: "center",
      flex: 1,
    },
    containerHeader: {
      borderLeft: "9px solid #009CCC",
      padding: `0 ${theme.spacing(1.5)}px`,
    },
    containerStatus: {
      display: "flex",
      alignItems: "center",
    },
    containerStatusAndSprintInfo: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#F8F8F8",
      padding: "8px 20px",
      borderBottom: "1px solid #EAEAEA",
      borderTop: "1px solid #EAEAEA",
    },
    containerStatusAndSprintInfoElements: {},
    containerStatusAndSprintInfoElementsSecondBloc: {
      marginLeft: "1em",
      width: "100%",
    },
    containerTagInfo: {
      display: "flex",
      alignItems: "center",
    },
    containerWorkItemToEditInfo: {
      display: "flex",
      padding: `0 ${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(
        3
      )}px`,
      overflowY: "scroll",
      height: "265px",
    },
    deleteIcon: {
      marginRight: theme.spacing(1),
    },
    disabledColor: {
      color: theme.palette.grey[600],
    },
    discussionButton: {},
    displayAligned: {
      display: "flex",
      alignItems: "center",
    },
    editType: {
      margin: 0,
      color: theme.palette.grey[600],
    },
    fakeSelect: {
      width: "100%",
      border: "1px solid transparent",

      "&:hover": {
        backgroundColor: "white",
        border: `1px solid ${theme.palette.grey[200]}`,
      },
    },
    flexAligned: {
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    employeeSelect: {
      border: "1px solid transparent",
      "&:hover": {
        border: "1px solid #EAEAEA",
      },
    },
    formContainer: {},
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
    moreActions: {
      cursor: "pointer",
      height: "36.5px",
      display: "flex",
      alignItems: "center",
      padding: "0 10px 0 5px",

      "&:hover": {
        backgroundColor: "#deecf9",
      },
    },
    myAvatarDiscussion: {
      display: "flex",
      width: "100%",
      marginTop: theme.spacing(2),
    },
    paper: {
      position: "absolute",
      top: "75px",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      width: "90%",
    },
    settings: {
      cursor: "pointer",
      backgroundColor: "#efefef",
      height: "36.5px",
      display: "flex",
      alignItems: "center",
      borderLeft: "1px solid",
      padding: "0 3px",

      "&:hover": {
        backgroundColor: "#deecf9",
      },
    },
    sprintInfoElementTitles: {
      marginRight: theme.spacing(3),
      color: theme.palette.grey[600],
      minWidth: "70px",
    },
    sprintInfoElementInfos: {
      margin: 0,
      padding: "6px 8px",
    },
    subBlockWorkItemToEditInfo: {
      flex: 1,
      padding: "0 10px",
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
    marginLeft: "8px",

    "& .MuiInputBase-input": {
      border: "1px solid transparent",
      padding: "10px 4px",

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
  const [openDeleteWorkItemDialog, setOpenDeleteWorkItemDialog] =
    useState<boolean>(false);
  const { showMessage: showWarningMessage } = useWarningSnackbar();
  const [employeeLogged, setEmployeeLogged] = useState({
    nameEmployeeLogged: "",
    surnameEmployeeLogged: "",
  });

  const [comments, isLoading] = useFetchCommentsPerWorkItem(
    workItemToEdit.id,
    refreshState
  );

  const [tags] = useFetchTagsPerTask(workItemToEdit.id, refreshState);

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
    handleClosePopover();
  };

  const handleDeleteTag = (tagId: string) => {
    fetch(`https://localhost:44358/api/Tags/${tagId}`, {
      method: "DELETE",
    })
      .then(() => console.log("Tag deleted"))
      .then(() => triggerRefresh!())
      .catch(() => console.log("ERROR while deleting tag"));
  };

  const handleDoesNothing = () => {
    showWarningMessage({ message: "This button does nothing! :)" });
  };

  // More actions popover
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  const body = (
    <Box className={classes.paper}>
      <Box className={classes.closeIcon} onClick={handleCloseWorkItem}>
        <Close />
      </Box>
      <form onSubmit={handleUpdate} className={classes.formContainer}>
        <Box className={classes.containerHeader}>
          <Box className={classes.avatarEditTitle}>
            <Box className={classes.avatar}>
              <MenuBook className={classes.workItemType} fontSize="small" />
            </Box>
            <p className={classes.editType}>
              {workItemToEdit.type}{" "}
              {workItemToEdit.id.slice(0, 5).toUpperCase()}
            </p>
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
            <Box className={classes.containerHeaderInfo}>
              <TaskEmployeeSelect
                employees={employees}
                taskToEdit={workItemToEdit}
                handleChange={handleChangeEditWorkItem}
              />
            </Box>

            <Box className={classes.containerHeaderInfo}>
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
                      <Box className={classes.containerTagAndDeleteButton}>
                        <TagComponent tag={tag} />
                        <DeleteTagButton
                          onClick={() => handleDeleteTag(tag.tagId)}
                        >
                          <Close fontSize="small" />
                        </DeleteTagButton>
                      </Box>
                    ))
                  : null}
                <AddTagButton
                  tags={tags}
                  workItemId={workItemToEdit.id}
                  triggerRefresh={triggerRefresh}
                />
              </Box>
            </Box>

            <Box
              className={classes.containerHeaderInfo}
              style={{ justifyContent: "end" }}
            >
              <Tooltip title="(Crlt+Enter)" arrow>
                <ButtonComponent
                  text="Save & Close"
                  variant="contained"
                  type="submit"
                  color="primary"
                  borderRadius="0"
                  boxShadow="none"
                  backgroundColor="#0078d4"
                  onHoverColor="#106ebe"
                  startIcon={<Save />}
                />
              </Tooltip>

              <Box className={classes.displayAligned}>
                <ButtonComponent
                  text="Follow"
                  variant="contained"
                  borderRadius="0"
                  boxShadow="none"
                  backgroundColor="#efefef"
                  onHoverColor="#deecf9"
                  marginLeft="6px"
                  startIcon={<CompassCalibrationOutlined />}
                  onClick={handleDoesNothing}
                />

                <Tooltip title="Notification Settings" arrow>
                  <Box className={classes.settings} onClick={handleDoesNothing}>
                    <SettingsOutlined />
                  </Box>
                </Tooltip>

                <Tooltip title="Actions" arrow>
                  <Box
                    className={classes.moreActions}
                    onClick={handleOpenPopover}
                  >
                    <MoreHorizOutlined />
                  </Box>
                </Tooltip>
                <Popover
                  id={id}
                  open={openPopover}
                  anchorEl={anchorEl}
                  onClose={handleClosePopover}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Box
                    className={classes.moreActions}
                    onClick={() => setOpenDeleteWorkItemDialog(true)}
                  >
                    <CloseOutlined
                      className={classes.deleteIcon}
                      color="error"
                      fontSize="small"
                    />
                    <Typography>Delete</Typography>
                  </Box>
                </Popover>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className={classes.containerStatusAndSprintInfo}>
          <Box className={classes.flexAligned}>
            <Box className={classes.containerStatusAndSprintInfoElements}>
              <Box className={classes.containerStatus}>
                <span className={classes.sprintInfoElementTitles}>
                  Stat<u>e</u>
                </span>
                <TaskStatusColorIcon
                  status={workItemToEdit.status}
                  height={"14"}
                  width={"14"}
                />
                <TaskStatusSelect
                  status={workItemToEdit.status}
                  handleChange={handleChangeEditWorkItem}
                />
              </Box>
              <Box>
                <Box className={classes.flexAligned}>
                  <span className={classes.sprintInfoElementTitles}>
                    Reason
                  </span>
                  <Box
                    className={`${classes.flexAligned} ${classes.disabledColor}`}
                  >
                    <LockOutlined />
                    <p className={classes.sprintInfoElementInfos}>Verified</p>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              className={classes.containerStatusAndSprintInfoElementsSecondBloc}
            >
              <Box className={classes.flexAligned}>
                <span className={classes.sprintInfoElementTitles}>
                  <u>A</u>rea
                </span>
                <p
                  className={`${classes.sprintInfoElementInfos} ${classes.fakeSelect}`}
                >
                  VBS.ZASV
                </p>
              </Box>
              <Box className={classes.flexAligned}>
                <span className={classes.sprintInfoElementTitles}>
                  Ite<u>r</u>ation
                </span>
                <p
                  className={`${classes.sprintInfoElementInfos} ${classes.fakeSelect}`}
                >
                  VBS.ZASV\4-Pilot 3\Sprint 30\Rock'n'Roll 30
                </p>
              </Box>
            </Box>
          </Box>

          <Box>
            <span className={classes.sprintInfoElementTitles}>
              Updated by Jean-Baptiste Castillo: Monday
            </span>
          </Box>
        </Box>

        <Box className={classes.containerWorkItemToEditInfo}>
          <Box className={classes.blocWorkItemToEditInfo}>
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
          </Box>

          <Box
            className={`${classes.blocWorkItemToEditInfo} ${classes.blockWorkItemToEditInfoSecondBloc}`}
          >
            <Box className={classes.subBlockWorkItemToEditInfo}>
              <AccordionComponent title="Planning">
                <></>
              </AccordionComponent>
              <AccordionComponent title="Effort (Hours)">
                <></>
              </AccordionComponent>
            </Box>
            <Box className={classes.subBlockWorkItemToEditInfo}>
              <AccordionComponent title="Deployment">
                <></>
              </AccordionComponent>
              <AccordionComponent title="Development">
                <></>
              </AccordionComponent>
              <AccordionComponent title="Related Work">
                <></>
              </AccordionComponent>
              <AccordionComponent title="System Info">
                <></>
              </AccordionComponent>
            </Box>
          </Box>
        </Box>
      </form>

      <DeleteTaskDialog
        openDeleteTaskDialog={openDeleteWorkItemDialog}
        setOpenDeleteTaskDialog={setOpenDeleteWorkItemDialog}
        handleClose={handleCloseWorkItem}
        triggerRefresh={triggerRefresh}
        type={workItemToEdit.type}
        id={workItemToEdit.id}
      />
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
