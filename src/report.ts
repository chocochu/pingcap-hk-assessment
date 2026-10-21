import rawReport from "./data/report.json";
import type { Business, Language, Report } from "./types";

export const report = rawReport as Report;
export const languages: Language[] = ["en", "zh-Hant"];

export function languageFromPath(path: string): Language {
  return path.endsWith("/zh-Hant.html") ? "zh-Hant" : "en";
}

export function languagePath(language: Language): string {
  return language === "zh-Hant" ? "./zh-Hant.html" : "./index.html";
}

export function evidenceHref(href: string): string {
  if (href.startsWith("https://") || href.startsWith("#")) return href;
  if (/^[a-zA-Z0-9_-]+\.(csv|json|txt)$/.test(href)) return `./evidence/${href}`;
  throw new Error(`Unsupported report link: ${href}`);
}

const searchText = (value: string): string => value.normalize("NFKC").toLocaleLowerCase();

export function filterBusinesses(businesses: Business[], query: string): Business[] {
  const term = searchText(query.trim());
  if (!term) return businesses;
  return businesses.filter((business) =>
    searchText(
      [
        business.label,
        business.categories.en,
        business.categories["zh-Hant"],
        business.countries,
        business.domains,
      ].join(" "),
    ).includes(term),
  );
}
