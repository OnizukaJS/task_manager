import { useSnackbar, VariantType } from "notistack";

interface ShowMessageProps {
  message: string;
  title?: string;
}

interface UseSnackbarResponse {
  showMessage: ({ message, title }: ShowMessageProps) => string | number;
  dismissMessage: (key: string | number) => void;
}

function useMuiSnackbar(variant: VariantType | undefined): UseSnackbarResponse {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return {
    showMessage: ({ message, title }: ShowMessageProps) => {
      const key = enqueueSnackbar(message, {
        onClick: () => {
          closeSnackbar(key);
        },
        variant,
      });
      return key;
    },
    dismissMessage: (key: string | number): void => {
      closeSnackbar(key);
    },
  };
}

const useErrorSnackbar = (): UseSnackbarResponse => {
  return useMuiSnackbar("error");
};

export const useWarningSnackbar = (): UseSnackbarResponse => {
  return useMuiSnackbar("warning");
};

export const useInfoSnackbar = (): UseSnackbarResponse => {
  return useMuiSnackbar("info");
};

export const useSuccessSnackbar = (): UseSnackbarResponse => {
  return useMuiSnackbar("success");
};

export default useErrorSnackbar;
