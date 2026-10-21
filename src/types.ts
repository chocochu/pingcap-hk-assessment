export type Language = "en" | "zh-Hant";

export type PageId = "home" | "search" | "companies" | "coverage" | "technical";

/**
 * Plain text with two inline marks: **bold** and [label](href).
 * Hrefs are https://, #anchor, page:<id>[#anchor] or evidence:<file>.
 */
export type Rich = string;

export type Strength = "strong" | "medium" | "clue";

export type Verdict = "examined" | "account" | "sales" | "marketing" | "later";

export type Localized<T = string> = Record<Language, T>;

export interface Business {
  label: string;
  observations: string | number;
  categories: Localized;
  countries: string;
  domains: string;
}
