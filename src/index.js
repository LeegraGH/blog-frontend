import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import App from "./App";
import { theme } from "./theme";
import store from "./redux/store";

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </>
);
