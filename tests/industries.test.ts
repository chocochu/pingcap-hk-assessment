import { describe, expect, test } from "bun:test";
import { readFile } from "node:fs/promises";
import { buildIndustries, parseCsv } from "../scripts/industries";
import data from "../src/data/industries.json";
import { countIndustries, industryCodes, industryName } from "../src/lib/industries";
import { businesses } from "../src/lib/search";

const csv = await readFile(
  new URL("../public/classification/business_industry_categories.csv", import.meta.url),
  "utf8",
);

describe("industry classification data", () => {
  test("generated lookup matches the reviewed CSV; run `bun run sync:industries` after editing it", () => {
    expect(buildIndustries(csv)).toEqual(data);
  });

  test("every directory label is classified and no classification refers to a missing label", () => {
    const labels = businesses.map((business) => business.label);
    expect(Object.keys(data.labels).sort()).toEqual([...labels].sort());
    const known = new Set(data.industries.map((industry) => industry.code));
    for (const codes of Object.values(data.labels)) {
      expect(codes.length).toBeGreaterThan(0);
      for (const code of codes) expect(known.has(code)).toBe(true);
    }
  });

  test("labels may carry several industries and unknown labels fall back to Unclassified", () => {
    expect(industryCodes("Fubon Financial Holding Co., Ltd.")).toEqual(["BNK", "INS", "SEC"]);
    expect(industryCodes("A label added by a later release")).toEqual(["UNK"]);
    expect(industryName("BNK", "zh-Hant")).toBe("銀行及借貸");
    const counts = countIndustries(businesses);
    expect(counts.at(-1)?.code).toBe("UNK");
    expect(counts.reduce((sum, industry) => sum + industry.count, 0)).toBeGreaterThan(
      businesses.length,
    );
  });
});

describe("industry CSV parsing", () => {
  test("handles BOM, quoted commas, doubled quotes and CRLF", () => {
    expect(parseCsv('﻿a,"b,c","d ""e"""\r\nx,y,z\r\n')).toEqual([
      ["a", "b,c", 'd "e"'],
      ["x", "y", "z"],
    ]);
  });

  test("rejects inconsistent rows", () => {
    const header =
      "label_ref,organization_label,category_codes,category_en,category_zh,confidence,basis";
    const row = (...cells: string[]) => [header, cells.join(",")].join("\n");
    expect(() =>
      buildIndustries(row("L1", "A", "BNK;UNK", "Bank; Unclassified", "銀; 未", "H", "x")),
    ).toThrow("Unclassified cannot be combined");
    expect(() => buildIndustries(row("L1", "A", "BNK;INS", "Bank", "銀", "H", "x"))).toThrow(
      "do not match",
    );
    expect(() =>
      buildIndustries(
        `${row("L1", "A", "BNK", "Bank", "銀", "H", "x")}\n${"L2,A,BNK,Bank,銀,H,x"}`,
      ),
    ).toThrow("duplicate label");
    expect(() =>
      buildIndustries(`${row("L1", "A", "BNK", "Bank", "銀", "H", "x")}\nL2,B,BNK,Banks,銀,H,x`),
    ).toThrow("inconsistent names");
    expect(() => buildIndustries("wrong,header\n")).toThrow("Unexpected industry CSV header");
  });
});
