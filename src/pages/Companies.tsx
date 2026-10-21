import { PageFrame } from "../components/layout";
import { Rich } from "../components/rich";
import { useSite } from "../components/site-context";
import { Callout, PageHeader, Pill, Section, StrengthKey, StrengthPill } from "../components/ui";
import { companies } from "../content/companies";
import type { Company } from "../content/companies";
import { evidenceHref } from "../site";

function hostname(url: string): string {
  return new URL(url).hostname.replace(/^www\./, "");
}

function CompanyCard({ company }: { company: Company }) {
  const { language, copy } = useSite();
  const labels = copy.companies.cardLabels;
  const tags = copy.companies.tags;
  const text = company.text[language];
  const kinds = [
    ["billing", tags.billing, company.strength.billing],
    ...(company.records.support && company.strength.support
      ? [["support", tags.support, company.strength.support] as const]
      : []),
    ...(company.records.logs && company.strength.logs
      ? [["logs", tags.logs, company.strength.logs] as const]
      : []),
  ] as const;

  return (
    <article
      id={company.id}
      aria-labelledby={`${company.id}-name`}
      className="scroll-mt-6 rounded-2xl border border-line bg-surface p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 id={`${company.id}-name`} className="text-2xl font-bold break-words">
          {company.name}
        </h3>
        <ul aria-label={labels.records} className="flex flex-wrap gap-2">
          {kinds.map(([key, label]) => (
            <li key={key}>
              <Pill tone="neutral">{label}</Pill>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-5">
          <div>
            <h4 className="font-semibold text-muted">{labels.hk}</h4>
            <p className="mt-1">
              <Rich text={text.hk} />
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-muted">{labels.found}</h4>
            <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-accent">
              {text.found.map((item) => (
                <li key={item}>
                  <Rich text={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-5">
          <div className="rounded-xl bg-warn-bg p-4 text-warn-ink">
            <h4 className="font-semibold">{labels.careful}</h4>
            <p className="mt-1 text-base">
              <Rich text={text.careful} />
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-muted">{labels.sure}</h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {kinds.map(([key, label, level]) => (
                <li key={key}>
                  <StrengthPill level={level} prefix={label} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <details className="mt-6 border-t border-line pt-4 text-base">
        <summary className="font-semibold text-link">{labels.how}</summary>
        <ul className="mt-3 space-y-1">
          {company.sources.map((url) => (
            <li key={url} className="break-all">
              <a href={url} target="_blank" rel="noopener noreferrer">
                {hostname(url)}
                <span className="sr-only"> {copy.common.newTab}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-muted">
          {labels.refs}: {company.refs.join(", ")} (
          <a href={evidenceHref(language, "billing_evidence.csv")}>billing_evidence.csv</a>)
        </p>
      </details>
    </article>
  );
}

export function CompaniesPage() {
  const { copy } = useSite();
  const text = copy.companies;
  return (
    <PageFrame page="companies">
      <PageHeader title={text.title}>
        <div className="mt-5 max-w-3xl space-y-4 text-lg">
          {text.intro.map((paragraph) => (
            <p key={paragraph}>
              <Rich text={paragraph} />
            </p>
          ))}
        </div>
        <div className="mt-6 max-w-3xl">
          <Callout tone="warn">
            <p>
              <Rich text={text.caution} />
            </p>
          </Callout>
        </div>
      </PageHeader>

      <nav aria-label={text.title} className="no-print">
        <ul className="flex flex-wrap gap-2">
          {companies.map((company) => (
            <li key={company.id}>
              <a
                href={`#${company.id}`}
                className="inline-block rounded-full bg-tint px-4 py-1.5 text-base font-semibold no-underline hover:bg-line"
              >
                {company.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8">
        <StrengthKey />
      </div>

      <div className="mt-8 space-y-6">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>

      <Section id="related" title={text.related.title} intro={text.related.intro}>
        <dl className="grid gap-4 md:grid-cols-2">
          {text.related.items.map((item) => (
            <div key={item.name} className="rounded-2xl border border-line bg-surface p-5">
              <dt className="font-bold break-words">{item.name}</dt>
              <dd className="mt-2 text-base text-muted">
                <Rich text={item.body} />
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </PageFrame>
  );
}
