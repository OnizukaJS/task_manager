import { createStyles, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import EmployeeModel from "../models/employeeModels/EmployeeModel";
import TaskStatusEnum from "../models/enum/TaskStatusEnum";
import TaskTypeEnum from "../models/enum/TaskTypeEnum";
import TaskModel from "../models/taskModels/TaskModel";
import AddTaskButton from "./buttons/AddTaskButton";
import TaskItem from "./TaskItem";

const useStyles = makeStyles(() =>
  createStyles({
    isDragging: {
      opacity: 0.8,
    },
    isDraggingOver: {
      backgroundColor: "#DFF6DD!important",
    },
    paddingMarginGridContainer: {
      margin: "0 3px",
    },
    tasksContainer: {
      backgroundColor: "#f4f4f4",
      flex: 1,
    },
    tasksContainerNew: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "end",
    },
    tasksContainerPaddingBottom: {
      paddingBottom: "10px",
    },
  })
);

interface TaskColumnProps {
  employees: EmployeeModel[] | undefined;
  handleClosePopover?: () => void;
  handleOpenEditTaskItem: (task: TaskModel) => void;
  handleUpdateTaskItemType?: (
    taskOrBug: TaskTypeEnum,
    workItemId: string
  ) => void;
  popoverToDisplay?: string;
  setPopoverToDisplay?: React.Dispatch<React.SetStateAction<string>>;
  status: TaskStatusEnum;
  tasks: TaskModel[] | undefined;
  triggerRefresh: () => void;
  refreshState: number;
  workItemId: string;
}

const TaskColumn = ({
  employees,
  handleClosePopover,
  handleOpenEditTaskItem,
  handleUpdateTaskItemType,
  popoverToDisplay,
  setPopoverToDisplay,
  status,
  tasks,
  triggerRefresh,
  refreshState,
  workItemId,
}: TaskColumnProps) => {
  const classes = useStyles();

  return (
    <Droppable droppableId={TaskStatusEnum[status]}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`
              ${snapshot.isDraggingOver ? classes.isDraggingOver : ""}
              ${classes.tasksContainer} 
              ${classes.paddingMarginGridContainer} 
              ${
                status !== TaskStatusEnum.New
                  ? classes.tasksContainerPaddingBottom
                  : ""
              }
              ${status === TaskStatusEnum.New ? classes.tasksContainerNew : ""}
            `}
        >
          <Grid container direction="column" xs>
            {tasks
              ?.filter(
                (task) =>
                  (task.status as unknown as string) === TaskStatusEnum[status]
              )
              .filter((task) => task.workItemId === workItemId)
              .map((task, index) => {
                return (
                  <Draggable draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={
                          snapshot.isDragging ? classes.isDragging : ""
                        }
                      >
                        <TaskItem
                          employees={employees}
                          task={task}
                          index={index}
                          handleOpenEditTaskItem={handleOpenEditTaskItem}
                          triggerRefresh={triggerRefresh}
                          refreshState={refreshState}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
            {provided.placeholder}
          </Grid>

          {status === TaskStatusEnum.New ? (
            <AddTaskButton
              handleClosePopover={handleClosePopover}
              handleUpdateTaskItemType={handleUpdateTaskItemType}
              workItemId={workItemId}
              popoverToDisplay={popoverToDisplay}
              setPopoverToDisplay={setPopoverToDisplay}
            />
          ) : null}
        </div>
      )}
    </Droppable>
  );
};

export default TaskColumn;
