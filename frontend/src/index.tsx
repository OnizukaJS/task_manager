import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./pages/Routes";
import SnackbarContextProvider from "./context/SnackbarContextProvider";

ReactDOM.render(
  <Router>
    <SnackbarContextProvider>
      <Routes />
    </SnackbarContextProvider>
  </Router>,
  document.getElementById("root")
);
