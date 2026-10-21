import { describe, expect, test } from "bun:test";
import { countByVerdict, entries, searchEntries, verdictOf } from "../src/lib/search";
import type { Business } from "../src/types";

const business = (en: string): Business => ({
  label: "X",
  observations: 1,
  categories: { en, "zh-Hant": "" },
  countries: "",
  domains: "",
});

describe("verdicts", () => {
  test("rank the strongest kind of record", () => {
    expect(verdictOf(business("marketing/lead/campaign records"))).toBe("marketing");
    expect(verdictOf(business("CRM business records; marketing/lead/campaign records"))).toBe(
      "sales",
    );
    expect(
      verdictOf(
        business(
          "CRM business records; financial/business records; marketing/lead/campaign records",
        ),
      ),
    ).toBe("account");
    expect(verdictOf(business("financial/business records"))).toBe("account");
  });

  test("the nine examined companies come first and link to their finding", () => {
    expect(entries.slice(0, 9).every((e) => e.verdict === "examined" && e.findingId)).toBe(true);
    expect(countByVerdict(entries).examined).toBe(9);
  });
});

describe("search", () => {
  test("matches names, full-width text, Chinese and domains", () => {
    expect(
      searchEntries(entries, "klook", "all").some((e) => e.label.toLowerCase() === "klook"),
    ).toBe(true);
    expect(
      searchEntries(entries, "ＫＬＯＯＫ", "all").some((e) => e.label.toLowerCase() === "klook"),
    ).toBe(true);
    expect(searchEntries(entries, "中信", "all").length).toBeGreaterThan(0);
    expect(searchEntries(entries, "zzzz-no-such-company", "all")).toEqual([]);
  });

  test("names that start with the query come first", () => {
    const result = searchEntries(entries, "mega", "all");
    expect(result[0].label.toLowerCase().startsWith("mega")).toBe(true);
  });

  test("filters narrow results, and the later filter includes merged notes", () => {
    const later = searchEntries(entries, "", "later");
    expect(later.every((e) => e.later)).toBe(true);
    expect(later.some((e) => e.label === "AmberGroup")).toBe(true);
    expect(later.some((e) => e.label === "FWD GROUP MANAGEMENT HOLDINGS LIMITED")).toBe(true);
    const marketing = searchEntries(entries, "", "marketing");
    expect(marketing.every((e) => e.verdict === "marketing")).toBe(true);
  });

  test("surrounding spaces are ignored", () => {
    expect(searchEntries(entries, "  klook  ", "all").length).toBe(
      searchEntries(entries, "klook", "all").length,
    );
  });

  test("industry filter matches any selected industry and combines with search and record type", () => {
    const labels = (list: typeof entries) => list.map((entry) => entry.label);
    const insurance = searchEntries(entries, "", "all", ["INS"]);
    expect(insurance.every((entry) => entry.industries.includes("INS"))).toBe(true);
    expect(labels(insurance)).toContain("Fubon Financial Holding Co., Ltd.");

    const either = searchEntries(entries, "", "all", ["INS", "REP"]);
    expect(either.length).toBeGreaterThan(insurance.length);
    expect(labels(either)).toContain("Sun Hung Kai Properties Limited");

    expect(labels(searchEntries(entries, "fubon", "all", ["INS"]))).toEqual([
      "Fubon Financial Holding Co., Ltd.",
      "Fubon Life Insurance Co Ltd",
    ]);
    expect(searchEntries(entries, "", "later", ["REP"]).every((entry) => entry.later)).toBe(true);
    expect(searchEntries(entries, "", "all", [])).toEqual(searchEntries(entries, "", "all"));
  });

  test("names added after the classification was reviewed stay searchable as Unclassified", () => {
    const entry = entries.find((item) => item.label === "Neat Limited");
    expect(entry?.industries).toEqual(["UNK"]);
  });
});
