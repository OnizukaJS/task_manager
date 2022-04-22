import { useEffect, useState } from "react";
import apiUrls from "../constants/apiUrls";
import EmployeeModel from "../models/employeeModels/EmployeeModel";

const useFetchEmployees = (
  refreshState: number
): [EmployeeModel[] | undefined, boolean] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [employees, setEmployees] = useState<EmployeeModel[]>();

  useEffect(() => {
    setIsLoading(true);

    fetch(apiUrls.employee.getEmployees, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .then(() => setIsLoading(false))
      .catch(() => console.log("ERROR while getting employees"));
  }, [refreshState]);

  return [employees, isLoading];
};

export default useFetchEmployees;
