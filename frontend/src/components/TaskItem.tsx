import {
  Box,
  Grid,
  ListItemAvatar,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { AssignmentTurnedIn, BugReport } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import routes from "../config/routes";
import useFetchEmployeeData from "../hooks/useFetchEmployeeData";
import useFetchTagsPerTask from "../hooks/useFetchTagsPerTask";
import EmployeeModel from "../models/employeeModels/EmployeeModel";
import TaskTypeEnum from "../models/enum/TaskTypeEnum";
import TaskModel from "../models/taskModels/TaskModel";
import ColorIconStatus from "./ColorIconStatus";
import ProfilePicture from "./ProfilePicture";
import TaskEmployeeSelectImmediateUpdate from "./selects/TaskEmployeeSelectImmediateUpdate";
import TaskStatusSelectImmediateUpdate from "./selects/TaskStatusSelectImmediateUpdate";
import TagComponent from "./TagComponent";

export interface StyleProps {
  type: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  avatar: {
    display: "flex",
    alignItems: "center",
    minWidth: 0,
    marginRight: theme.spacing(1),
  },
  avatarStatus: {
    display: "flex",
    alignItems: "center",
  },
  boxStatus: {
    display: "flex",
    alignItems: "center",
  },
  containerAvatarId: {
    display: "flex",
    alignItems: "center",
    float: "left",
  },
  containerAvatarIdTitle: {
    display: "flex",
    marginBottom: theme.spacing(1.5),
    alignItems: "center",
  },
  containerTags: {
    display: "flex",
  },
  containerTask: {
    border: "1px solid #c8c8c8;",
    backgroundColor: "white",
    padding: "0.5rem",
    margin: "10px 0 0",
    borderLeft: (props) =>
      props.type === TaskTypeEnum[TaskTypeEnum.Task]
        ? "4px solid #F2CB1D"
        : "4px solid #CC293D",
  },
  iconColor: {
    color: (props) =>
      props.type === TaskTypeEnum[TaskTypeEnum.Task] ? "#F2CB1D" : "#CC293D",
  },
  link: {
    textDecoration: "none",
    color: "black",

    "&:hover": {
      textDecoration: "underline",
    },
    "&:visited": {
      color: "black",
    },
  },
  personOfTheTask: {
    display: "flex",
  },
  state: {
    marginRight: theme.spacing(3),
    color: theme.palette.grey[600],
  },
  taskContainer: {
    margin: "0 10px",
    maxWidth: "230px",
  },
  taskId: {
    fontWeight: "bold",
    marginRight: theme.spacing(1),
  },
}));

interface TaskItemProps {
  employees: EmployeeModel[] | undefined;
  task: TaskModel;
  index: number;
  handleOpenEditTaskItem: (task: TaskModel) => void;
  triggerRefresh: () => void;
  refreshState: number;
}

const TaskItem = ({
  employees,
  task,
  index,
  handleOpenEditTaskItem,
  triggerRefresh,
  refreshState,
}: TaskItemProps) => {
  const classes = useStyles({ type: task.type as unknown as string });

  const [currentTaskEmployeeData] = useFetchEmployeeData(
    task.employeeId,
    refreshState
  );

  const [tags] = useFetchTagsPerTask(task.id, refreshState);

  return (
    <Grid item key={index} className={classes.taskContainer}>
      <Box component="div" className={classes.containerTask}>
        <Box className={classes.containerAvatarIdTitle}>
          <Box className={classes.containerAvatarId}>
            <ListItemAvatar className={classes.avatar}>
              {(task.type as unknown as string) === "Task" ? (
                <AssignmentTurnedIn
                  className={classes.iconColor}
                  fontSize="small"
                />
              ) : (
                <BugReport className={classes.iconColor} fontSize="small" />
              )}
            </ListItemAvatar>
            <span className={classes.taskId}>
              {task.id.slice(0, 5).toUpperCase()}
            </span>
          </Box>
          <Link
            to={routes.editTask(task.id)}
            onClick={() => handleOpenEditTaskItem(task)}
            className={classes.link}
          >
            {task.name}
          </Link>
        </Box>

        <Box className={classes.personOfTheTask}>
          <ProfilePicture
            name={currentTaskEmployeeData?.employeeName!}
            surname={currentTaskEmployeeData?.employeeSurname!}
            height={30}
            width={30}
            fontSize={12}
          />

          <TaskEmployeeSelectImmediateUpdate
            employees={employees}
            task={task}
            triggerRefresh={triggerRefresh}
          />
        </Box>

        <Box className={classes.boxStatus}>
          <span className={classes.state}>State </span>

          <Box className={classes.avatarStatus}>
            <ColorIconStatus status={task.status} />
            <TaskStatusSelectImmediateUpdate
              task={task}
              triggerRefresh={triggerRefresh}
            />
          </Box>
        </Box>

        <Box className={classes.containerTags}>
          {tags
            ? tags.map((tag) => <TagComponent tag={tag} key={tag.tagId} />)
            : null}
        </Box>
      </Box>
    </Grid>
  );
};

export default TaskItem;
