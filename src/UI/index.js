import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import appTheme from "./theme";

ReactDOM.render(
  <ThemeProvider theme={appTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById("app")
);
