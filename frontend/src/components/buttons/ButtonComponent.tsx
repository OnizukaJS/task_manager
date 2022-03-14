import React, { ReactElement } from "react";

import { Button } from "@material-ui/core";

interface ButtonComponentProps {
  text: string;
  variant: "text" | "contained" | "outlined";
  color?: "primary" | "secondary";
  type?: "submit" | "reset";
  onClick?: () => void;
  marginLeft?: string;
  marginBottom?: string;
  marginTop?: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
}

const ButtonComponent = ({
  text,
  type,
  onClick,
  color,
  marginLeft,
  marginBottom,
  marginTop,
  variant,
  startIcon,
  endIcon,
}: ButtonComponentProps) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      type={type}
      style={{ marginLeft, marginBottom, marginTop }}
      startIcon={startIcon ? startIcon : null}
      endIcon={endIcon ? endIcon : null}
    >
      {text}
    </Button>
  );
};

export default ButtonComponent;
