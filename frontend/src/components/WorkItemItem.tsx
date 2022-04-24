import {
  Box,
  ListItemAvatar,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { MenuBook } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import routes from "../config/routes";
import useFetchSingleWorkItem from "../hooks/useFetchSingleWorkItem";
import useFetchTagsPerWorkItem from "../hooks/useFetchTagsPerWorkItem";
import useRefresh from "../hooks/useRefresh";
import EmployeeModel from "../models/employeeModels/EmployeeModel";
import WorkItemModel from "../models/workItemModels/WorkItemModel";
import ColorIconStatus from "./ColorIconStatus";
import LoadingTask from "./loadings/LoadingTask";
import WorkItemEmployeeSelectImmediateUpdate from "./selects/WorkItemEmployeeSelectImmediateUpdate";
import WorkItemStatusSelectImmediateUpdate from "./selects/WorkItemStatusSelectImmediateUpdate";
import TagComponent from "./TagComponent";

const useStyles = makeStyles((theme) =>
  createStyles({
    avatar: {
      minWidth: 0,
      marginRight: theme.spacing(1),
    },
    avatarStatus: {
      display: "flex",
      alignItems: "center",
      border: "1px solid transparent",
      paddingLeft: theme.spacing(1),

      "&:hover": {
        borderColor: "rgba(102,102,102,1)",
      },
    },
    boxStatus: {
      display: "flex",
      alignItems: "center",
    },
    containerAvatarTitle: {
      display: "flex",
      marginBottom: theme.spacing(1.5),
      alignItems: "center",
    },
    containerWorkItem: {
      border: "1px solid #c8c8c8;",
      borderLeft: "4px solid #009CCC",
      padding: "0.5rem",
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
    state: {
      marginRight: theme.spacing(3),
      color: theme.palette.grey[600],
    },
    workItemId: {
      fontWeight: "bold",
      marginRight: theme.spacing(1),
    },
    workItemType: {
      color: "#009CCC",
    },
  })
);

interface WorkItemProps {
  workItem: WorkItemModel;
  id: number;
  handleOpenEditWorkItem: (workItem: WorkItemModel) => void;
  triggerRefresh: () => void;
  employees: EmployeeModel[] | undefined;
  refreshState: number;
}
const WorkItemItem = ({
  workItem,
  id,
  handleOpenEditWorkItem,
  triggerRefresh,
  employees,
  refreshState,
}: WorkItemProps) => {
  const classes = useStyles();
  const [tags] = useFetchTagsPerWorkItem(workItem.id, refreshState);

  const [refreshWorkItemState, triggerRefreshWorkItem] = useRefresh();
  const [workItemInfo, isLoading] = useFetchSingleWorkItem(
    workItem.id,
    refreshWorkItemState
  );

  return (
    <Box component="div" className={classes.containerWorkItem}>
      {isLoading ? (
        <LoadingTask />
      ) : (
        <>
          <Box className={classes.containerAvatarTitle}>
            <ListItemAvatar className={classes.avatar}>
              <MenuBook className={classes.workItemType} fontSize="small" />
            </ListItemAvatar>
            <Box>
              <span className={classes.workItemId}>
                {workItem.id.slice(0, 5).toUpperCase()}
              </span>
              <Link
                to={routes.editTask(workItem.id)}
                onClick={() => handleOpenEditWorkItem(workItem)}
                className={classes.link}
              >
                {workItem.name}
              </Link>
            </Box>
          </Box>

          <WorkItemEmployeeSelectImmediateUpdate
            employees={employees}
            workItem={workItemInfo}
            triggerRefresh={triggerRefreshWorkItem}
          />

          <Box className={classes.boxStatus}>
            <span className={classes.state}>State </span>

            <Box className={classes.avatarStatus}>
              <ColorIconStatus status={workItem.status} />
              <WorkItemStatusSelectImmediateUpdate
                workItem={workItem}
                triggerRefresh={triggerRefresh}
              />
            </Box>
          </Box>

          <Box>
            {tags ? tags.map((tag) => <TagComponent tag={tag} />) : null}
          </Box>
        </>
      )}
    </Box>
  );
};

export default WorkItemItem;
