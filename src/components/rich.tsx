import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { resolveHref } from "../site";
import type { Rich as RichText } from "../types";
import { useSite } from "./site-context";

const marks = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/;
const linkPattern = /^\[([^\]]+)\]\(([^)]+)\)$/;

export function SmartLink({ href, children }: { href: string; children: ReactNode }) {
  const { language, copy } = useSite();
  const target = resolveHref(language, href);
  if (!target.startsWith("https://")) return <a href={target}>{children}</a>;
  return (
    <a href={target} target="_blank" rel="noopener noreferrer">
      {children}
      <ExternalLink aria-hidden="true" className="ml-0.5 inline size-[0.8em] align-baseline" />
      <span className="sr-only"> {copy.common.newTab}</span>
    </a>
  );
}

/** Renders copy with **bold** and [links](href). Never injects HTML. */
export function Rich({ text }: { text: RichText }) {
  return (
    <>
      {text.split(marks).map((part, index) => {
        if (!part) return null;
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        const link = linkPattern.exec(part);
        if (link) {
          return (
            <SmartLink key={index} href={link[2]}>
              {link[1]}
            </SmartLink>
          );
        }
        return part;
      })}
    </>
  );
}
