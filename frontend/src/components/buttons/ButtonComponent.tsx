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
  borderRadius?: string;
  onHoverColor?: string;
  boxShadow?: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  backgroundColor?: string;
  disabled?: boolean;
}

const ButtonComponent = ({
  text,
  type,
  onClick,
  color,
  marginLeft,
  marginBottom,
  marginTop,
  borderRadius,
  onHoverColor,
  boxShadow,
  variant,
  startIcon,
  endIcon,
  backgroundColor,
  disabled,
}: ButtonComponentProps) => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      customButton: {
        backgroundColor: backgroundColor,

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
      style={{ marginLeft, marginBottom, marginTop, borderRadius, boxShadow }}
      startIcon={startIcon ? startIcon : null}
      endIcon={endIcon ? endIcon : null}
      className={classes.customButton}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default ButtonComponent;
