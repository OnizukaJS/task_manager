import { useState, useEffect } from "react";
import TaskModel from "../models/taskModels/TaskModel";

const useFetchTasksPerEmployee = (
  employeeId: string
): [TaskModel[] | undefined, boolean] => {
  const [tasksPerEmployee, setTasksPerEmployee] = useState<TaskModel[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    fetch(`https://localhost:44358/api/TasksToDo/employee/${employeeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setTasksPerEmployee(data))
      .then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      )
      .catch(() =>
        console.log(`ERROR while getting task of the employee ${employeeId}`)
      );
  }, [employeeId]);

  return [tasksPerEmployee, isLoading];
};

export default useFetchTasksPerEmployee;
