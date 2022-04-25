import { useEffect, useState } from "react";
import apiUrls from "../constants/apiUrls";
import WorkItemModel from "../models/workItemModels/WorkItemModel";

const useFetchSingleWorkItem = (
  workItemId: string,
  refreshState: number
): [WorkItemModel, boolean] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [workItem, setWorkItem] = useState<WorkItemModel>({
    id: "",
    name: "",
    description: "",
    status: 1,
    type: 1,
    employeeId: "",
  });

  useEffect(() => {
    setIsLoading(true);

    fetch(apiUrls.workItem.getWorkItem(workItemId), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setWorkItem(data))
      .then(() => setTimeout(() => setIsLoading(false), 200))
      .catch(() => console.log("ERROR while getting work item data"));
  }, [refreshState, workItemId]);

  return [workItem, isLoading];
};

export default useFetchSingleWorkItem;
