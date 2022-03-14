import { NativeSelect } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import EmployeeModel from "../../models/employeeModels/EmployeeModel";
import WorkItemModel from "../../models/workItemModels/WorkItemModel";
import EmployeeOptionSelect from "./EmployeeOptionSelect";

interface WorkItemEmployeeSelectImmediateUpdateProps {
  employees: EmployeeModel[] | undefined;
  workItem: WorkItemModel;
  triggerRefresh: () => void;
}

const EmployeeSelect = withStyles({
  root: {
    border: "1px solid transparent",
    padding: "5px 24px 5px 7px",
    "&:hover": {
      border: "1px solid #EAEAEA",
    },
  },
})(NativeSelect);

const WorkItemEmployeeSelectImmediateUpdate = ({
  employees,
  workItem,
  triggerRefresh,
}: WorkItemEmployeeSelectImmediateUpdateProps) => {
  const handleChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    fetch(`https://localhost:44358/api/WorkItems/${workItem.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: workItem.name,
        description: workItem.description,
        status: workItem.status,
        employeeId: e.target.value,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log("data to edit", data))
      .then(() => triggerRefresh())
      .catch(() => console.log("ERROR while updating workItem's employee"));
  };
  return (
    <EmployeeSelect
      name="employeeId"
      value={workItem.employeeId}
      disableUnderline
      variant="standard"
      onChange={handleChange}
    >
      {employees?.map((employee) => {
        return <EmployeeOptionSelect employee={employee} />;
      })}
    </EmployeeSelect>
  );
};

export default WorkItemEmployeeSelectImmediateUpdate;
