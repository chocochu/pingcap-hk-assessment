import type { Language, Localized } from "../types";

export interface Publication {
  version: string;
  preparedAt: string;
  history: { version: string; preparedAt: string; summary: Localized }[];
}

const instant = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

function assertInstant(value: string) {
  if (!instant.test(value)) {
    throw new Error("Release timestamps must include seconds and a timezone");
  }
}

/** 2026-10-21 17:04:02 HKT */
export function releaseTime(value: string): string {
  assertInstant(value);
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

/** 21 October 2026 / 2026年10月21日, in Hong Kong time. */
export function releaseDate(value: string, language: Language): string {
  assertInstant(value);
  return new Intl.DateTimeFormat(language === "en" ? "en-GB" : "zh-HK", {
    timeZone: "Asia/Hong_Kong",
    dateStyle: "long",
  }).format(new Date(value));
}
