import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes"; // Import Routes
import "./index.css"; // Import your global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
