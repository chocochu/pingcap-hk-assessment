import businessData from "../data/businesses.json";
import { companies } from "../content/companies";
import { laterNames } from "../content/later-names";
import type { Business, Language, Localized, Verdict } from "../types";

export interface Entry {
  id: string;
  label: string;
  verdict: Verdict;
  /** How many times the label appears in the screened records. */
  observations?: number;
  /** The original source category, as recorded. */
  category?: Localized;
  countries?: string;
  domains?: string;
  /** A note from a later BigQuery review. */
  later?: Localized;
  /** Anchor on the company findings page, for closely examined companies. */
  findingId?: string;
}

export const businesses = businessData as Business[];

export const fold = (value: string): string => value.normalize("NFKC").toLocaleLowerCase();

/** Strongest kind of record this label appears in. */
export function verdictOf(business: Business): Verdict {
  const category = business.categories.en;
  if (category.includes("financial/business records")) return "account";
  if (category.includes("CRM business records")) return "sales";
  return "marketing";
}

const rank: Record<Verdict, number> = { examined: 0, later: 1, account: 2, sales: 3, marketing: 4 };

function buildEntries(): Entry[] {
  const examined = new Map(companies.map((company) => [fold(company.name), company.id]));
  const later = new Map(laterNames.map((item) => [fold(item.label), item]));
  const used = new Set<string>();

  const fromDirectory = businesses.map<Entry>((business) => {
    const key = fold(business.label);
    const note = later.get(key);
    if (note) used.add(key);
    const findingId = examined.get(key);
    return {
      id: business.label,
      label: business.label,
      verdict: findingId ? "examined" : verdictOf(business),
      observations: Number(business.observations),
      category: business.categories,
      countries: business.countries,
      domains: business.domains,
      later: note?.note,
      findingId,
    };
  });

  const extras = laterNames
    .filter((item) => !used.has(fold(item.label)))
    .map<Entry>((item) => ({
      id: `later:${item.label}`,
      label: item.label,
      verdict: "later",
      later: item.note,
    }));

  return [...fromDirectory, ...extras].sort(
    (a, b) => rank[a.verdict] - rank[b.verdict] || a.label.localeCompare(b.label, "en"),
  );
}

export const entries: Entry[] = buildEntries();

export type Filter = "all" | Verdict;

function haystack(entry: Entry): string {
  return fold(
    [
      entry.label,
      entry.category?.en,
      entry.category?.["zh-Hant"],
      entry.countries,
      entry.domains,
      entry.later?.en,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function matchesFilter(entry: Entry, filter: Filter): boolean {
  if (filter === "all") return true;
  if (filter === "later") return Boolean(entry.later);
  return entry.verdict === filter;
}

export function searchEntries(list: Entry[], query: string, filter: Filter): Entry[] {
  const term = fold(query.trim());
  const matched = list.filter(
    (entry) => matchesFilter(entry, filter) && (!term || haystack(entry).includes(term)),
  );
  if (!term) return matched;
  // Names that start with the search text come first, then the usual order.
  const starts = (entry: Entry) => (fold(entry.label).startsWith(term) ? 0 : 1);
  return [...matched].sort((a, b) => starts(a) - starts(b));
}

export function countByVerdict(list: Entry[]): Record<Verdict, number> {
  const counts: Record<Verdict, number> = {
    examined: 0,
    later: 0,
    account: 0,
    sales: 0,
    marketing: 0,
  };
  for (const entry of list) {
    counts[entry.verdict] += 1;
    if (entry.later && entry.verdict !== "later") counts.later += 1;
  }
  return counts;
}

export function noteFor(entry: Entry, language: Language): string | undefined {
  return entry.later?.[language];
}
