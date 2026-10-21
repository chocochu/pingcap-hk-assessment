import {
  Activity,
  CircleX,
  FileCode,
  KeyRound,
  LifeBuoy,
  Receipt,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { PageFrame } from "../components/layout";
import { Rich } from "../components/rich";
import { useSite } from "../components/site-context";
import { Callout, PageHeader, PageLink, Section } from "../components/ui";
import publication from "../data/publication.json";
import { releaseDate } from "../lib/releases";
import { pageHref } from "../site";

const icons: Record<string, ReactNode> = {
  receipt: <Receipt aria-hidden="true" className="size-6" />,
  support: <LifeBuoy aria-hidden="true" className="size-6" />,
  logs: <Activity aria-hidden="true" className="size-6" />,
  key: <KeyRound aria-hidden="true" className="size-6" />,
  people: <Users aria-hidden="true" className="size-6" />,
  code: <FileCode aria-hidden="true" className="size-6" />,
};

const button =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-lg font-semibold no-underline";

export function Home() {
  const { language, copy } = useSite();
  const home = copy.home;
  return (
    <PageFrame page="home">
      <PageHeader
        eyebrow={home.eyebrow(releaseDate(publication.preparedAt, language))}
        title={home.title}
        lead={<p>{home.deck}</p>}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={pageHref(language, "search")}
            className={`${button} bg-accent text-accent-ink hover:opacity-90`}
          >
            <Search aria-hidden="true" className="size-5" />
            {home.ctaSearch}
          </a>
          <a
            href="#what-to-do"
            className={`${button} border-2 border-accent text-accent hover:bg-tint`}
          >
            {home.ctaAction}
          </a>
        </div>
      </PageHeader>

      <section aria-label={home.answer.title} className="pt-6">
        <Callout tone="info">
          <h2 className="font-serif text-2xl font-bold">{home.answer.title}</h2>
          <p className="mt-2 max-w-3xl text-lg leading-relaxed">
            <Rich text={home.answer.body} />
          </p>
          <p className="mt-2">
            <a href="#found" className="font-semibold underline">
              {home.answer.cta}
            </a>
          </p>
        </Callout>
      </section>

      <section aria-labelledby="brief-title" className="py-6">
        <h2 id="brief-title" className="sr-only">
          {home.brief.title}
        </h2>
        <ol className="grid gap-4 md:grid-cols-2">
          {home.brief.items.map((item, index) => (
            <li key={item.title} className="rounded-2xl border border-line bg-surface p-6">
              <span
                aria-hidden="true"
                className="flex size-9 items-center justify-center rounded-full bg-accent font-serif text-lg font-bold text-accent-ink"
              >
                {index + 1}
              </span>
              <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-base leading-relaxed">
                <Rich text={item.body} />
              </p>
            </li>
          ))}
        </ol>
      </section>

      <Section id="numbers" title={home.numbers.title}>
        <dl className="grid gap-4 md:grid-cols-3">
          {home.numbers.tiles.map((tile) => (
            <div key={tile.label} className="rounded-2xl bg-tint p-6">
              <dd className="font-serif text-5xl leading-none font-bold text-accent">
                {tile.value}
              </dd>
              <dt className="mt-2 text-lg font-semibold">{tile.label}</dt>
              <dd className="mt-2 text-base text-muted">
                <Rich text={tile.note} />
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 max-w-3xl text-base text-muted">
          <Rich text={home.numbers.caveat} />
        </p>
      </Section>

      <Section id="found" title={home.found.title} intro={home.found.intro}>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {home.found.cards.map((card) => (
            <li
              key={card.title}
              className="flex flex-col rounded-2xl border border-line bg-surface p-6"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-tint text-accent">
                {icons[card.icon]}
              </span>
              <h3 className="mt-4 text-xl font-bold">{card.title}</h3>
              <p className="mt-2 flex-1 text-base leading-relaxed">
                <Rich text={card.body} />
              </p>
              <PageLink page={card.page} hash={card.hash} className="mt-4 text-base">
                {card.cta}
              </PageLink>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="not-mean" title={home.notMean.title}>
        <div className="rounded-2xl bg-warn-bg p-6 text-warn-ink sm:p-8">
          <ul className="space-y-4">
            {home.notMean.items.map((item) => (
              <li key={item} className="flex gap-3">
                <CircleX aria-hidden="true" className="mt-1 size-5 shrink-0" />
                <p className="max-w-3xl">
                  <Rich text={item} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="what-to-do" title={home.action.title} intro={home.action.intro}>
        <div className="grid gap-4 lg:grid-cols-3">
          {home.action.groups.map((group, index) => (
            <section
              key={group.title}
              aria-labelledby={`action-${index}-title`}
              className="rounded-2xl border border-line bg-surface p-6"
            >
              <h3 id={`action-${index}-title`} className="text-xl font-bold">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.steps.map((step) => (
                  <li key={step} className="flex gap-3">
                    <ShieldCheck aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" />
                    <p className="text-base leading-relaxed">
                      <Rich text={step} />
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="mt-4 max-w-3xl text-base text-muted">
          <Rich text={home.action.note} />
        </p>
      </Section>

      <section aria-labelledby="background-title" className="py-6">
        <details className="rounded-2xl border border-line bg-surface p-6">
          <summary id="background-title" className="text-xl font-bold">
            {home.background.title}
          </summary>
          <div className="mt-4 max-w-3xl space-y-4">
            {home.background.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <Rich text={paragraph} />
              </p>
            ))}
          </div>
        </details>
      </section>

      <Section id="next" title={home.next.title}>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {home.next.cards.map((card) => (
            <li key={card.title} className="rounded-2xl border border-line bg-surface p-6">
              <h3 className="text-lg font-bold">{card.title}</h3>
              <p className="mt-2 text-base text-muted">
                <Rich text={card.body} />
              </p>
              <PageLink page={card.page} className="mt-3 text-base">
                {copy.nav[card.page]}
              </PageLink>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Callout tone="neutral">
            <Rich text={copy.footer.lines[1]} />
          </Callout>
        </div>
      </Section>
    </PageFrame>
  );
}
