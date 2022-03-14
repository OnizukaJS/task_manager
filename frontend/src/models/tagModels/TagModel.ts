interface TagModel {
  tagId: string;
  text: string;
  creationDate: Date;
  workItemId?: string;
  taskToDoId?: string;
}

export default TagModel;
