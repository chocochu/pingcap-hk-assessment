import { describe, expect, test } from "bun:test";
import { renderToString } from "react-dom/server";
import { App } from "../src/App";
import { IndustryIcon } from "../src/components/icons";
import industries from "../src/data/industries.json";
import { releaseDate, releaseTime } from "../src/lib/releases";
import { languages, locate, outputPath, pageHref, pages, resolveHref } from "../src/site";

describe("every page renders real HTML in both languages", () => {
  for (const language of languages) {
    for (const page of pages) {
      test(`${language} ${page}`, () => {
        const html = renderToString(<App language={language} page={page} />);
        expect(html.match(/<h1[ >]/g)).toHaveLength(1);
        expect(html).toContain('id="main-content"');
        expect(html).toContain(`aria-current="page"`);
        expect(html.length).toBeGreaterThan(4000);
        // every external link opens safely
        for (const tag of html.match(/<a [^>]*target="_blank"[^>]*>/g) ?? []) {
          expect(tag).toContain('rel="noopener noreferrer"');
        }
        // every page offers the other language
        expect(html).toContain(`hrefLang="${language === "en" ? "zh-Hant" : "en"}"`);
      });
    }
  }

  test("search page is usable before JavaScript loads", () => {
    const html = renderToString(<App language="en" page="search" />);
    expect(html).toContain("Company name, brand or website");
    expect(html).toContain("<noscript>");
    expect(html).toContain("business_labels.csv");
    expect(html).toContain("Company profile");
  });

  test("search page offers industry filters in both languages", () => {
    const en = renderToString(<App language="en" page="search" />);
    expect(en).toContain("Banking &amp; Lending");
    expect(en).toContain("not verified company information");
    const zh = renderToString(<App language="zh-Hant" page="search" />);
    expect(zh).toContain("銀行及借貸");
    expect(zh).toContain("並非已核實的公司資料");
  });

  test("every industry has its own icon and icons are decorative", () => {
    const html = (code: string) => renderToString(<IndustryIcon code={code} />);
    expect(html("BNK")).toContain('aria-hidden="true"');
    const fallback = html("UNK");
    for (const { code } of industries.industries) {
      if (code !== "UNK") expect(html(code)).not.toBe(fallback);
    }
    expect(html("NOT-A-CODE")).toBe(fallback);
  });

  test("company page lists every company with an anchor", () => {
    const html = renderToString(<App language="zh-Hant" page="companies" />);
    for (const id of [
      "shoplazza",
      "starling-labs",
      "wetech",
      "megahard",
      "asiapac",
      "river-game",
      "oceanbase",
      "klook",
      "coihub",
    ]) {
      expect(html).toContain(`id="${id}"`);
    }
  });
});

describe("routing", () => {
  test("pages are written to predictable paths", () => {
    expect(outputPath("en", "home")).toBe("index.html");
    expect(outputPath("zh-Hant", "search")).toBe("zh-Hant/search.html");
  });

  test("links are relative so the site works under a subpath", () => {
    expect(pageHref("en", "search")).toBe("./search.html");
    expect(pageHref("en", "search", "zh-Hant")).toBe("./zh-Hant/search.html");
    expect(pageHref("zh-Hant", "search", "en")).toBe("../search.html");
    expect(resolveHref("zh-Hant", "evidence:business_labels.csv")).toBe(
      "../evidence/business_labels.csv",
    );
    expect(resolveHref("en", "page:companies#klook")).toBe("./companies.html#klook");
  });

  test("only reviewed link shapes are accepted", () => {
    for (const bad of [
      "http://example.com",
      "javascript:alert(1)",
      "evidence:../x.csv",
      "evidence:a.exe",
      "page:nope",
      "/x",
    ]) {
      expect(() => resolveHref("en", bad)).toThrow();
    }
  });

  test("the dev server can tell language and page from a path", () => {
    expect(locate("/")).toEqual({ language: "en", page: "home" });
    expect(locate("/companies.html")).toEqual({ language: "en", page: "companies" });
    expect(locate("/zh-Hant/technical.html")).toEqual({ language: "zh-Hant", page: "technical" });
  });
});

describe("release times", () => {
  test("use Hong Kong time to the second across the midnight boundary", () => {
    expect(releaseTime("2026-10-21T16:05:09Z")).toBe("2026-10-22 00:05:09 HKT");
    expect(releaseTime("2026-10-22T00:05:09+08:00")).toBe("2026-10-22 00:05:09 HKT");
    expect(() => releaseTime("2026-10-22T00:05:09")).toThrow();
    expect(() => releaseTime("2026-10-22")).toThrow();
  });

  test("dates read naturally in each language", () => {
    expect(releaseDate("2026-10-21T09:30:00Z", "en")).toBe("21 October 2026");
    expect(releaseDate("2026-10-21T09:30:00Z", "zh-Hant")).toContain("2026年10月21日");
  });
});
