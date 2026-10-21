import {
  ArrowRight,
  CircleCheck,
  CircleHelp,
  CircleMinus,
  Info,
  TriangleAlert,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../lib/utils";
import { pageHref } from "../site";
import type { PageId, Strength, Verdict } from "../types";
import { VerdictIcon } from "./icons";
import { Rich } from "./rich";
import { useSite } from "./site-context";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="pt-10 pb-8 sm:pt-14">
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold tracking-wide text-muted uppercase">{eyebrow}</p>
      )}
      <h1 className="max-w-4xl text-4xl leading-[1.12] sm:text-5xl">{title}</h1>
      {lead && <div className="mt-5 max-w-3xl text-xl leading-relaxed text-ink/90">{lead}</div>}
      {children}
    </div>
  );
}

export function Section({
  id,
  title,
  intro,
  children,
  className,
}: {
  id?: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("py-10 sm:py-12", className)}>
      <h2 id={headingId} className="text-3xl leading-tight sm:text-[2rem]">
        {title}
      </h2>
      {intro && <div className="mt-3 max-w-3xl text-lg text-muted">{intro}</div>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

type Tone = "info" | "warn" | "strong" | "neutral";

const tones: Record<Tone, string> = {
  info: "bg-info-bg text-info-ink",
  warn: "bg-warn-bg text-warn-ink",
  strong: "bg-strong-bg text-strong-ink",
  neutral: "bg-neutral-bg text-neutral-ink",
};

export function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: Tone;
  title?: string;
  children: ReactNode;
}) {
  const Icon = tone === "warn" ? TriangleAlert : Info;
  return (
    <aside className={cn("flex gap-3 rounded-xl p-4 sm:p-5", tones[tone])}>
      <Icon aria-hidden="true" className="mt-1 size-5 shrink-0" />
      <div>
        {title && <p className="font-semibold">{title}</p>}
        <div className="[&_a]:text-current">{children}</div>
      </div>
    </aside>
  );
}

export function Pill({
  tone,
  icon,
  children,
  className,
}: {
  tone: Tone;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

const strengthTone: Record<Strength, Tone> = { strong: "strong", medium: "warn", clue: "neutral" };
const strengthIcon: Record<Strength, ReactNode> = {
  strong: <CircleCheck aria-hidden="true" className="size-4" />,
  medium: <CircleHelp aria-hidden="true" className="size-4" />,
  clue: <CircleMinus aria-hidden="true" className="size-4" />,
};

export function StrengthPill({ level, prefix }: { level: Strength; prefix?: string }) {
  const { copy } = useSite();
  return (
    <Pill tone={strengthTone[level]} icon={strengthIcon[level]}>
      {prefix ? `${prefix}: ` : ""}
      {copy.common.strength.levels[level].label}
    </Pill>
  );
}

export function StrengthKey({ title = true }: { title?: boolean }) {
  const { copy } = useSite();
  const { strength } = copy.common;
  return (
    <div>
      {title && <h3 className="text-xl font-semibold">{strength.title}</h3>}
      <dl className="mt-3 grid gap-3 md:grid-cols-3">
        {(["strong", "medium", "clue"] as Strength[]).map((level) => (
          <div key={level} className="rounded-xl border border-line bg-surface p-4">
            <dt>
              <StrengthPill level={level} />
            </dt>
            <dd className="mt-2 text-base text-muted">{strength.levels[level].text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const verdictTone: Record<Verdict, Tone> = {
  examined: "strong",
  account: "warn",
  sales: "warn",
  marketing: "neutral",
  later: "info",
};

export function VerdictPill({ verdict }: { verdict: Verdict }) {
  const { copy } = useSite();
  return (
    <Pill tone={verdictTone[verdict]} icon={<VerdictIcon verdict={verdict} />}>
      {copy.search.verdicts[verdict].label}
    </Pill>
  );
}

export function PageLink({
  page,
  hash,
  children,
  className,
}: {
  page: PageId;
  hash?: string;
  children: ReactNode;
  className?: string;
}) {
  const { language } = useSite();
  return (
    <a
      href={pageHref(language, page, language, hash)}
      className={cn("inline-flex items-center gap-1.5 font-semibold", className)}
    >
      {children}
      <ArrowRight aria-hidden="true" className="size-4" />
    </a>
  );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-3xl space-y-4">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>
          <Rich text={paragraph} />
        </p>
      ))}
    </div>
  );
}

export function DataTable({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-surface">
      <table className="w-full min-w-[34rem] text-left text-base">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-tint text-sm">
          <tr>
            {headers.map((heading, index) => (
              <th
                key={heading}
                scope="col"
                className={cn("px-4 py-3 font-semibold", index > 0 && "text-right")}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-t border-line">
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={index} scope="row" className="px-4 py-3 font-medium">
                    {cell}
                  </th>
                ) : (
                  <td key={index} className="px-4 py-3 text-right tabular-nums">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
