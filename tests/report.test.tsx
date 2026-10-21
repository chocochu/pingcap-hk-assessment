import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { readdir } from "node:fs/promises";
import { renderToString } from "react-dom/server";
import evidenceFiles from "../scripts/evidence-files.json";
import { App } from "../src/App";
import {
  evidenceHref,
  filterBusinesses,
  languageFromPath,
  languagePath,
  report,
} from "../src/report";
import type { Inline } from "../src/types";

function text(nodes: Inline[]): string {
  return nodes.map((node) => (node.type === "text" ? node.text : text(node.children))).join("");
}

describe("reviewed report content", () => {
  test("both languages preserve staged review scope and all evidence sections", () => {
    expect(report.businesses).toHaveLength(421);
    expect(report.locales.en.sections.map((section) => section.id)).toEqual(
      report.locales["zh-Hant"].sections.map((section) => section.id),
    );
    for (const locale of Object.values(report.locales)) {
      const release = locale.release.paragraphs.map(text).join(" ");
      for (const value of ["FulcrumSec", "128.3", "200", "10.6"]) expect(release).toContain(value);
      expect(
        locale.sections
          .flatMap((section) => section.blocks)
          .filter((block) => block.type === "findings")
          .flatMap((block) => block.items),
      ).toHaveLength(9);
      expect(
        locale.sections
          .flatMap((section) => section.blocks)
          .filter((block) => block.type === "downloads")
          .flatMap((block) => block.items),
      ).toHaveLength(14);
    }
    expect(report.locales.en.release.paragraphs.map(text).join(" ")).toContain(
      "two previously reviewed archives",
    );
    expect(report.locales["zh-Hant"].release.paragraphs.map(text).join(" ")).toContain(
      "先前已檢視的兩個壓縮檔",
    );
  });

  test("BigQuery progress preserves candidate limits and matches the coverage snapshot", async () => {
    const bq = await Bun.file(
      new URL("../public/evidence/bq_coverage.json", import.meta.url),
    ).json();
    expect(bq.archive).toBe("04_bigquery.tar.gz");
    expect(["in_progress", "complete", "failed"]).toContain(bq.status);
    for (const locale of Object.values(report.locales)) {
      const progress = locale.sections.find((section) => section.id === "bq-progress");
      expect(progress).toBeDefined();
      const tables = progress!.blocks.filter((block) => block.type === "table");
      expect(tables).toHaveLength(2);
      expect(tables[0].rows.map((row) => row.slice(1))).toEqual(
        [bq.status, bq.inventory.status, bq.scan.status].map((status) =>
          ["pending", "in_progress", "complete", "failed"].map((state) =>
            status === state ? "✓" : "—",
          ),
        ),
      );
      expect(tables[1].rows.map((row) => Number(row[1]))).toEqual([
        bq.inventory.table_count,
        bq.inventory.dataset_count,
        bq.inventory.archive_bytes,
        bq.scan.tables_complete,
        bq.scan.rows_parsed,
        bq.scan.parse_errors,
        bq.scan.hk_location_rows,
        bq.scan.candidate_company_rows,
      ]);
      const prose = progress!.blocks
        .filter((block) => block.type === "paragraph")
        .map((block) => text(block.content))
        .join(" ");
      expect(prose).toContain("421");
    }
    const english = report.locales.en.sections
      .find((section) => section.id === "bq-progress")!
      .blocks.filter((block) => block.type === "paragraph")
      .map((block) => text(block.content))
      .join(" ");
    expect(english).toContain("not confirmed organisations or affected customers");
    expect(english).toContain("it does not mean all source material has been interpreted");
  });

  test("search accepts names, full-width input, Chinese categories and empty states", () => {
    expect(filterBusinesses(report.businesses, "")).toHaveLength(421);
    expect(filterBusinesses(report.businesses, " SHOPLAZZA ")).toEqual(
      filterBusinesses(report.businesses, "Ｓｈｏｐｌａｚｚａ"),
    );
    expect(filterBusinesses(report.businesses, "Shoplazza").length).toBeGreaterThan(0);
    const first = report.businesses[0];
    expect(filterBusinesses(report.businesses, first.categories["zh-Hant"])).toContain(first);
    expect(filterBusinesses(report.businesses, "no-matching-business-489321")).toHaveLength(0);
  });

  test("language URLs work at a nested static-host path", () => {
    expect(languageFromPath("/research/zh-Hant.html")).toBe("zh-Hant");
    expect(languageFromPath("/research/index.html")).toBe("en");
    expect(
      new URL(languagePath("zh-Hant"), "https://example.test/research/index.html").pathname,
    ).toBe("/research/zh-Hant.html");
    expect(
      new URL(evidenceHref("billing_evidence.csv"), "https://example.test/research/zh-Hant.html")
        .pathname,
    ).toBe("/research/evidence/billing_evidence.csv");
  });

  test("report links allow only public HTTPS, sections and reviewed file shapes", () => {
    expect(evidenceHref("https://www.pingcap.com/")).toBe("https://www.pingcap.com/");
    expect(evidenceHref("#catalog")).toBe("#catalog");
    for (const link of [
      "../private/raw.json",
      "javascript:alert(1)",
      "//other.test/data",
      "file:///tmp/data.csv",
    ])
      expect(() => evidenceHref(link)).toThrow();
  });

  test("both editions render real report HTML before JavaScript loads", () => {
    for (const language of ["en", "zh-Hant"] as const) {
      const html = renderToString(<App initialLanguage={language} />);
      expect(html).toContain(`lang="${language}"`);
      expect(html).toContain(report.locales[language].title);
      expect(html).toContain("128.3");
      expect(html).toContain("Shoplazza Hongkong Limited");
      expect(html).toContain('href="./evidence/billing_evidence.csv"');
      expect(html).toContain('href="./evidence/bq_coverage.json"');
      expect(html).toContain('href="./zh-Hant.html"');
    }
  });
});

test("public evidence contains only the reviewed allowlist with matching checksums", async () => {
  const directory = new URL("../public/evidence/", import.meta.url);
  expect((await readdir(directory)).sort()).toEqual([...evidenceFiles, "SHA256SUMS.txt"].sort());
  const manifest = await Bun.file(new URL("SHA256SUMS.txt", directory)).text();
  for (const line of manifest.trim().split("\n")) {
    const [expected, name] = line.split("  ");
    const bytes = await Bun.file(new URL(name, directory)).arrayBuffer();
    expect(createHash("sha256").update(Buffer.from(bytes)).digest("hex")).toBe(expected);
  }
});
