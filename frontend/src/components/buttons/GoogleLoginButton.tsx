import { makeStyles } from "@material-ui/core";
import React from "react";
import { GoogleLogin } from "react-google-login";
import refreshTokenSetup from "../../hooks/refreshTokenSetup";
import googleIcon from "../../images/google_icon.png";

const useStyles = makeStyles({
  button: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginTop: "2rem",
    backgroundColor: "white",
    fontSize: "18px",
    borderRadius: ".3rem",
    border: "0.01rem solid rgb(204, 204, 204)",
  },
  icon: {
    width: "30px",
    margin: "8px",
  },
});

// const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const clientId =
  "102140214039-5s1mrh1gt1iit0fp11d1erev0lkjo5cv.apps.googleusercontent.com";

const GoogleLoginButton = () => {
  const classes = useStyles();

  const onSuccess = (res: any) => {
    console.log("[Login Success] currentUser:", res.profileObj);

    refreshTokenSetup(res);
  };

  const onFailure = (res: any) => {
    console.log("[Login failed] res:", res);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      style={{ marginTop: "100px" }}
      isSignedIn={true}
      render={(renderProps) => (
        <button className={classes.button} onClick={renderProps.onClick}>
          <img src={googleIcon} alt="google_icon" className={classes.icon} />
          <span>Sign in with Google</span>
        </button>
      )}
    />
  );
};

export default GoogleLoginButton;
