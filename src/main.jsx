import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App";
import "./index.css";

import { registerSW } from "virtual:pwa-register";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
);

registerSW({
  onNeedRefresh() {
    console.log("Update tersedia");
  },
  onOfflineReady() {
    console.log("App siap offline");
  },
});
