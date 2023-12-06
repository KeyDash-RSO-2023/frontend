import React from "react";
import ReactDOM from "react-dom/client";
import App from "./compontents/App/App.tsx";
import { AppProvider } from "./compontents/AppProvider/AppProvider.tsx";
// import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
  </React.StrictMode>
);
