import type { IndustryData } from "../src/types";

export const UNCLASSIFIED = "UNK";
const UNCLASSIFIED_NAMES = { en: "Unclassified", "zh-Hant": "未能分類" };
const HEADER = [
  "label_ref",
  "organization_label",
  "category_codes",
  "category_en",
  "category_zh",
  "confidence",
  "basis",
];

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  const source = text.replace(/^﻿/, "");
  for (let index = 0; index < source.length; index++) {
    const char = source[index];
    if (quoted) {
      if (char !== '"') field += char;
      else if (source[index + 1] === '"') field += source[++index];
      else quoted = false;
    } else if (char === '"') quoted = true;
    else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && source[index + 1] === "\n") index++;
      row.push(field);
      field = "";
      rows.push(row);
      row = [];
    } else field += char;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

// Reviewed CSV -> compact lookup shipped with the app. Fails on any inconsistency.
export function buildIndustries(csv: string): IndustryData {
  const [header, ...rows] = parseCsv(csv);
  if (header?.join() !== HEADER.join()) throw new Error("Unexpected industry CSV header");
  const names = new Map<string, { en: string; "zh-Hant": string }>([
    [UNCLASSIFIED, UNCLASSIFIED_NAMES],
  ]);
  const labels: Record<string, string[]> = {};
  for (const row of rows) {
    if (row.length !== HEADER.length) throw new Error(`Malformed industry row: ${row.join(",")}`);
    const [, label, codeText, enText, zhText] = row;
    const codes = codeText.split(";");
    const en = enText.split("; ");
    const zh = zhText.split("; ");
    if (!label || label in labels) throw new Error(`Missing or duplicate label: ${label}`);
    if (new Set(codes).size !== codes.length || codes.some((code) => !/^[A-Z]{2,4}$/.test(code)))
      throw new Error(`Invalid category codes for ${label}: ${codeText}`);
    if (codes.includes(UNCLASSIFIED) && codes.length > 1)
      throw new Error(`Unclassified cannot be combined with other categories: ${label}`);
    if (en.length !== codes.length || zh.length !== codes.length)
      throw new Error(`Category names do not match codes for ${label}`);
    codes.forEach((code, position) => {
      const next = { en: en[position], "zh-Hant": zh[position] };
      const known = names.get(code);
      if (known && (known.en !== next.en || known["zh-Hant"] !== next["zh-Hant"]))
        throw new Error(`Category ${code} has inconsistent names`);
      names.set(code, next);
    });
    labels[label] = codes;
  }
  const industries = [...names]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([code, name]) => ({ code, ...name }));
  return { industries, labels };
}
