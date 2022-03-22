import React, { ReactElement } from "react";

import { Button, createStyles, makeStyles } from "@material-ui/core";

interface ButtonComponentProps {
  text: string;
  variant: "text" | "contained" | "outlined";
  color?: "primary" | "secondary";
  type?: "submit" | "reset";
  onClick?: () => void;
  marginLeft?: string;
  marginBottom?: string;
  marginTop?: string;
  onHoverColor?: string;
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
  onHoverColor,
  variant,
  startIcon,
  endIcon,
}: ButtonComponentProps) => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      handleOnHover: {
        "&:hover": {
          backgroundColor: onHoverColor,
        },
      },
    })
  );

  const classes = useStyles();

  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      type={type}
      style={{ marginLeft, marginBottom, marginTop }}
      startIcon={startIcon ? startIcon : null}
      endIcon={endIcon ? endIcon : null}
      className={classes.handleOnHover}
    >
      {text}
    </Button>
  );
};

export default ButtonComponent;
