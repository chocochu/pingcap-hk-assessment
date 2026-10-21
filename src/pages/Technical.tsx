import { Download } from "lucide-react";
import { PageFrame } from "../components/layout";
import { Rich } from "../components/rich";
import { useSite } from "../components/site-context";
import { DataTable, PageHeader, Section } from "../components/ui";
import publication from "../data/publication.json";
import { releaseTime } from "../lib/releases";
import { evidenceHref } from "../site";

function extension(file: string): string {
  return file.split(".").pop()!.toUpperCase();
}

export function TechnicalPage() {
  const { language, copy } = useSite();
  const text = copy.technical;
  const labelFor = new Map(
    text.downloads.groups.flatMap((group) => group.files.map((item) => [item.file, item.label])),
  );
  return (
    <PageFrame page="technical">
      <PageHeader title={text.title} lead={<p>{text.intro}</p>} />

      <nav aria-label={text.title} className="no-print">
        <ul className="flex flex-wrap gap-2">
          {[
            ...text.groups.map((group) => ({ id: group.id, title: group.title })),
            { id: "support", title: text.support.title },
            { id: "linkage", title: text.linkage.title },
            { id: "updates", title: text.updates.title },
            { id: "downloads", title: text.downloads.title },
          ].map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="inline-block rounded-full bg-tint px-4 py-1.5 text-base font-semibold no-underline hover:bg-line"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 space-y-6">
        {text.groups.map((group) => (
          <section
            key={group.id}
            id={group.id}
            aria-labelledby={`${group.id}-title`}
            className="scroll-mt-6 rounded-2xl border border-line bg-surface p-6 sm:p-8"
          >
            <h2 id={`${group.id}-title`} className="text-2xl">
              {group.title}
            </h2>
            <p className="mt-2 max-w-3xl text-muted">
              <Rich text={group.summary} />
            </p>
            <ul className="mt-4 max-w-3xl list-disc space-y-3 pl-5 marker:text-accent">
              {group.points.map((point) => (
                <li key={point}>
                  <Rich text={point} />
                </li>
              ))}
            </ul>
            <ul className="mt-5 flex flex-wrap gap-2 text-sm">
              {group.files.map((file) => (
                <li key={file}>
                  <a
                    href={evidenceHref(language, file)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-tint px-3 py-1 font-semibold no-underline hover:bg-line"
                  >
                    <Download aria-hidden="true" className="size-3.5" />
                    {labelFor.get(file)}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <Section id="support" title={text.support.title}>
        <p className="mb-4 max-w-3xl">
          <Rich text={text.support.body} />
        </p>
        <DataTable
          caption={text.support.title}
          headers={text.support.headers}
          rows={text.support.rows}
        />
      </Section>

      <Section id="linkage" title={text.linkage.title}>
        <p className="mb-4 max-w-3xl">
          <Rich text={text.linkage.body} />
        </p>
        <DataTable
          caption={text.linkage.title}
          headers={text.linkage.headers}
          rows={text.linkage.rows}
        />
        <p className="mt-4 max-w-3xl text-base text-muted">
          <Rich text={text.linkage.note} />
        </p>
      </Section>

      <Section id="updates" title={text.updates.title} intro={<Rich text={text.updates.intro} />}>
        <ol className="max-w-3xl space-y-4">
          {publication.history.map((entry) => (
            <li key={entry.version} className="border-l-4 border-accent pl-4">
              <p className="font-semibold">
                {entry.version} · {releaseTime(entry.preparedAt)}
              </p>
              <p className="text-base text-muted">{entry.summary[language]}</p>
            </li>
          ))}
          <li className="border-l-4 border-line pl-4">
            <p className="font-semibold">{text.updates.earlier.title}</p>
            <p className="text-base text-muted">
              <Rich text={text.updates.earlier.body} />
            </p>
          </li>
        </ol>
      </Section>

      <Section
        id="downloads"
        title={text.downloads.title}
        intro={<Rich text={text.downloads.intro} />}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {text.downloads.groups.map((group) => (
            <section
              key={group.title}
              aria-labelledby={`dl-${group.title}`}
              className="rounded-2xl border border-line bg-surface p-5"
            >
              <h3 id={`dl-${group.title}`} className="text-lg font-bold">
                {group.title}
              </h3>
              <ul className="mt-3 divide-y divide-line">
                {group.files.map((item) => (
                  <li key={item.file} className="flex items-baseline justify-between gap-3 py-2">
                    <a href={evidenceHref(language, item.file)} className="text-base">
                      {item.label}
                    </a>
                    <span className="shrink-0 rounded bg-neutral-bg px-1.5 py-0.5 font-mono text-xs text-neutral-ink">
                      {extension(item.file)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Section>
    </PageFrame>
  );
}
