import {
  Box,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  MenuItem,
  MenuList,
  styled,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { DoubleArrow, ArrowRight, SettingsOutlined } from "@material-ui/icons";
import {
  StarBorder,
  Star,
  FilterAltOutlined,
  PeopleAltOutlined,
  Loop,
  KeyboardArrowDown,
} from "@mui/icons-material";
import fullScreenMode from "../images/full-screen-mode.png";
import React, { useState } from "react";
import TaskStatusEnum from "../models/enum/TaskStatusEnum";
import TaskTypeEnum from "../models/enum/TaskTypeEnum";
import TaskModel from "../models/taskModels/TaskModel";
import TaskModelToCreate from "../models/taskModels/TaskModelToCreate";
import AddWorkItemButton from "./buttons/AddWorkItemButton";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import WorkItemModel from "../models/workItemModels/WorkItemModel";
import { MenuBook } from "@material-ui/icons";
import { DragDropContext, DragStart, DropResult } from "react-beautiful-dnd";
import TaskColumn from "./TaskColumn";
import WorkItemColumn from "./WorkItemColumn";
import EmployeeModel from "../models/employeeModels/EmployeeModel";
import FilterBar from "./FilterBar";
import PersonToDisplaySelect from "./selects/PersonToDisplaySelect";
import useFetchEmployeeData from "../hooks/useFetchEmployeeData";
import Cookies from "universal-cookie";
import ButtonComponent from "./buttons/ButtonComponent";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import { useWarningSnackbar } from "../hooks/useErrorSnackbar";
import sprintImage from "../images/sprint_image.png";
import useFetchTasks from "../hooks/useFetchTasks";
import LoadingTasksList from "./loadings/LoadingTasksList";

export interface StyleProps {
  expandedWorkItem: string[];
}

const useStyles = makeStyles<Theme, StyleProps>((theme) =>
  createStyles({
    arrowDownIcon: {
      color: "rgba(102,102,102,1)",
    },
    columnOptionsIcon: {
      transform: "rotate(90deg)",
    },
    containersHeaderTaskListColumn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2px 8px",

      "&:hover": {
        backgroundColor: "#EAEAEA",
        cursor: "pointer",
      },
    },
    containerFilters: {
      width: "36px",
    },
    containerGridColumnScroll: {
      minWidth: "1550px",
    },
    containerGridColumnTasks: {},
    containerGridColumnTitles: {
      marginBottom: "8px",
    },
    containerHeaderTaskListColumn: {},
    containerMenuItem: {
      borderBottom: "3px solid #0078D4",
    },
    containerMenuList: {
      display: "flex",
      padding: 0,
    },
    containerSprintInfo: {
      display: "flex",
      alignItems: "center",
    },
    containerTaskListColumn: {
      overflow: "auto",
    },
    doubleArrowIcon: {
      transform: (props) =>
        props.expandedWorkItem && props.expandedWorkItem.length !== 0
          ? "rotate(270deg)"
          : "rotate(90deg)",
    },
    expandButton: {
      display: "flex",
      background: "white",
      alignItems: "center",
      border: "1px solid transparent",

      "&:focus": {
        backgroundColor: "#DEECF9",
        border: "1px solid #C7E0F4",
      },
    },
    flexAligned: {
      display: "flex",
      alignItems: "center",
    },
    fullScreenModeImage: {
      width: "22px",
      transform: "rotate(135deg)",
    },
    iconHeaderNumberOne: {
      cursor: "pointer",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    imageSprintInfo: {
      width: "10em",
      height: "3.31em",
      marginLeft: theme.spacing(2.5),
    },
    marginBottomDivider: {
      marginBottom: "17px",
    },
    paddingMarginGridContainer: {
      margin: "0 3px",
    },
    personOfTheTasks: {
      margin: "0 8px",
    },
    sprintInfo: {
      display: "flex",
      flexDirection: "column",
      alignItems: "end",
      color: "rgba(102,102,102,1)",
    },
    sprintInfoDate: {
      cursor: "pointer",

      "&:hover": {
        color: "#1976d2",
      },
    },
    squadName: {
      cursor: "pointer",
      padding: "2px 4px",

      "&:hover": {
        backgroundColor: "#F0F0F0",
      },
    },
    titleGridContainer: {
      margin: 0,
      display: "flex",
      fontFamily: "sans-serif",
    },
    typographyHeaderNumberOne: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    workItemType: {
      marginRight: theme.spacing(1),
      color: "#009CCC",
    },
  })
);

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowRight />} {...props} />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  backgroundColor: "#f4f4f4!important",

  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(45deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: "10px 0!important",
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const HeaderTaskListColumn1 = styled(Box)(({ theme }) => ({
  display: "flex",
  marginBottom: "1rem",
  alignItems: "center",
  justifyContent: "space-between",
}));

const HeaderTaskListColumn2 = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "1rem",
  alignItems: "center",
}));

