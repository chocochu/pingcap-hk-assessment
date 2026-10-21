import {
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  createFilteredRowModel,
  createSortedRowModel,
  createPaginatedRowModel,
  createColumnHelper,
  sortFn_text,
  sortFn_basic,
  tableFeatures,
  type FilterFn,
} from "@tanstack/react-table";
import { filterBusinesses } from "../report";
import type { Business, Language, Locale } from "../types";

export const businessFeatures = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
});

export interface BusinessTableRow extends Business {
  displayCategory: string;
}

// Locale changes must replace row data so TanStack invalidates cached accessor values.
export function localizeBusinesses(businesses: Business[], language: Language): BusinessTableRow[] {
  return businesses.map((business) => ({
    ...business,
    displayCategory: business.categories[language],
  }));
}

export const businessFilter: FilterFn<typeof businessFeatures, BusinessTableRow> = (
  row,
  _columnId,
  value,
) => filterBusinesses([row.original], String(value ?? "")).length > 0;

const helper = createColumnHelper<typeof businessFeatures, BusinessTableRow>();
export function businessColumns(copy: Locale["directory"]) {
  return helper.columns([
    helper.accessor("label", { header: copy.headers[0], sortFn: sortFn_text }),
    helper.accessor((row) => Number(row.observations), {
      id: "observations",
      header: copy.headers[1],
      sortFn: sortFn_basic,
      enableGlobalFilter: false,
    }),
    helper.accessor("displayCategory", {
      id: "categories",
      header: copy.headers[2],
      sortFn: sortFn_text,
      enableGlobalFilter: false,
    }),
    helper.accessor("countries", {
      header: copy.headers[3],
      sortFn: sortFn_text,
      enableGlobalFilter: false,
    }),
    helper.accessor("domains", {
      header: copy.headers[4],
      sortFn: sortFn_text,
      enableGlobalFilter: false,
    }),
  ]);
}
