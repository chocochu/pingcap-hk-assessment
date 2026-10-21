import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { ReportSection } from "./components/ReportSection";
import { ReportText } from "./components/ReportText";
import { languageFromPath, languagePath, languages, report } from "./report";
import type { Language } from "./types";

export function App({ initialLanguage = "en" }: { initialLanguage?: Language }) {
  const [language, setLanguage] = useState(initialLanguage);
  const [query, setQuery] = useState("");
  const copy = report.locales[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title =
      language === "zh-Hant"
        ? "PingCAP 事件：香港相關資料外洩評估"
        : "PingCAP incident: Hong Kong exposure assessment";
  }, [language]);

  useEffect(() => {
    const onPopState = () => setLanguage(languageFromPath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function switchLanguage(event: MouseEvent<HTMLAnchorElement>, nextLanguage: Language) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)
      return;
    event.preventDefault();
    setLanguage(nextLanguage);
    window.history.pushState(null, "", languagePath(nextLanguage) + window.location.hash);
  }

  return (
    <main id="main-content" lang={language}>
      <a className="skip-link" href="#report-title">
        {language === "zh-Hant" ? "跳至報告內容" : "Skip to report"}
      </a>
      <header className="site-header">
        <span className="site-name">PINGCAP INCIDENT / 香港相關資料評估</span>
        <nav className="language-picker" aria-label="Language / 語言">
          {languages.map((item) => (
            <a
              key={item}
              href={languagePath(item)}
              lang={item}
              aria-current={language === item ? "page" : undefined}
              onClick={(event) => switchLanguage(event, item)}
            >
              {item === "zh-Hant" ? "繁體中文" : "English"}
            </a>
          ))}
        </nav>
      </header>
      <div className="eyebrow">{copy.eyebrow}</div>
      <h1 id="report-title">{copy.title}</h1>
      <p className="lead">
        <ReportText content={copy.lead} />
      </p>
      <Alert role="note" className="my-6">
        <AlertDescription>
          <ReportText content={copy.caution} />
        </AlertDescription>
      </Alert>
      <Alert role="note" className="my-8" aria-label={copy.release.label}>
        <AlertTitle>{copy.release.title}</AlertTitle>
        <AlertDescription>
          {copy.release.paragraphs.map((paragraph, index) => (
            <p key={index}>
              <ReportText content={paragraph} />
            </p>
          ))}
        </AlertDescription>
      </Alert>
      <nav
        className="section-nav"
        aria-label={language === "zh-Hant" ? "報告章節" : "Report sections"}
      >
        {copy.nav.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {item.label}
          </a>
        ))}
      </nav>
      <dl className="metrics">
        {copy.metrics.map((metric) => (
          <div key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>
      {copy.sections.map((section) => (
        <ReportSection
          key={section.id}
          section={section}
          language={language}
          directory={copy.directory}
          query={query}
          onQueryChange={setQuery}
        />
      ))}
      <footer>
        <ReportText content={copy.footer} />
      </footer>
      <noscript>
        <p>
          Search, sorting and pagination require JavaScript. The first 50 labels are shown here;
          download the complete directory CSV below. Both language editions remain readable. ／
          搜尋、排序及分頁功能需要 JavaScript。此處顯示首 50 個名稱；可於下方下載完整目錄
          CSV。兩種語言版本仍可閱讀。
        </p>
      </noscript>
    </main>
  );
}
