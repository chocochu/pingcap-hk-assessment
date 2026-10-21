import type { Language } from "../types";
import { en } from "./en";
import type { Copy } from "./types";
import { zhHant } from "./zh-Hant";

export function copyFor(language: Language): Copy {
  return language === "en" ? en : zhHant;
}

export type { Copy } from "./types";
