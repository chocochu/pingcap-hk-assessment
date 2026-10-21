import { createContext, useContext } from "react";
import type { Copy } from "../content";
import type { Language } from "../types";

export interface SiteState {
  language: Language;
  copy: Copy;
}

export const SiteContext = createContext<SiteState | null>(null);

export function useSite(): SiteState {
  const value = useContext(SiteContext);
  if (!value) throw new Error("SiteContext is missing");
  return value;
}
