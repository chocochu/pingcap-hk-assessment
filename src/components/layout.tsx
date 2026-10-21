import { Languages } from "lucide-react";
import type { ReactNode } from "react";
import publication from "../data/publication.json";
import { releaseTime } from "../lib/releases";
import { cn } from "../lib/utils";
import { pageHref, pages } from "../site";
import type { PageId } from "../types";
import { Container } from "./ui";
import { Rich, SmartLink } from "./rich";
import { useSite } from "./site-context";

export function SiteHeader({ page }: { page: PageId }) {
  const { language, copy } = useSite();
  const other = language === "en" ? "zh-Hant" : "en";
  return (
    <header className="border-b border-line bg-surface">
      <Container>
        <div className="flex items-center justify-between gap-4 py-3">
          <a
            href={pageHref(language, "home")}
            className="font-serif text-lg leading-tight font-bold text-ink no-underline"
          >
            {copy.siteName}
          </a>
          <a
            href={pageHref(language, page, other)}
            lang={other}
            hrefLang={other}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-sm font-semibold text-ink no-underline hover:bg-tint"
          >
            <Languages aria-hidden="true" className="size-4" />
            {copy.switchTo}
          </a>
        </div>
        <nav aria-label={copy.navLabel} className="-mx-2 flex gap-1 overflow-x-auto pb-3">
          {pages.map((id) => (
            <a
              key={id}
              href={pageHref(language, id)}
              aria-current={id === page ? "page" : undefined}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-base font-semibold no-underline",
                id === page ? "bg-accent text-accent-ink" : "text-ink hover:bg-tint",
              )}
            >
              {copy.nav[id]}
            </a>
          ))}
        </nav>
      </Container>
    </header>
  );
}

export function SiteFooter() {
  const { copy } = useSite();
  return (
    <footer className="mt-16 border-t border-line bg-surface py-10 text-base text-muted">
      <Container>
        <div className="max-w-3xl space-y-3">
          {copy.footer.lines.map((line) => (
            <p key={line}>
              <Rich text={line} />
            </p>
          ))}
        </div>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-semibold">
          {copy.footer.links.map((link) => (
            <li key={link.href}>
              <SmartLink href={link.href}>{link.label}</SmartLink>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm">
          {copy.footer.version(publication.version, releaseTime(publication.preparedAt))}
        </p>
      </Container>
    </footer>
  );
}

export function PageFrame({ page, children }: { page: PageId; children: ReactNode }) {
  const { copy } = useSite();
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-10 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-3 focus:font-semibold"
      >
        {copy.skip}
      </a>
      <SiteHeader page={page} />
      <main id="main-content">
        <Container>{children}</Container>
      </main>
      <SiteFooter />
    </>
  );
}
