import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import { languageFromPath } from "./report";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing application root");
const app = (
  <StrictMode>
    <App initialLanguage={languageFromPath(window.location.pathname)} />
  </StrictMode>
);
if (root.children.length > 0) hydrateRoot(root, app);
else createRoot(root).render(app);
