import type { Language, PageId } from "./types";

export const languages: Language[] = ["en", "zh-Hant"];
export const pages: PageId[] = ["home", "search", "companies", "coverage", "technical"];

const files: Record<PageId, string> = {
  home: "index.html",
  search: "search.html",
  companies: "companies.html",
  coverage: "coverage.html",
  technical: "technical.html",
};

/** Where a page is written inside dist/. Traditional Chinese lives in its own folder. */
export function outputPath(language: Language, page: PageId): string {
  return language === "en" ? files[page] : `zh-Hant/${files[page]}`;
}

/** Relative prefix from a page back to the site root, so the site works under any subpath. */
export function rootPrefix(language: Language): string {
  return language === "en" ? "./" : "../";
}

/** Link from a page in `from` to `page` in `to` (default: same language). */
export function pageHref(from: Language, page: PageId, to: Language = from, hash = ""): string {
  const anchor = hash ? `#${hash}` : "";
  if (from === to) return `./${files[page]}${anchor}`;
  return to === "zh-Hant" ? `./zh-Hant/${files[page]}${anchor}` : `../${files[page]}${anchor}`;
}

export function evidenceHref(language: Language, name: string): string {
  if (!/^[a-zA-Z0-9_-]+\.(csv|json|txt)$/.test(name)) {
    throw new Error(`Unsupported evidence file: ${name}`);
  }
  return `${rootPrefix(language)}evidence/${name}`;
}

/** Resolve a link written in copy. Anything unrecognised is a build-time error. */
export function resolveHref(language: Language, href: string): string {
  if (href.startsWith("https://") || href.startsWith("#")) return href;
  if (href.startsWith("evidence:")) return evidenceHref(language, href.slice("evidence:".length));
  if (href.startsWith("page:")) {
    const [page, hash = ""] = href.slice("page:".length).split("#");
    if (!(pages as string[]).includes(page)) throw new Error(`Unknown page link: ${href}`);
    return pageHref(language, page as PageId, language, hash);
  }
  throw new Error(`Unsupported link: ${href}`);
}

/** Work out language and page from a URL path; used only by the dev server. */
export function locate(pathname: string): { language: Language; page: PageId } {
  const language: Language = pathname.includes("/zh-Hant/") ? "zh-Hant" : "en";
  const file = pathname.split("/").pop() || "index.html";
  const page = pages.find((id) => files[id] === file) ?? "home";
  return { language, page };
}
