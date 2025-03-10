//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppWrapper } from "./AppWrapper.jsx";
import "./services/style/main.scss";

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <AppWrapper />
  //</StrictMode>
);

