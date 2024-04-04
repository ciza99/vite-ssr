import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = document.getElementById("root");

if (!root) {
  throw new Error(
    "Root element not found. Make sure you have a div with id 'root' in your index.html",
  );
}

ReactDOM.hydrateRoot(
  root,
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
