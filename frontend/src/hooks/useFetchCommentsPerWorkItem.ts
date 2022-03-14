/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import CommentModel from "../models/commentModels/CommentModel";

const useFetchCommentsPerWorkItem = (
  workItemId: string,
  refreshState: number
): [CommentModel[] | undefined, boolean] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentModel[]>();

  useEffect(() => {
    setIsLoading(true);

    fetch(`https://localhost:44358/api/WorkItems/${workItemId}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setComments(data))
      .then(() => setTimeout(() => setIsLoading(false), 200))
      .catch(() => console.log("ERROR while getting comments"));
  }, [refreshState, workItemId]);

  return [comments, isLoading];
};

export default useFetchCommentsPerWorkItem;
