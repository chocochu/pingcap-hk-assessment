import type { Block, Language, Report } from "../types";

export interface Publication {
  version: string;
  preparedAt: string;
  sourceReportSha256: string;
  contentSha256: string;
  history: {
    version: string;
    preparedAt: string;
    summary: Record<Language, string>;
  }[];
}

export function releaseTime(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value)) {
    throw new Error("Release timestamps must include seconds and a timezone");
  }
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Hong_Kong",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(value));
  const part = (name: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === name)!.value;
  return `${part("year")}-${part("month")}-${part("day")} ${part("hour")}:${part("minute")}:${part("second")} HKT`;
}

export function withPublication(source: Report, publication: Publication): Report {
  const result = structuredClone(source);
  const matchesSource = source.source.sha256 === publication.sourceReportSha256;
  for (const language of ["en", "zh-Hant"] as const) {
    const copy = result.locales[language];
    if (matchesSource) {
      const timestamp = releaseTime(publication.preparedAt);
      copy.eyebrow =
        language === "en"
          ? `Progressive assessment · Release ${publication.version} · Updated ${timestamp}`
          : `持續評估 · 版本 ${publication.version} · 更新於 ${timestamp}`;
      copy.footer.unshift({
        type: "text",
        text:
          language === "en"
            ? `Website release ${publication.version}: ${timestamp}. `
            : `網站版本 ${publication.version}：${timestamp}。`,
      });
    } else {
      copy.eyebrow =
        language === "en"
          ? `Unpublished local update · ${copy.eyebrow}`
          : `尚未發布的本機更新 · ${copy.eyebrow}`;
    }
    const history = copy.sections.find((section) => section.id === "release-history");
    if (!history) throw new Error("Report is missing release history");
    history.blocks.unshift(
      ...publication.history.map<Block>((entry) => ({
        type: "paragraph",
        content: [
          {
            type: "strong",
            children: [
              { type: "text", text: `${entry.version} · ${releaseTime(entry.preparedAt)}` },
            ],
          },
          { type: "text", text: ` — ${entry.summary[language]}` },
        ],
      })),
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text:
              language === "en"
                ? "Earlier entries recorded dates only; their exact release times were not recorded."
                : "較早的紀錄只有日期，當時未記錄確切發布時間。",
          },
        ],
      },
    );
  }
  return result;
}
