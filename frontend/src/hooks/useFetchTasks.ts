import { useEffect, useState } from "react";
import TaskModel from "../models/taskModels/TaskModel";

const useFetchTasks = (
  refreshState: number
): [TaskModel[] | undefined, boolean] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskModel[]>();

  useEffect(() => {
    setIsLoading(true);

    fetch("https://localhost:44358/api/TasksToDo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setTasks(data))
      // .then(() => setTimeout(() => setIsLoading(false), 200))
      .then(() => setIsLoading(false))
      .catch(() => console.log("ERROR while getting tasks"));
  }, [refreshState]);

  return [tasks, isLoading];
};

export default useFetchTasks;
