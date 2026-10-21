import { useMemo } from "react";
import { useTable } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  businessColumns,
  businessFeatures,
  businessFilter,
  localizeBusinesses,
} from "@/lib/business-table";
import { report } from "../report";
import type { Language, Locale } from "../types";

interface Props {
  language: Language;
  copy: Locale["directory"];
  query: string;
  onQueryChange: (value: string) => void;
}

export function BusinessDirectory({ language, copy, query, onQueryChange }: Props) {
  const columns = useMemo(() => businessColumns(copy), [copy]);
  const data = useMemo(() => localizeBusinesses(report.businesses, language), [language]);
  const table = useTable({
    features: businessFeatures,
    data,
    columns,
    getRowId: (row) => row.label,
    state: { globalFilter: query },
    globalFilterFn: businessFilter,
    initialState: { pagination: { pageIndex: 0, pageSize: 50 } },
    autoResetPageIndex: false,
    enableMultiSort: false,
  });
  const zh = language === "zh-Hant";
  const rows = table.getRowModel().rows;
  const matched = table.getFilteredRowModel().rows.length;
  const { pageIndex, pageSize } = table.state.pagination;
  const pages = Math.max(1, table.getPageCount());
  const first = matched === 0 ? 0 : pageIndex * pageSize + 1;
  const last = Math.min((pageIndex + 1) * pageSize, matched);
  const count = zh
    ? `共 ${report.businesses.length} 個名稱，符合 ${matched} 個；顯示 ${first}–${last} 個`
    : `${matched} of ${report.businesses.length} labels · Showing ${first}–${last}`;

  function search(value: string) {
    onQueryChange(value);
    table.setPageIndex(0);
  }

  return (
    <div className="directory mt-6">
      <FieldGroup className="directory-controls max-w-3xl">
        <Field>
          <FieldLabel htmlFor="company-search">{copy.label}</FieldLabel>
          <div className="flex items-center gap-3">
            <Input
              id="company-search"
              type="search"
              placeholder={copy.placeholder}
              value={query}
              onChange={(event) => search(event.target.value)}
              aria-describedby="search-results"
            />
            <Button variant="outline" onClick={() => search("")} disabled={!query}>
              {zh ? "清除" : "Clear"}
            </Button>
          </div>
        </Field>
      </FieldGroup>
      <div className="my-4 flex flex-wrap items-center justify-between gap-4">
        <output
          id="search-results"
          htmlFor="company-search"
          aria-live="polite"
          className="text-sm text-muted-foreground"
        >
          {count}
        </output>
        <FieldGroup className="directory-controls w-56 max-w-full shrink-0">
          <Field orientation="horizontal">
            <FieldLabel htmlFor="page-size">{zh ? "每頁顯示" : "Rows per page"}</FieldLabel>
            <NativeSelect
              className="w-20 shrink-0"
              id="page-size"
              value={pageSize}
              onChange={(event) => {
                table.setPageSize(Number(event.target.value));
                table.setPageIndex(0);
              }}
            >
              {[25, 50, 100].map((size) => (
                <NativeSelectOption key={size} value={size}>
                  {size}
                </NativeSelectOption>
              ))}
              <NativeSelectOption value={report.businesses.length}>
                {zh ? "全部" : "All"}
              </NativeSelectOption>
            </NativeSelect>
          </Field>
        </FieldGroup>
      </div>
      <section
        className="overflow-hidden rounded-lg border bg-card"
        aria-label={zh ? "公司名稱搜尋結果" : "Company search results"}
      >
        <Table className="business-table min-w-3xl">
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  const Icon =
                    sorted === "asc" ? ArrowUp : sorted === "desc" ? ArrowDown : ArrowUpDown;
                  return (
                    <TableHead
                      key={header.id}
                      scope="col"
                      aria-sort={
                        sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : "none"
                      }
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          header.column.toggleSorting();
                          table.setPageIndex(0);
                        }}
                      >
                        <table.FlexRender header={header} />
                        <Icon data-icon="inline-end" aria-hidden="true" />
                      </Button>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {row.getAllCells().map((cell) => (
                  <TableCell key={cell.id} className="max-w-sm whitespace-normal align-top py-3">
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {rows.length === 0 && (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>{zh ? "找不到相符紀錄" : "No matching records"}</EmptyTitle>
              <EmptyDescription>
                {zh
                  ? "請嘗試其他名稱、網域或紀錄類別。"
                  : "Try another name, domain or record category."}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </section>
      <nav
        className="directory-pagination mt-4 flex flex-wrap items-center justify-between gap-4"
        aria-label={zh ? "目錄分頁" : "Directory pagination"}
      >
        <span className="text-sm text-muted-foreground">
          {zh ? `第 ${pageIndex + 1} / ${pages} 頁` : `Page ${pageIndex + 1} of ${pages}`}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            {zh ? "上一頁" : "Previous"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            {zh ? "下一頁" : "Next"}
          </Button>
        </div>
      </nav>
    </div>
  );
}
