import { Search as SearchIcon, X } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { PageFrame } from "../components/layout";
import { IndustryIcon, VerdictIcon } from "../components/icons";
import { Rich } from "../components/rich";
import { useSite } from "../components/site-context";
import { Callout, PageHeader, PageLink, VerdictPill } from "../components/ui";
import { countIndustries, industryName, industryNames } from "../lib/industries";
import { cn } from "../lib/utils";
import { countByVerdict, entries, noteFor, searchEntries } from "../lib/search";
import type { Entry, Filter } from "../lib/search";
import type { Verdict } from "../types";

const PAGE_SIZE = 20;
const filterOrder: Filter[] = ["all", "examined", "account", "sales", "marketing", "later"];

function ResultCard({ entry }: { entry: Entry }) {
  const { language, copy } = useSite();
  const text = copy.search;
  const note = noteFor(entry, language);
  return (
    <li className="rounded-2xl border border-line bg-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <h3 className="min-w-0 text-lg font-bold break-words">{entry.label}</h3>
        <VerdictPill verdict={entry.verdict} />
      </div>
      <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-base text-muted">
        {entry.industries.map((code) => (
          <li key={code} className="inline-flex items-center gap-1.5">
            <IndustryIcon code={code} />
            {industryName(code, language)}
          </li>
        ))}
      </ul>
      {entry.verdict === "examined" && (
        <p className="mt-2 text-base text-muted">{text.verdicts.examined.text}</p>
      )}
      {note && (
        <p className="mt-3 rounded-xl bg-info-bg p-3 text-base text-info-ink">
          <strong>{text.later}: </strong>
          {note}
        </p>
      )}
      {entry.findingId && (
        <p className="mt-3">
          <PageLink page="companies" hash={entry.findingId} className="text-base">
            {text.readFinding}
          </PageLink>
        </p>
      )}
      <details className="mt-3 text-base">
        <summary className="font-semibold text-link">{text.details.toggle}</summary>
        <div className="mt-2 space-y-2 text-muted">
          <p>{text.verdicts[entry.verdict].text}</p>
          {entry.observations !== undefined && <p>{text.details.seen(entry.observations)}</p>}
          <p>
            <strong>{text.industry.detail}:</strong> {industryNames(entry.industries, language)}
          </p>
          {entry.category && (
            <p>
              <strong>{text.details.category}:</strong> {entry.category[language]}
            </p>
          )}
          {entry.countries !== undefined && (
            <p>
              <strong>{text.details.countries}:</strong>{" "}
              {entry.countries || text.details.noneRecorded}
            </p>
          )}
          {entry.domains !== undefined && (
            <p className="break-words">
              <strong>{text.details.domains}</strong> ({text.details.domainsNote}):{" "}
              {entry.domains || text.details.noneRecorded}
            </p>
          )}
        </div>
      </details>
    </li>
  );
}

