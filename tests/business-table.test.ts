import { describe, expect, test } from "bun:test";
import { constructTable, tableFeatures } from "@tanstack/react-table";
import { storeReactivityBindings } from "@tanstack/table-core/store-reactivity-bindings";
import {
  businessColumns,
  businessFeatures,
  businessFilter,
  localizeBusinesses,
} from "../src/lib/business-table";
import { report } from "../src/report";
import type { Business, Language } from "../src/types";

const businesses: Business[] = [
  {
    label: "Harbour Shop",
    observations: "10",
    categories: { en: "Billing account", "zh-Hant": "帳單帳戶" },
    countries: "Hong Kong",
    domains: "harbour.example",
  },
  {
    label: "Mountain Labs",
    observations: 2,
    categories: { en: "Support contact", "zh-Hant": "支援聯絡人" },
    countries: "Japan",
    domains: "mountain.example",
  },
  {
    label: "River Trading",
    observations: "100",
    categories: { en: "Billing account", "zh-Hant": "帳單帳戶" },
    countries: "Singapore",
    domains: "river.example",
  },
];

function createTable(data = businesses, language: Language = "en", pageSize = 25) {
  return constructTable({
    features: tableFeatures({
      ...businessFeatures,
      coreReactivityFeature: storeReactivityBindings(),
    }),
    data: localizeBusinesses(data, language),
    columns: businessColumns(report.locales[language].directory),
    getRowId: (row) => row.label,
    initialState: {
      globalFilter: "",
      sorting: [],
      pagination: { pageIndex: 0, pageSize },
    },
    autoResetPageIndex: false,
    globalFilterFn: businessFilter,
  });
}

function paginatedBusinesses(): Business[] {
  return Array.from({ length: 53 }, (_, index) => ({
    ...businesses[0],
    label: `Business ${index + 1}`,
    observations: index + 1,
  }));
}

