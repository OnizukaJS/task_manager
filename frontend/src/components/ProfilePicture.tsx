import { Avatar } from "@material-ui/core";
import React from "react";

interface Props {
  name: string;
  surname: string;
  height?: number;
  width?: number;
  fontSize?: number;
}

const ProfilePicture = ({ name, surname, height, width, fontSize }: Props) => {
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

  return (
    <Avatar style={{ backgroundColor: nameToColor(), height, width, fontSize }}>
      {name?.charAt(0)}
      {surname?.charAt(0)}
    </Avatar>
  );
};

export default ProfilePicture;
