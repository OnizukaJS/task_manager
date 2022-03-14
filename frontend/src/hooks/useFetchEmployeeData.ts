import { useState, useEffect } from "react";
import EmployeeModel from "../models/employeeModels/EmployeeModel";

const useFetchEmployeeData = (
  employeeId: string,
  refreshState: number
): [EmployeeModel | undefined, boolean] => {
  const [employeeData, setEmployeeData] = useState<EmployeeModel>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    fetch(`https://localhost:44358/api/Employees/${employeeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setEmployeeData(data))
      .then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      )
      .catch(() => console.log("ERROR while getting employee data"));
  }, [refreshState, employeeId]);

  return [employeeData, isLoading];
};

export default useFetchEmployeeData;
