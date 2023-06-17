import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";
import { ToastProvider } from "react-toast-notifications";

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

//extra api key sudhanshu AIzaSyD53f8EOZksI3yzYqusT85aaAFX5Gleec0
