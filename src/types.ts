export type Language = "en" | "zh-Hant";

export type Inline =
  | { type: "text"; text: string }
  | { type: "link"; href: string; children: Inline[] }
  | { type: "strong"; children: Inline[] };

export type Block =
  | { type: "paragraph"; content: Inline[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | {
      type: "findings";
      items: { label: string; tag: string; paragraphs: Inline[][]; sources: Inline[] }[];
    }
  | { type: "directory" }
  | { type: "downloads"; items: { href: string; label: string }[] };

export interface Locale {
  eyebrow: string;
  title: string;
  lead: Inline[];
  caution: Inline[];
  release: { title: string; label: string; paragraphs: Inline[][] };
  nav: { id: string; label: string }[];
  metrics: { value: string; label: string }[];
  sections: { id: string; title: string; blocks: Block[] }[];
  directory: { label: string; placeholder: string; headers: string[]; initialCountLabel: string };
  footer: Inline[];
}

export interface Business {
  label: string;
  observations: string | number;
  categories: Record<Language, string>;
  countries: string;
  domains: string;
}

export interface Report {
  locales: Record<Language, Locale>;
  businesses: Business[];
}
