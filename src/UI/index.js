import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { ScenrioProvider } from "./contexts/ScenrioContext";
import { ThemeProvider } from "@material-ui/core/styles";
import { UserSettingsProvider } from "./contexts/UserSettingsContext";
import appTheme from "./theme";

ReactDOM.render(
  <ThemeProvider theme={appTheme}>
    <UserSettingsProvider>
      <ScenrioProvider>
        <App />
      </ScenrioProvider>
    </UserSettingsProvider>
  </ThemeProvider>,
  document.getElementById("app")
);
