import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>

    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>

  </React.StrictMode>
);
