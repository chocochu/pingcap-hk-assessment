import { CircleCheck, CircleDashed, CircleDot } from "lucide-react";
import { PageFrame } from "../components/layout";
import { Rich } from "../components/rich";
import { useSite } from "../components/site-context";
import { PageHeader, Pill, Section, StrengthKey } from "../components/ui";
import { facts } from "../content/facts";

const statusTone = { done: "strong", partial: "warn", none: "neutral" } as const;
const statusIcon = {
  done: <CircleCheck aria-hidden="true" className="size-4" />,
  partial: <CircleDot aria-hidden="true" className="size-4" />,
  none: <CircleDashed aria-hidden="true" className="size-4" />,
};

export function CoveragePage() {
  const { copy } = useSite();
  const text = copy.coverage;
  const percent = (facts.bqTablesReviewed / facts.bqTables) * 100;
  return (
    <PageFrame page="coverage">
      <PageHeader title={text.title} lead={<p>{text.intro}</p>} />

      <Section id="picture" title={text.picture.title} className="pt-2">
        <dl className="grid gap-4 md:grid-cols-3">
          {text.picture.tiles.map((tile) => (
            <div key={tile.label} className="rounded-2xl bg-tint p-6">
              <dd className="font-serif text-4xl leading-none font-bold text-accent sm:text-5xl">
                {tile.value}
              </dd>
              <dt className="mt-2 text-lg font-semibold">{tile.label}</dt>
              <dd className="mt-2 text-base text-muted">
                <Rich text={tile.note} />
              </dd>
            </div>
          ))}
        </dl>
        <figure className="mt-6 rounded-2xl border border-line bg-surface p-6">
          <figcaption className="font-semibold">{text.picture.barLabel}</figcaption>
          <div aria-hidden="true" className="mt-3 h-5 overflow-hidden rounded-full bg-neutral-bg">
            <div
              className="h-full min-w-1.5 rounded-full bg-accent"
              style={{ width: `${percent.toFixed(2)}%` }}
            />
          </div>
          <p className="mt-3 text-base text-muted">
            <Rich text={text.picture.barNote} />
          </p>
        </figure>
      </Section>

      <Section id="looked" title={text.looked.title} intro={text.looked.intro}>
        <ul className="space-y-4">
          {text.looked.items.map((item) => (
            <li key={item.title} className="rounded-2xl border border-line bg-surface p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <Pill tone={statusTone[item.status]} icon={statusIcon[item.status]}>
                  {text.looked.status[item.status]}
                </Pill>
              </div>
              <p className="mt-2 max-w-3xl">
                <Rich text={item.body} />
              </p>
              <p className="mt-2 max-w-3xl text-base text-muted">
                <strong>{text.looked.limitLabel}</strong> <Rich text={item.limit} />
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="sure" title={text.sure.title} intro={<Rich text={text.sure.intro} />}>
        <StrengthKey title={false} />
      </Section>

      <Section id="add" title={text.add.title}>
        <div className="max-w-3xl space-y-4">
          {text.add.body.map((paragraph) => (
            <p key={paragraph}>
              <Rich text={paragraph} />
            </p>
          ))}
        </div>
      </Section>

      <Section id="did-not" title={text.didNot.title}>
        <ul className="max-w-3xl space-y-3">
          {text.didNot.items.map((item) => (
            <li key={item} className="rounded-xl bg-tint p-4">
              <Rich text={item} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="glossary" title={text.glossary.title}>
        <dl className="grid gap-x-8 gap-y-5 md:grid-cols-2">
          {text.glossary.terms.map((entry) => (
            <div key={entry.term} className="border-t border-line pt-3">
              <dt className="font-bold">{entry.term}</dt>
              <dd className="mt-1 text-base text-muted">
                <Rich text={entry.meaning} />
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </PageFrame>
  );
}
