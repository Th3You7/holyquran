import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import MainProvider from "./Providers/MainProvider";

import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./hooks/scrollToTop";

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
