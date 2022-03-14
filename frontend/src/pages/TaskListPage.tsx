import React, { useState, useEffect, useMemo } from "react";

import TaskModel from "../models/taskModels/TaskModel";
import TaskEditModalForm from "../components/forms/update/TaskEditModalForm";
import WorkItemEditModalForm from "../components/forms/update/WorkItemEditModalForm";
import { useHistory } from "react-router-dom";
import TaskModelToCreate from "../models/taskModels/TaskModelToCreate";
import TaskStatusEnum from "../models/enum/TaskStatusEnum";
import TaskTypeEnum from "../models/enum/TaskTypeEnum";
import Cookies from "universal-cookie";
import routes from "../config/routes";
import TaskCreateModalForm from "../components/forms/create/TaskCreateModalForm";
import TaskListColumns from "../components/TaskListColumns";
import useFetchEmployees from "../hooks/useFetchEmployees";
import useFetchTasks from "../hooks/useFetchTasks";
import { Box, CircularProgress } from "@material-ui/core";
import useFetchWorkItem from "../hooks/useFetchWorkItem";
import WorkItemCreateModalForm from "../components/forms/create/WorkItemCreateModalForm";
import WorkItemModel from "../models/workItemModels/WorkItemModel";

interface TaskListItemProps {
  triggerRefresh: () => void;
  refreshState: number;
}

const TasksListPage = ({ refreshState, triggerRefresh }: TaskListItemProps) => {
  const cookies = useMemo(() => {
    const cook = new Cookies();
    return cook;
  }, []);
  const [taskToCreate, setTaskToCreate] = useState<TaskModelToCreate>({
    name: "",
    description: "",
    status: TaskStatusEnum.New,
    type: TaskTypeEnum.WorkItem || TaskTypeEnum.Bug || TaskTypeEnum.Task,
    employeeId: "",
    workItemId: "",
  });
  const [taskToEdit, setTaskToEdit] = useState<TaskModel>({
    id: "",
    name: "",
    description: "",
    status: TaskStatusEnum.New,
    type: TaskTypeEnum.Task || TaskTypeEnum.Bug,
    employeeId: "",
    workItemId: "",
  });
  const [workItemToEdit, setWorkItemToEdit] = useState<WorkItemModel>({
    id: "",
    name: "",
    description: "",
    status: TaskStatusEnum.New,
    type: TaskTypeEnum.WorkItem,
    employeeId: "",
  });

  const [openEditTaskItem, setOpenEditTaskItem] = useState<boolean>(false);
  const [openEditWorkItem, setOpenEditWorkItem] = useState<boolean>(false);
  const [employeeId, setEmployeeId] = useState<string>();

  const [openCreateTaskItem, setOpenCreateTaskItem] = useState<boolean>(false);
  const [openCreateWorkItem, setOpenCreateWorkItem] = useState<boolean>(false);
  const [employees] = useFetchEmployees(refreshState);
  const [workItems] = useFetchWorkItem(refreshState);
  const [tasks, isLoading] = useFetchTasks(refreshState);

  console.log("workitem", workItems);
  console.log("tasks", tasks);

  const history = useHistory();

  // Check the cookies for the login
  useEffect(() => {
    if (!cookies.get("employeeId")) {
      history.push(routes.loginPage);
    }
    setEmployeeId(cookies.get("employeeId"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenEditTaskItem = (task: TaskModel) => {
    setOpenEditTaskItem(true);
    setTaskToEdit(task);
  };

  const handleOpenEditWorkItem = (workItem: WorkItemModel) => {
    setOpenEditWorkItem(true);
    setWorkItemToEdit(workItem);
  };

  const handleClose = () => {
    setOpenEditTaskItem(false);
    history.push("/task");
  };

  const handleCloseWorkItem = () => {
    setOpenEditWorkItem(false);
    history.push("/task");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskToCreate({ ...taskToCreate, [e.target.name]: e.target.value });
  };

  const handleChangeEditTaskItem = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = e.target.name as keyof typeof taskToEdit;
    setTaskToEdit({ ...taskToEdit, [name]: e.target.value });
  };

  const handleChangeEditWorkItem = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = e.target.name as keyof typeof taskToEdit;
    setWorkItemToEdit({ ...workItemToEdit, [name]: e.target.value });
  };

  return (
    <>
      {isLoading ? (
        <Box component="div" m={1}>
          <CircularProgress />
          <p>Loading...</p>
        </Box>
      ) : (
        <TaskListColumns
          taskToCreate={taskToCreate}
          setTaskToCreate={setTaskToCreate}
          workItems={workItems}
          tasks={tasks}
          handleOpenEditTaskItem={handleOpenEditTaskItem}
          handleOpenEditWorkItem={handleOpenEditWorkItem}
          setOpenCreateWorkItem={setOpenCreateWorkItem}
          setOpenCreateTaskItem={setOpenCreateTaskItem}
          triggerRefresh={triggerRefresh}
          refreshState={refreshState}
          employees={employees}
        />
      )}

      <TaskCreateModalForm
        handleChange={handleChange}
        taskToCreate={taskToCreate}
        triggerRefresh={triggerRefresh}
        setOpenCreateTaskItem={setOpenCreateTaskItem}
        openCreateTaskItem={openCreateTaskItem}
        employeeId={employeeId}
      />

      <TaskEditModalForm
        openEditTaskItem={openEditTaskItem}
        handleClose={handleClose}
        handleChangeEditTaskItem={handleChangeEditTaskItem}
        taskToEdit={taskToEdit}
        setTaskToEdit={setTaskToEdit}
        triggerRefresh={triggerRefresh}
        refreshState={refreshState}
        employeeId={employeeId}
        employees={employees}
      />

      <WorkItemCreateModalForm
        handleChange={handleChange}
        workItemToCreate={taskToCreate}
        triggerRefresh={triggerRefresh}
        setOpenCreateWorkItem={setOpenCreateWorkItem}
        openCreateWorkItem={openCreateWorkItem}
        employeeId={employeeId}
      />

      <WorkItemEditModalForm
        openEditWorkItem={openEditWorkItem}
        handleCloseWorkItem={handleCloseWorkItem}
        handleChangeEditWorkItem={handleChangeEditWorkItem}
        setWorkItemToEdit={setWorkItemToEdit}
        workItemToEdit={workItemToEdit}
        triggerRefresh={triggerRefresh}
        refreshState={refreshState}
        employeeId={employeeId}
        employees={employees}
      />
    </>
  );
};

export default TasksListPage;