describe("business table row models", () => {
  test("searches both category languages and normalizes full-width input in either edition", () => {
    for (const language of ["en", "zh-Hant"] as const) {
      const table = createTable(businesses, language);
      const cases: [string, string[]][] = [
        ["  ＨＡＲＢＯＵＲ  ", ["Harbour Shop"]],
        ["帳單帳戶", ["Harbour Shop", "River Trading"]],
        ["BILLING ACCOUNT", ["Harbour Shop", "River Trading"]],
        ["支援聯絡人", ["Mountain Labs"]],
        ["ＭＯＵＮＴＡＩＮ．ＥＸＡＭＰＬＥ", ["Mountain Labs"]],
        ["singapore", ["River Trading"]],
        ["   ", businesses.map((business) => business.label)],
      ];
      for (const [query, labels] of cases) {
        table.setGlobalFilter(query);
        expect(table.getRowModel().rows.map((row) => row.original.label)).toEqual(labels);
      }
    }
  });

  test("sorts mixed string and number observation counts numerically before pagination", () => {
    const table = createTable(businesses, "en", 2);
    table.setSorting([{ id: "observations", desc: false }]);
    expect(table.getRowModel().rows.map((row) => row.original.label)).toEqual([
      "Mountain Labs",
      "Harbour Shop",
    ]);
    table.nextPage();
    expect(table.getRowModel().rows.map((row) => row.original.label)).toEqual(["River Trading"]);
    table.setSorting([{ id: "observations", desc: true }]);
    table.setPageIndex(0);
    expect(table.getRowModel().rows.map((row) => row.original.label)).toEqual([
      "River Trading",
      "Harbour Shop",
    ]);
    expect(businesses.map((business) => business.observations)).toEqual(["10", 2, "100"]);
  });

  test("changing locale refreshes cached category cells and sorting without resetting table state", () => {
    const data: Business[] = [
      { ...businesses[0], countries: "Hong Kong" },
      { ...businesses[1], countries: "Hong Kong" },
      {
        ...businesses[2],
        countries: "Hong Kong",
        categories: { en: "Customer account", "zh-Hant": "客戶帳戶" },
      },
      { ...businesses[0], label: "Excluded business", countries: "Japan" },
    ];
    const table = createTable(data, "en", 1);
    table.setGlobalFilter("Hong Kong");
    table.setSorting([{ id: "categories", desc: false }]);
    table.setPageIndex(1);

    // Read every cell before switching so the test exercises populated accessor caches.
    expect(table.getCoreRowModel().rows.map((row) => row.getAllCells()[2].getValue())).toEqual([
      "Billing account",
      "Support contact",
      "Customer account",
      "Billing account",
    ]);
    expect(table.getSortedRowModel().rows.map((row) => row.original.label)).toEqual([
      "Harbour Shop",
      "River Trading",
      "Mountain Labs",
    ]);
    expect(table.getRowModel().rows[0].getAllCells()[2].getValue()).toBe("Customer account");
    const stateBefore = table.store.get();

    table.setOptions((options) => ({
      ...options,
      data: localizeBusinesses(data, "zh-Hant"),
      columns: businessColumns(report.locales["zh-Hant"].directory),
    }));

    expect(table.getCoreRowModel().rows.map((row) => row.getAllCells()[2].getValue())).toEqual([
      "帳單帳戶",
      "支援聯絡人",
      "客戶帳戶",
      "帳單帳戶",
    ]);
    expect(table.getSortedRowModel().rows.map((row) => row.original.label)).toEqual([
      "River Trading",
      "Harbour Shop",
      "Mountain Labs",
    ]);
    expect(table.getRowModel().rows).toHaveLength(1);
    expect(table.getRowModel().rows[0].original.label).toBe("Harbour Shop");
    expect(table.getRowModel().rows[0].getAllCells()[2].getValue()).toBe("帳單帳戶");
    expect(table.store.get().pagination).toEqual(stateBefore.pagination);
    expect(table.store.get().sorting).toEqual(stateBefore.sorting);
    expect(table.store.get().globalFilter).toBe("Hong Kong");
    expect(table.getFilteredRowModel().rows).toHaveLength(3);
    expect(table.getPageCount()).toBe(3);

    table.setOptions((options) => ({
      ...options,
      data: localizeBusinesses(data, "en"),
      columns: businessColumns(report.locales.en.directory),
    }));
    expect(table.getRowModel().rows[0].original.label).toBe("River Trading");
    expect(table.getRowModel().rows[0].getAllCells()[2].getValue()).toBe("Customer account");
    expect(table.store.get().pagination).toEqual({ pageIndex: 1, pageSize: 1 });
  });

  test("visits every row once across a partial final page and exposes navigation boundaries", () => {
    const data = paginatedBusinesses();
    const table = createTable(data);
    expect(table.getPageCount()).toBe(3);
    expect(table.getCanPreviousPage()).toBe(false);
    table.previousPage();
    expect(table.store.get().pagination.pageIndex).toBe(0);
    const visited: string[] = [];
    for (const count of [25, 25, 3]) {
      const rows = table.getRowModel().rows;
      expect(rows).toHaveLength(count);
      visited.push(...rows.map((row) => row.original.label));
      if (table.getCanNextPage()) table.nextPage();
    }
    expect(visited).toEqual(data.map((business) => business.label));
    expect(table.store.get().pagination.pageIndex).toBe(2);
    expect(table.getCanNextPage()).toBe(false);
    expect(table.getCanPreviousPage()).toBe(true);
    table.previousPage();
    expect(table.getRowModel().rows[0].original.label).toBe("Business 26");
  });

  test("filtering from a later page recovers after the directory resets the page, including zero matches", () => {
    const table = createTable(paginatedBusinesses());
    table.setPageIndex(2);
    table.setGlobalFilter("Business 53");
    table.setPageIndex(0);
    expect(table.getFilteredRowModel().rows).toHaveLength(1);
    expect(table.getRowModel().rows.map((row) => row.original.label)).toEqual(["Business 53"]);
    expect(table.getPageCount()).toBe(1);
    expect(table.getCanNextPage()).toBe(false);

    table.setGlobalFilter("no-matching-business");
    expect(table.getFilteredRowModel().rows).toHaveLength(0);
    expect(table.getRowModel().rows).toHaveLength(0);
    expect(table.getPageCount()).toBe(0);
    expect(table.getCanPreviousPage()).toBe(false);
    expect(table.getCanNextPage()).toBe(false);

    table.setGlobalFilter("");
    expect(table.getFilteredRowModel().rows).toHaveLength(53);
    expect(table.getRowModel().rows).toHaveLength(25);
    expect(table.getCanNextPage()).toBe(true);
  });

  test("page-size choices and All expose the expected rows after returning to the first page", () => {
    const data = paginatedBusinesses();
    const table = createTable(data);
    table.setPageIndex(2);
    for (const size of [50, 100, data.length, 25]) {
      table.setPageSize(size);
      table.setPageIndex(0);
      expect(table.store.get().pagination).toEqual({ pageIndex: 0, pageSize: size });
      expect(table.getRowModel().rows.map((row) => row.original.label)).toEqual(
        data.slice(0, size).map((business) => business.label),
      );
      expect(table.getPageCount()).toBe(Math.ceil(data.length / size));
      expect(table.getCanNextPage()).toBe(size < data.length);
    }
  });
});
