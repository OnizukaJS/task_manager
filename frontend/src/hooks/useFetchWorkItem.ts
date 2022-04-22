import { useEffect, useState } from "react";
import apiUrls from "../constants/apiUrls";
import WorkItemModel from "../models/workItemModels/WorkItemModel";

const useFetchWorkItem = (
  refreshState: number
): [WorkItemModel[] | undefined, boolean] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [workItems, setWorkItems] = useState<WorkItemModel[]>();

  useEffect(() => {
    setIsLoading(true);

    fetch(apiUrls.workItem.getWorkItems, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setWorkItems(data))
      .then(() => setTimeout(() => setIsLoading(false), 200))
      .catch(() => console.log("ERROR while getting work items"));
  }, [refreshState]);

  return [workItems, isLoading];
};

export default useFetchWorkItem;