export function SearchPage() {
  const { copy, language } = useSite();
  const text = copy.search;
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [industries, setIndustries] = useState<string[]>([]);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const inputId = useId();
  const countId = useId();

  const counts = useMemo(() => countByVerdict(entries), []);
  const matched = useMemo(
    () => searchEntries(entries, query, filter, industries),
    [query, filter, industries],
  );
  // Counts follow the search and record-type filter, so a chip never promises rows they exclude.
  const industryCounts = useMemo(
    () => countIndustries(searchEntries(entries, query, filter)),
    [query, filter],
  );
  const shown = matched.slice(0, limit);
  const remaining = matched.length - shown.length;

  function update(next: { query?: string; filter?: Filter; industries?: string[] }) {
    if (next.query !== undefined) setQuery(next.query);
    if (next.filter !== undefined) setFilter(next.filter);
    if (next.industries !== undefined) setIndustries(next.industries);
    setLimit(PAGE_SIZE);
  }

  function toggleIndustry(code: string) {
    update({
      industries: industries.includes(code)
        ? industries.filter((item) => item !== code)
        : [...industries, code],
    });
  }

  const total = (value: Filter) => (value === "all" ? entries.length : counts[value as Verdict]);

  return (
    <PageFrame page="search">
      <PageHeader title={text.title} lead={<p>{text.intro(entries.length)}</p>} />

      <div className="rounded-2xl bg-tint p-5 sm:p-6">
        <label htmlFor={inputId} className="block text-lg font-semibold">
          {text.inputLabel}
        </label>
        <div className="mt-2 flex gap-2">
          <div className="relative flex-1">
            <SearchIcon
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted"
            />
            <input
              id={inputId}
              type="search"
              autoComplete="off"
              value={query}
              placeholder={text.placeholder}
              aria-describedby={countId}
              onChange={(event) => update({ query: event.target.value })}
              className="w-full rounded-full border-2 border-accent/40 bg-surface py-3 pr-4 pl-12 text-lg focus:border-accent"
            />
          </div>
          {query && (
            <button
              type="button"
              onClick={() => update({ query: "" })}
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-accent px-5 text-base font-semibold text-accent hover:bg-surface"
            >
              <X aria-hidden="true" className="size-4" />
              {text.clear}
            </button>
          )}
        </div>
        <fieldset className="mt-4">
          <legend className="sr-only">{text.filterLabel}</legend>
          <div className="flex flex-wrap gap-2">
            {filterOrder.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={filter === value}
                onClick={() => update({ filter: value })}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border-2 px-4 py-1.5 text-base font-semibold",
                  filter === value
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-transparent bg-surface text-ink hover:border-accent/40",
                )}
              >
                <VerdictIcon verdict={value} />
                <span>
                  {text.filters[value]}{" "}
                  <span className="tabular-nums opacity-75">{total(value)}</span>
                </span>
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-4">
          <legend className="sr-only">{text.industry.label}</legend>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <p aria-hidden="true" className="text-base font-semibold">
              {text.industry.label}
              <span className="ml-2 font-normal text-muted">{text.industry.hint}</span>
            </p>
            {industries.length > 0 && (
              <button
                type="button"
                onClick={() => update({ industries: [] })}
                className="inline-flex items-center gap-1 text-base font-semibold text-link hover:underline"
              >
                <X aria-hidden="true" className="size-4" />
                {text.industry.clear}
              </button>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {industryCounts.map(({ code, count }) => {
              const selected = industries.includes(code);
              return (
                <button
                  key={code}
                  type="button"
                  aria-pressed={selected}
                  disabled={count === 0 && !selected}
                  onClick={() => toggleIndustry(code)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border-2 px-4 py-1.5 text-base font-semibold disabled:opacity-40",
                    selected
                      ? "border-accent bg-accent text-accent-ink"
                      : "border-transparent bg-surface text-ink enabled:hover:border-accent/40",
                  )}
                >
                  <IndustryIcon code={code} />
                  <span>
                    {industryName(code, language)}{" "}
                    <span className="tabular-nums opacity-75">{count}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-base text-muted">{text.industry.note}</p>
        </fieldset>
      </div>

      <div className="mt-6 space-y-4">
        <Callout title={text.household.title}>
          <p>
            <Rich text={text.household.body} />
          </p>
        </Callout>
        <details className="rounded-2xl border border-line bg-surface p-5">
          <summary className="text-lg font-semibold">{text.legendTitle}</summary>
          <dl className="mt-4 grid gap-4 md:grid-cols-2">
            {(Object.keys(text.verdicts) as Verdict[]).map((verdict) => (
              <div key={verdict}>
                <dt>
                  <VerdictPill verdict={verdict} />
                </dt>
                <dd className="mt-1.5 text-base text-muted">{text.verdicts[verdict].text}</dd>
              </div>
            ))}
          </dl>
        </details>
      </div>

      <output
        id={countId}
        htmlFor={inputId}
        aria-live="polite"
        className="mt-8 mb-3 block text-base font-semibold text-muted"
      >
        {text.count(matched.length, entries.length, shown.length)}
      </output>

      {matched.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center">
          <h2 className="text-2xl">{text.none.title}</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted">
            <Rich text={text.none.body} />
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {shown.map((entry) => (
            <ResultCard key={entry.id} entry={entry} />
          ))}
        </ul>
      )}

      {remaining > 0 && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setLimit(limit + PAGE_SIZE)}
            className="rounded-full border-2 border-accent px-8 py-3 text-lg font-semibold text-accent hover:bg-tint"
          >
            {text.more(Math.min(PAGE_SIZE, remaining))}
          </button>
        </div>
      )}

      <noscript>
        <p className="mt-6 rounded-xl bg-warn-bg p-4 text-warn-ink">
          <Rich text={text.noscript} />
        </p>
      </noscript>
    </PageFrame>
  );
}
