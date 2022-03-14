interface CommentModel {
  commentId: string;
  text: string;
  creationDate: Date;
  employeeId: string;
  workItemId?: string;
  taskToDoId?: string;
}

export default CommentModel;
