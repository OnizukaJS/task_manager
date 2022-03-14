import React from "react";
import EmployeeModel from "../../models/employeeModels/EmployeeModel";

interface EmployeeOptionSelectProps {
  employee: EmployeeModel;
}

const EmployeeOptionSelect = ({ employee }: EmployeeOptionSelectProps) => {
  return (
    <option value={employee.employeeId}>
      {employee.employeeName} {employee.employeeSurname}
    </option>
  );
};

export default EmployeeOptionSelect;
