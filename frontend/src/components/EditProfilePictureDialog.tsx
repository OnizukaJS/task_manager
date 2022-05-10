import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import React, { useState } from "react";
import ButtonComponent from "./buttons/ButtonComponent";
import axios from "axios";
import apiUrls from "../constants/apiUrls";
import { useSuccessSnackbar } from "../hooks/useErrorSnackbar";
import EmployeeModel from "../models/employeeModels/EmployeeModel";

interface EditProfilePictureDialogProps {
  openEditProfilePictureDialog: boolean;
  setOpenEditProfilePictureDialog: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  employeeId: string;
  employeeData: EmployeeModel;
  triggerRefresh: () => void;
  triggerRefreshHeader: () => void;
}

const EditProfilePictureDialog = ({
  openEditProfilePictureDialog,
  setOpenEditProfilePictureDialog,
  employeeId,
  employeeData,
  triggerRefresh,
  triggerRefreshHeader,
}: EditProfilePictureDialogProps) => {
  const { showMessage: showSuccessMessage } = useSuccessSnackbar();

  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState<string>();

  const saveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
    setFileName(e.target.files![0].name);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("formFile", file!);
    formData.append("fileName", fileName!);
    formData.append("employeeId", employeeId);

    try {
      await axios.post(apiUrls.profilePicture.uploadProfilePicture, formData);
      setOpenEditProfilePictureDialog(false);
      triggerRefresh();
      triggerRefreshHeader();
      showSuccessMessage({ message: "Profile picture properly updated." });
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleDelete = async () => {
    fetch(apiUrls.profilePicture.deleteProfilePicture(employeeId), {
      method: "DELETE",
    })
      .then(() => setOpenEditProfilePictureDialog(false))
      .then(() => triggerRefresh())
      .then(() => triggerRefreshHeader())
      .then(() =>
        showSuccessMessage({ message: "Profile picture properly deleted." })
      )
      .then(() => console.log("ERROR while deleting profile picture"));
  };

  const handleClose = () => {
    setOpenEditProfilePictureDialog(false);
  };

  return (
    <Dialog open={openEditProfilePictureDialog} onClose={handleClose}>
      <DialogTitle>Update profile picture</DialogTitle>
      <DialogContent>
        <input
          type="file"
          name="profilePic"
          id="profilePic"
          accept="image/*"
          onChange={saveFile}
        />
      </DialogContent>

      <DialogActions>
        <ButtonComponent
          text="Delete"
          variant="contained"
          color="primary"
          borderRadius="0"
          boxShadow="none"
          backgroundColor="#0078d4"
          onHoverColor="#106ebe"
          onClick={handleDelete}
        />

        <ButtonComponent
          text="Upload"
          variant="contained"
          color="primary"
          borderRadius="0"
          boxShadow="none"
          backgroundColor="#0078d4"
          onHoverColor="#106ebe"
          onClick={uploadFile}
        />
      </DialogActions>
    </Dialog>
  );
};

export default EditProfilePictureDialog;
