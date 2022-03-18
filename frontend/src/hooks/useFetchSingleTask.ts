import { useEffect, useState } from "react";
import TaskModel from "../models/taskModels/TaskModel";

const useFetchSingleTask = (
  refreshState: number,
  taskId: string
): [TaskModel | undefined, boolean] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [task, setTask] = useState<TaskModel>();

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
      .then(() => setIsLoading(false))
      .catch(() => console.log("ERROR while getting task data"));
  }, [refreshState, taskId]);

  return [task, isLoading];
};

export default useFetchSingleTask;
