import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./pages/App";
import SnackbarContextProvider from "./context/SnackbarContextProvider";

ReactDOM.render(
  <Router>
    <SnackbarContextProvider>
      <App />
    </SnackbarContextProvider>
  </Router>,
  document.getElementById("root")
);
