import { Fragment } from "react";
import { evidenceHref } from "../report";
import type { Inline } from "../types";

export function ReportText({ content }: { content: Inline[] }) {
  return content.map((part, index) => {
    if (part.type === "text") return <Fragment key={index}>{part.text}</Fragment>;
    if (part.type === "strong") {
      return (
        <strong key={index}>
          <ReportText content={part.children} />
        </strong>
      );
    }
    return (
      <a key={index} href={evidenceHref(part.href)}>
        <ReportText content={part.children} />
      </a>
    );
  });
}
