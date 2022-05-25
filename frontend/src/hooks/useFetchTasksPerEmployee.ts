import { useState, useEffect } from "react";
import apiUrls from "../constants/apiUrls";
import TaskModel from "../models/taskModels/TaskModel";

const useFetchTasksPerEmployee = (
  employeeId: string
): [TaskModel[] | undefined, boolean] => {
  const [tasksPerEmployee, setTasksPerEmployee] = useState<TaskModel[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    fetch(apiUrls.task.getTasksPerEmployee(employeeId), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setTasksPerEmployee(data))
      .catch(() =>
        console.log(`ERROR while getting task of the employee ${employeeId}`)
      )
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, [employeeId]);

  return [tasksPerEmployee, isLoading];
};

export default useFetchTasksPerEmployee;
