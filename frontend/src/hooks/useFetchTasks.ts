import { useEffect, useState } from "react";
import apiUrls from "../constants/apiUrls";
import TaskModel from "../models/taskModels/TaskModel";

const useFetchTasks = (
  refreshState: number
): [TaskModel[] | undefined, boolean] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskModel[]>();

  useEffect(() => {
    setIsLoading(true);

    fetch(apiUrls.task.getTasks, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .then(() => setTimeout(() => setIsLoading(false), 200))
      .catch(() => console.log("ERROR while getting tasks"));
  }, [refreshState]);

  return [tasks, isLoading];
};

export default useFetchTasks;
