import { IconButton, TextField, Tooltip, withStyles } from "@material-ui/core";
import React, { useState, KeyboardEvent } from "react";
import TagModel from "../../models/tagModels/TagModel";
import AddIcon from "@mui/icons-material/Add";
import {
  ButtonUnstyled,
  buttonUnstyledClasses,
  ButtonUnstyledProps,
} from "@mui/base";
import { styled } from "@mui/system";
import TagModelToCreate from "../../models/tagModels/TagModelToCreate";

const CustomCreateTagButtonRoot = styled("button")`
  background-color: #eff6fc;
  padding: 5px 10px;
  color: black;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #deecf9;
  }

  &.${buttonUnstyledClasses.active} {
    background-color: #0078d4;
  }
`;

const CustomCreateTagButton = (props: ButtonUnstyledProps) => {
  return <ButtonUnstyled {...props} component={CustomCreateTagButtonRoot} />;
};

const AddMoreTagButton = withStyles({
  root: {
    backgroundColor: "#EFF6FC",
    "&:hover": {
      backgroundColor: "#DEECF9",
    },
    border: "none",
    borderRadius: 0,
    padding: "2px 2px",
  },
})(IconButton);

interface AddTagButtonProps {
  tags: TagModel[] | undefined;
  taskId?: string;
  workItemId?: string;
  triggerRefresh: () => void;
}

const AddTagButton = ({
  tags,
  taskId,
  workItemId,
  triggerRefresh,
}: AddTagButtonProps) => {
  const [displayInput, setDisplayInput] = useState<boolean>(false);
  const [tagToCreate, setTagToCreate] = useState<TagModelToCreate>({
    text: "",
    taskToDoId: taskId,
    workItemId: workItemId,
  });

  const handleDisplayInput = () => {
    setDisplayInput(true);
  };

  const handleChangeTagToCreate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagToCreate({ ...tagToCreate, [e.target.name]: e.target.value });
  };

  const handlePressEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      console.log(tagToCreate);

      fetch(`https://localhost:44358/api/Tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: tagToCreate.text,
          taskToDoId: tagToCreate.taskToDoId,
          workItemId: tagToCreate.workItemId,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then(() => triggerRefresh())
        .catch(() => console.log("ERROR while creating new tag"));
    }
  };

  return tags?.length! === 0 ? (
    displayInput ? (
      <TextField
        name="text"
        type="search"
        onChange={handleChangeTagToCreate}
        onKeyPress={handlePressEnter}
      />
    ) : (
      <CustomCreateTagButton onClick={handleDisplayInput}>
        Add tag
      </CustomCreateTagButton>
    )
  ) : (
    <Tooltip title="Add tag" arrow>
      {!displayInput ? (
        <AddMoreTagButton onClick={handleDisplayInput}>
          <AddIcon fontSize="small" />
        </AddMoreTagButton>
      ) : (
        <TextField
          name="text"
          type="search"
          onChange={handleChangeTagToCreate}
          onKeyPress={handlePressEnter}
        />
      )}
    </Tooltip>
  );
};

export default AddTagButton;
