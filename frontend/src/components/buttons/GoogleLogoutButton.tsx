import React from "react";
import { GoogleLogout } from "react-google-login";
import { useSuccessSnackbar } from "../../hooks/useErrorSnackbar";

// const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const clientId =
  "102140214039-5s1mrh1gt1iit0fp11d1erev0lkjo5cv.apps.googleusercontent.com";

const GoogleLogoutButton = () => {
  const { showMessage: showSuccessMessage } = useSuccessSnackbar();

  const onSuccess = () => {
    showSuccessMessage({ message: "Logout made suceessfully ✌️" });
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default GoogleLogoutButton;