interface TaskListColumnsProps {
  workItems: WorkItemModel[] | undefined;
  tasks: TaskModel[] | undefined;
  handleOpenEditTaskItem: (task: TaskModel) => void;
  handleOpenEditWorkItem: (workItem: WorkItemModel) => void;
  taskToCreate: TaskModelToCreate;
  setTaskToCreate: React.Dispatch<React.SetStateAction<TaskModelToCreate>>;
  setOpenCreateWorkItem: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCreateTaskItem: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRefresh: () => void;
  refreshState: number;
  employees: EmployeeModel[] | undefined;
}

const TaskListColumns = ({
  workItems,
  tasks,
  handleOpenEditTaskItem,
  handleOpenEditWorkItem,
  taskToCreate,
  setTaskToCreate,
  setOpenCreateWorkItem,
  setOpenCreateTaskItem,
  triggerRefresh,
  refreshState,
  employees,
}: TaskListColumnsProps) => {
  const { showMessage: showWarningMessage } = useWarningSnackbar();
  const [addedToFavorite, setAddedToFavorite] = useState<boolean>(false);
  const [popoverToDisplay, setPopoverToDisplay] = useState<string>("");
  const [displayFilterBar, setDisplayFilterBar] = useState<boolean>(false);
  const workItemIds: string[] | undefined = workItems?.map((workItem) => {
    return workItem.id;
  });
  const [expandedWorkItem, setExpandedWorkItem] = useState<Array<string>>(
    workItemIds!
  );
  const classes = useStyles({ expandedWorkItem });
  const cookies = new Cookies();

  const [currentEmployeeData] = useFetchEmployeeData(
    cookies.get("employeeId"),
    refreshState
  );

  const handleIsExpanded =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      if (newExpanded) {
        setExpandedWorkItem([...expandedWorkItem, panel]);
      } else {
        setExpandedWorkItem(expandedWorkItem.filter((item) => item !== panel));
      }
    };

  const handleExpandOrCloseAll = () => {
    if (expandedWorkItem && expandedWorkItem.length === 0) {
      setExpandedWorkItem(workItemIds!);
    } else {
      setExpandedWorkItem([]);
    }
  };

  const handleOpenCreateWorkItem = () => {
    setOpenCreateWorkItem(true);
    handleClosePopover();
  };

  const handleOpenCreateTaskItem = () => {
    setOpenCreateTaskItem(true);
  };

  const handleClosePopover = () => {
    setPopoverToDisplay("");
  };

  const handleUpdateTaskItemType = (
    taskOrBug: TaskTypeEnum,
    workItemId: string
  ) => {
    setTaskToCreate({ ...taskToCreate, type: taskOrBug, workItemId });
    handleClosePopover();
    handleOpenCreateTaskItem();
  };

  const [taskDragged, setTaskDragged] = useState<TaskModel>();
  const onDragStart = (result: DragStart) => {
    fetch(`https://localhost:44358/api/TasksToDo/${result.draggableId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setTaskDragged(data))
      .catch(() => console.log("ERROR while getting task data"));
  };

  const onDragEnd = (result: DropResult) => {
    // @source: where we take the draggable from
    // @destination: where we drop the draggable to
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    fetch(`https://localhost:44358/api/TasksToDo/${draggableId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: taskDragged?.name,
        description: taskDragged?.description,
        status: destination.droppableId,
        employeeId: taskDragged?.employeeId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log("data to edit", data))
      .then(() => triggerRefresh())
      .catch(() => console.log(`ERROR while editing task ${draggableId}`));
  };

  const handleDisplayFilterBar = () => {
    setDisplayFilterBar(!displayFilterBar);
  };

  const handleDoesNothing = () => {
    showWarningMessage({ message: "This button does nothing! :)" });
  };

  const [, isLoading] = useFetchTasks(refreshState);

  return (
    <>
      <HeaderTaskListColumn1>
        <Box className={classes.flexAligned}>
          <Box
            className={`${classes.flexAligned} ${classes.squadName}`}
            onClick={handleDoesNothing}
          >
            <Loop />
            <Typography
              className={`${classes.typographyHeaderNumberOne} ${classes.flexAligned}`}
            >
              VBS.ZASV RockAndRoll Devs
            </Typography>
            <KeyboardArrowDown className={classes.arrowDownIcon} />
          </Box>

          <Tooltip
            title={addedToFavorite ? "Remove to favorites" : "Add to favorites"}
            className={classes.iconHeaderNumberOne}
          >
            {addedToFavorite ? (
              <Star
                style={{ color: "#d67f3c" }}
                onClick={() => setAddedToFavorite(!addedToFavorite)}
              />
            ) : (
              <StarBorder
                style={{ color: "#d67f3c" }}
                onClick={() => setAddedToFavorite(!addedToFavorite)}
              />
            )}
          </Tooltip>
          <Tooltip
            title="Show Team Profile"
            className={classes.iconHeaderNumberOne}
          >
            <PeopleAltOutlined onClick={handleDoesNothing} />
          </Tooltip>
        </Box>
        <Box className={classes.containerSprintInfo}>
          <Box className={classes.sprintInfo}>
            <Tooltip
              title="Edit the dates for this iteration"
              className={classes.sprintInfoDate}
            >
              <Typography>March 16 - March 29</Typography>
            </Tooltip>
            <Typography variant="caption">6 work days remaining</Typography>
          </Box>
          <img src={sprintImage} alt="" className={classes.imageSprintInfo} />
        </Box>
      </HeaderTaskListColumn1>

      <HeaderTaskListColumn2 className={classes.containerHeaderTaskListColumn}>
        <Box style={{ display: "flex" }}>
          <MenuList className={classes.containerMenuList}>
            <MenuItem
              onClick={handleDoesNothing}
              className={classes.containerMenuItem}
            >
              <Typography style={{ fontWeight: "bold" }}>Taskboard</Typography>
            </MenuItem>
            <MenuItem onClick={handleDoesNothing}>
              <Typography>Backlog</Typography>
            </MenuItem>
            <MenuItem onClick={handleDoesNothing}>
              <Typography>Capacity</Typography>
            </MenuItem>
            <MenuItem
              onClick={handleDoesNothing}
              style={{ borderRight: "2px solid #C8C8C8" }}
            >
              <Typography>Analytics</Typography>
            </MenuItem>
          </MenuList>

          <AddWorkItemButton
            handleOpenCreateWorkItem={handleOpenCreateWorkItem}
          />

          <Tooltip title="Column Options">
            <ButtonComponent
              text="Column Options"
              onClick={handleDoesNothing}
              variant="text"
              startIcon={
                <BuildOutlinedIcon
                  fontSize="small"
                  color="primary"
                  className={classes.columnOptionsIcon}
                />
              }
              onHoverColor="#EAEAEA"
            />
          </Tooltip>
        </Box>

        <Box style={{ display: "flex" }}>
          <Tooltip title="Rock'n'Roll 30">
            <Box
              className={classes.containersHeaderTaskListColumn}
              onClick={handleDoesNothing}
            >
              <Loop />
              <Typography
                className={`${classes.flexAligned} ${classes.typographyHeaderNumberOne}`}
              >
                Rock'n'Roll 30
              </Typography>
              <KeyboardArrowDown className={classes.arrowDownIcon} />
            </Box>
          </Tooltip>

          <Box className={classes.containersHeaderTaskListColumn}>
            <PeopleAltOutlined color="primary" />
            <PersonToDisplaySelect
              employees={employees}
              currentEmployee={currentEmployeeData!}
            />
          </Box>

          <Tooltip title="Filter">
            <Box
              className={`${classes.containersHeaderTaskListColumn} ${classes.containerFilters}`}
              onClick={handleDisplayFilterBar}
            >
              <FilterAltOutlined color="primary" />
            </Box>
          </Tooltip>
          <Tooltip title="Configure team settings">
            <Box
              className={`${classes.containersHeaderTaskListColumn} ${classes.containerFilters}`}
              onClick={handleDoesNothing}
            >
              <SettingsOutlined color="primary" />
            </Box>
          </Tooltip>
          <Tooltip title="Enter full screen mode">
            <Box
              className={`${classes.containersHeaderTaskListColumn} ${classes.containerFilters}`}
              onClick={handleDoesNothing}
            >
              <img
                src={fullScreenMode}
                alt=""
                className={classes.fullScreenModeImage}
              />
            </Box>
          </Tooltip>
        </Box>
      </HeaderTaskListColumn2>

      <Divider className={classes.marginBottomDivider} />

      {displayFilterBar ? (
        <FilterBar
          setDisplayFilterBar={setDisplayFilterBar}
          employees={employees}
        />
      ) : null}

      <Box className={classes.containerTaskListColumn}>
        <Box className={classes.containerGridColumnScroll}>
          <Grid
            container
            direction="row"
            className={classes.containerGridColumnTitles}
          >
            <Grid
              container
              direction="column"
              xs
              className={`${classes.paddingMarginGridContainer}`}
            >
              <Box>
                <button
                  className={classes.expandButton}
                  onClick={() => handleExpandOrCloseAll()}
                >
                  <DoubleArrow
                    fontSize="small"
                    className={classes.doubleArrowIcon}
                  />{" "}
                  <p className={`${classes.titleGridContainer}`}>
                    {expandedWorkItem && expandedWorkItem.length === 0
                      ? "Expand all"
                      : "Collapse all"}
                  </p>
                </button>
              </Box>
            </Grid>

            <Grid
              container
              direction="column"
              xs
              className={`${classes.paddingMarginGridContainer}`}
            >
              <p className={classes.titleGridContainer}>New</p>
            </Grid>

            <Grid
              container
              direction="column"
              xs
              className={`${classes.paddingMarginGridContainer}`}
            >
              <p className={classes.titleGridContainer}>Active</p>
            </Grid>

            <Grid
              container
              direction="column"
              xs
              className={`${classes.paddingMarginGridContainer}`}
            >
              <p className={classes.titleGridContainer}>Resolved</p>
            </Grid>

            <Grid
              container
              direction="column"
              xs
              className={`${classes.paddingMarginGridContainer}`}
            >
              <p className={classes.titleGridContainer}>Ready For Test</p>
            </Grid>

            <Grid
              container
              direction="column"
              xs
              className={`${classes.paddingMarginGridContainer}`}
            >
              <p className={classes.titleGridContainer}>Closed</p>
            </Grid>
          </Grid>

          {isLoading ? (
            <>
              <LoadingTasksList />
              <LoadingTasksList />
            </>
          ) : (
            <Grid className={classes.containerGridColumnTasks}>
              {workItems?.map((workItem, id) => {
                return (
                  <DragDropContext
                    onDragEnd={onDragEnd}
                    onDragStart={onDragStart}
                  >
                    <Accordion
                    // expanded={expandedWorkItem?.includes(workItem.id)}
                    // onChange={handleIsExpanded(workItem.id)}
                    >
                      <AccordionSummary>
                        <MenuBook
                          className={classes.workItemType}
                          fontSize="small"
                        />
                        <Typography>{workItem.name}</Typography>
                      </AccordionSummary>

                      <AccordionDetails>
                        <Grid container direction="row">
                          <WorkItemColumn
                            workItem={workItem}
                            id={id}
                            handleOpenEditWorkItem={handleOpenEditWorkItem}
                            triggerRefresh={triggerRefresh}
                            employees={employees}
                            refreshState={refreshState}
                          />

                          <TaskColumn
                            employees={employees}
                            status={TaskStatusEnum.New}
                            tasks={tasks}
                            workItemId={workItem.id}
                            handleOpenEditTaskItem={handleOpenEditTaskItem}
                            triggerRefresh={triggerRefresh}
                            refreshState={refreshState}
                            handleClosePopover={handleClosePopover}
                            handleUpdateTaskItemType={handleUpdateTaskItemType}
                            popoverToDisplay={popoverToDisplay}
                            setPopoverToDisplay={setPopoverToDisplay}
                          />

                          <TaskColumn
                            employees={employees}
                            status={TaskStatusEnum.Active}
                            tasks={tasks}
                            workItemId={workItem.id}
                            handleOpenEditTaskItem={handleOpenEditTaskItem}
                            triggerRefresh={triggerRefresh}
                            refreshState={refreshState}
                          />

                          <TaskColumn
                            employees={employees}
                            status={TaskStatusEnum.Resolved}
                            tasks={tasks}
                            workItemId={workItem.id}
                            handleOpenEditTaskItem={handleOpenEditTaskItem}
                            triggerRefresh={triggerRefresh}
                            refreshState={refreshState}
                          />

                          <TaskColumn
                            employees={employees}
                            status={TaskStatusEnum.ReadyForTest}
                            tasks={tasks}
                            workItemId={workItem.id}
                            handleOpenEditTaskItem={handleOpenEditTaskItem}
                            triggerRefresh={triggerRefresh}
                            refreshState={refreshState}
                          />

                          <TaskColumn
                            employees={employees}
                            status={TaskStatusEnum.Closed}
                            tasks={tasks}
                            workItemId={workItem.id}
                            handleOpenEditTaskItem={handleOpenEditTaskItem}
                            triggerRefresh={triggerRefresh}
                            refreshState={refreshState}
                          />
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </DragDropContext>
                );
              })}
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
};

export default TaskListColumns;
