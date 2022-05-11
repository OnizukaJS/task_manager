import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";
import apiUrls from "../constants/apiUrls";
import { useSuccessSnackbar } from "../hooks/useErrorSnackbar";
import EmployeeModel from "../models/employeeModels/EmployeeModel";
import LoadingButton from "@mui/lab/LoadingButton";
import { Send as SendIcon, Delete as DeleteIcon } from "@mui/icons-material";
import ProfilePicture from "./ProfilePicture";

const useStyles = makeStyles(() => ({
  dialogContent: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    height: "100px",
    width: "100px",
    border: "6px solid white",
    borderRadius: "50%",
    boxShadow: "0px 0px 8px rgb(0 0 0 / 40%)",
    marginRight: "2rem",
  },
}));
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
  const classes = useStyles();
  const { showMessage: showSuccessMessage } = useSuccessSnackbar();

  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState<string>();
  const [showPreview, setShowPreview] = useState<
    string | ArrayBuffer | null | undefined
  >(null);
  const [isUploadButtonLoading, setIsUploadButtonLoading] =
    useState<boolean>(false);
  const [isDeleteButtonLoading, setIsDeleteButtonLoading] =
    useState<boolean>(false);

  const handleChangeProfilePicture = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);

      // To be able to see a preview of the image selected
      const imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setShowPreview(x.target?.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setShowPreview(null);
    }
  };

  const uploadFile = async () => {
    setIsUploadButtonLoading(true);

    const formData = new FormData();
    formData.append("formFile", file!);
    formData.append("fileName", fileName!);
    formData.append("employeeId", employeeId);

    try {
      await axios.post(apiUrls.profilePicture.uploadProfilePicture, formData);
      setIsUploadButtonLoading(false);

      setOpenEditProfilePictureDialog(false);
      triggerRefresh();
      triggerRefreshHeader();
      showSuccessMessage({ message: "Profile picture properly updated." });
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleDelete = async () => {
    setIsDeleteButtonLoading(true);

    fetch(apiUrls.profilePicture.deleteProfilePicture(employeeId), {
      method: "DELETE",
    })
      .then(() => setIsDeleteButtonLoading(false))
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
    setTimeout(() => setShowPreview(null), 200);
  };

  return (
    <Dialog open={openEditProfilePictureDialog} onClose={handleClose}>
      <DialogTitle>Update profile picture</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {showPreview === null && employeeData.profilePicture === null ? (
          <ProfilePicture
            name={employeeData.employeeName}
            surname={employeeData.employeeSurname}
            height={100}
            width={100}
            fontSize={35}
            border="6px solid white"
            boxShadow="0px 0px 8px rgb(0 0 0 / 40%)"
            marginRight="2rem"
          />
        ) : (
          <img
            src={
              showPreview !== null
                ? (showPreview as string)
                : `https://mytaskmanagerblobstorage.blob.core.windows.net/profilepicture/${employeeData.profilePicture}`
            }
            className={classes.image}
            alt="profile"
          />
        )}

        <input
          type="file"
          name="profilePic"
          id="profilePic"
          accept="image/*"
          onChange={handleChangeProfilePicture}
        />
      </DialogContent>

      <DialogActions>
        <LoadingButton
          onClick={handleDelete}
          endIcon={<DeleteIcon />}
          loading={isDeleteButtonLoading}
          loadingPosition="end"
          variant="contained"
          style={{
            borderRadius: 0,
            boxShadow: "none",
          }}
        >
          Delete
        </LoadingButton>

        <LoadingButton
          onClick={uploadFile}
          endIcon={<SendIcon />}
          loading={isUploadButtonLoading}
          loadingPosition="end"
          variant="contained"
          style={{
            borderRadius: 0,
            boxShadow: "none",
          }}
        >
          Upload
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfilePictureDialog;
