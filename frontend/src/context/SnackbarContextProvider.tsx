import { SnackbarProvider } from "notistack";
import React, { PropsWithChildren, ReactElement } from "react";

const SnackbarContextProvider = ({
  children,
}: PropsWithChildren<unknown>): ReactElement => {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
};

export default SnackbarContextProvider;
