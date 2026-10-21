import { describe, expect, test } from "bun:test";
import { renderToString } from "react-dom/server";
import { ReportText } from "../src/components/ReportText";
import rawReport from "../src/data/report.json";
import { releaseTime, withPublication } from "../src/lib/releases";
import type { Publication } from "../src/lib/releases";
import type { Report } from "../src/types";

const source = rawReport as Report;

const publication: Publication = {
  version: "0.2.1",
  preparedAt: "2026-10-21T16:05:09Z",
  sourceReportSha256: rawReport.source.sha256,
  contentSha256: "0".repeat(64),
  history: [
    {
      version: "0.2.1",
      preparedAt: "2026-10-21T16:05:09Z",
      summary: { en: "Validated update.", "zh-Hant": "已驗證的更新。" },
    },
  ],
};

describe("website release timestamps", () => {
  test("uses Hong Kong time to the second across the midnight date boundary", () => {
    expect(releaseTime(publication.preparedAt)).toBe("2026-10-22 00:05:09 HKT");
    expect(releaseTime("2026-10-22T00:05:09+08:00")).toBe("2026-10-22 00:05:09 HKT");
    expect(() => releaseTime("2026-10-22T00:05:09")).toThrow();
    expect(() => releaseTime("2026-10-22")).toThrow();
  });

  test("both editions retain source prose and earlier dates while adding precise release history", () => {
    const before = JSON.stringify(rawReport);
    const updated = withPublication(source, publication);
    for (const language of ["en", "zh-Hant"] as const) {
      const copy = updated.locales[language];
      expect(copy.eyebrow).toContain("0.2.1");
      expect(copy.eyebrow).toContain("2026-10-22 00:05:09 HKT");
      const history = copy.sections.find((section) => section.id === "release-history")!;
      const original = source.locales[language].sections.find(
        (section) => section.id === "release-history",
      )!;
      expect(history.blocks.slice(2)).toEqual(original.blocks);
      const first = history.blocks[0];
      if (first.type !== "paragraph") throw new Error("Expected a release paragraph");
      expect(renderToString(<ReportText content={first.content} />)).toContain(
        "2026-10-22 00:05:09 HKT",
      );
      expect(copy.footer.slice(1)).toEqual(source.locales[language].footer);
    }
    expect(JSON.stringify(rawReport)).toBe(before);
  });

  test("an analysis refresh cannot silently claim the previous published release timestamp", () => {
    const updated = withPublication(source, {
      ...publication,
      sourceReportSha256: "different-source",
    });
    expect(updated.locales.en.eyebrow).toStartWith("Unpublished local update");
    expect(updated.locales["zh-Hant"].eyebrow).toStartWith("尚未發布的本機更新");
    expect(updated.locales.en.eyebrow).not.toContain("00:05:09");
  });
});
