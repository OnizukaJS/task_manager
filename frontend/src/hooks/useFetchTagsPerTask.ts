/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import apiUrls from "../constants/apiUrls";
import TagModel from "../models/tagModels/TagModel";

const useFetchTagsPerTask = (
  taskId: string,
  refreshState: number
): [TagModel[] | undefined, boolean] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<TagModel[]>();

  useEffect(() => {
    setIsLoading(true);

    fetch(apiUrls.task.getTagsPerTask(taskId), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setTags(data))
      .then(() => setTimeout(() => setIsLoading(false), 200))
      .catch(() => console.log("ERROR while getting tags"));
  }, [refreshState, taskId]);

  return [tags, isLoading];
};

export default useFetchTagsPerTask;
