import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import { languages, locate, pages } from "./site";
import type { Language, PageId } from "./types";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing application root");

// Built pages say which page they are; the dev server works it out from the URL.
const located = locate(window.location.pathname);
const language = languages.find((item) => item === root.dataset.language) as Language | undefined;
const page = pages.find((item) => item === root.dataset.page) as PageId | undefined;

const app = (
  <StrictMode>
    <App language={language ?? located.language} page={page ?? located.page} />
  </StrictMode>
);
if (root.children.length > 0) hydrateRoot(root, app);
else createRoot(root).render(app);
