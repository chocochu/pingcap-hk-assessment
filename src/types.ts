export type Language = "en" | "zh-Hant";

export type PageId = "home" | "search" | "companies" | "coverage" | "technical";

/**
 * Plain text with two inline marks: **bold** and [label](href).
 * Hrefs are https://, #anchor, page:<id>[#anchor] or evidence:<file>.
 */
export type Rich = string;

export type Strength = "strong" | "medium" | "clue";

/** The kind of Hong Kong connection public sources show for a company. */
export type HkLink = "registered" | "based" | "group";

export type Verdict = "examined" | "account" | "sales" | "marketing" | "later";

export type Localized<T = string> = Record<Language, T>;

export interface Industry extends Localized {
  code: string;
}

export interface IndustryData {
  industries: Industry[];
  labels: Record<string, string[]>;
}

export interface Business {
  label: string;
  observations: string | number;
  categories: Localized;
  countries: string;
  domains: string;
}
