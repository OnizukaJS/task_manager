import { Avatar } from "@material-ui/core";
import React from "react";

interface Props {
  name: string;
  surname: string;
  profilePictureBlobStorage?: string;
  height?: number;
  width?: number;
  fontSize?: number;
  border?: string;
  boxShadow?: string;
}

const ProfilePicture = ({
  name,
  surname,
  profilePictureBlobStorage,
  height,
  width,
  fontSize,
  border,
  boxShadow,
}: Props) => {
  const fullName = `${name} ${surname}`;
  console.log("fullName", fullName);
  console.log("profile", profilePictureBlobStorage);

  const nameToColor = () => {
    let hash = 0;
    let i;

    for (i = 0; i < fullName.length; i += 1) {
      hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }

    return color;
  };

  const profilePictureIsNotFound = (): boolean => {
    if (
      profilePictureBlobStorage === null ||
      profilePictureBlobStorage === "" ||
      profilePictureBlobStorage === undefined
    ) {
      return true;
    }
    return false;
  };

  return profilePictureIsNotFound() ? (
    <Avatar
      style={{
        backgroundColor: nameToColor(),
        height,
        width,
        fontSize,
        border,
        boxShadow,
      }}
    >
      {name?.charAt(0)}
      {surname?.charAt(0)}
    </Avatar>
  ) : (
    <Avatar
      style={{
        backgroundColor: nameToColor(),
        height,
        width,
        fontSize,
        border,
        boxShadow,
      }}
      src={`https://mytaskmanagerblobstorage.blob.core.windows.net/profilepicture/${profilePictureBlobStorage}`}
    />
  );
};

export default ProfilePicture;
