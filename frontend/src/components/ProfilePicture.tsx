import { Avatar } from "@material-ui/core";
import React from "react";

interface Props {
  name: string;
  surname: string;
  profilePictureBlobStorage?: string;
  sasUriProfilPicture?: string;
  height?: number;
  width?: number;
  fontSize?: number;
  border?: string;
  boxShadow?: string;
  marginRight?: string;
}

const ProfilePicture = ({
  name,
  surname,
  profilePictureBlobStorage,
  sasUriProfilPicture,
  height,
  width,
  fontSize,
  border,
  boxShadow,
  marginRight,
}: Props) => {
  const fullName = `${name} ${surname}`;

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

  console.log(sasUriProfilPicture);

  const sasUriProfilPictureIsNotFound = (): boolean => {
    if (
      sasUriProfilPicture === null ||
      sasUriProfilPicture === "" ||
      sasUriProfilPicture === undefined
    ) {
      return true;
    }
    return false;
  };

  return sasUriProfilPictureIsNotFound() ? (
    <Avatar
      style={{
        backgroundColor: nameToColor(),
        height,
        width,
        fontSize,
        border,
        boxShadow,
        marginRight,
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
      src={sasUriProfilPicture}
    />
  );
};

export default ProfilePicture;
