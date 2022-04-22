/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import apiUrls from "../constants/apiUrls";
import CommentModel from "../models/commentModels/CommentModel";

const useFetchCommentsPerTask = (
  taskId: string,
  refreshState: number
): [CommentModel[] | undefined, boolean] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentModel[]>();

  useEffect(() => {
    setIsLoading(true);

    fetch(apiUrls.task.getCommentsPerTask(taskId), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setComments(data))
      .then(() => setTimeout(() => setIsLoading(false), 200))
      .catch(() => console.log("ERROR while getting comments"));
  }, [refreshState, taskId]);

  return [comments, isLoading];
};

export default useFetchCommentsPerTask;
