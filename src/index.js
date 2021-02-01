import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import MainProvider from "./Providers/MainProvider";

import { HashRouter as Router } from "react-router-dom";
import ScrollToTop from "./hooks/scrollToTop";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MainProvider>
        <ScrollToTop />
        <App />
      </MainProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
