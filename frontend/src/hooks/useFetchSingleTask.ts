import { useEffect, useState } from "react";
import TaskModel from "../models/taskModels/TaskModel";

const useFetchSingleTask = (
  taskId: string,
  refreshState: number
): [TaskModel, boolean] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [task, setTask] = useState<TaskModel>({
    id: "",
    name: "",
    description: "",
    status: 1,
    type: 1,
    employeeId: "",
    workItemId: "",
  });

  useEffect(() => {
    setIsLoading(true);

    fetch(`https://localhost:44358/api/TasksToDo/${taskId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setTask(data))
      .then(() => setTimeout(() => setIsLoading(false), 500))
      .catch(() => console.log("ERROR while getting task data"));
  }, [refreshState, taskId]);

  return [task, isLoading];
};

export default useFetchSingleTask;
