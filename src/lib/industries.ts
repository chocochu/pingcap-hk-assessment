import data from "../data/industries.json";
import type { Business, Industry, IndustryData, Language } from "../types";

export const UNCLASSIFIED = "UNK";
const { industries, labels } = data as IndustryData;
const names = new Map(industries.map((industry) => [industry.code, industry]));

// Labels added by a later release stay visible as Unclassified until they are reviewed.
export function industryCodes(label: string): string[] {
  return labels[label] ?? [UNCLASSIFIED];
}

export function industryName(code: string, language: Language): string {
  return names.get(code)?.[language] ?? code;
}

export function industryNames(codes: string[], language: Language): string {
  return codes.map((code) => industryName(code, language)).join("; ");
}

export interface IndustryCount extends Industry {
  count: number;
}

// Most common first, Unclassified last, so the filter chips read in a stable order.
export function countIndustries(businesses: Business[]): IndustryCount[] {
  const counts = new Map<string, number>();
  for (const business of businesses)
    for (const code of industryCodes(business.label)) counts.set(code, (counts.get(code) ?? 0) + 1);
  return industries
    .map((industry) => ({ ...industry, count: counts.get(industry.code) ?? 0 }))
    .sort(
      (a, b) =>
        Number(a.code === UNCLASSIFIED) - Number(b.code === UNCLASSIFIED) ||
        b.count - a.count ||
        a.code.localeCompare(b.code),
    );
}
