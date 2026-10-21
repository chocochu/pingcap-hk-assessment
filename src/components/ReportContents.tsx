import type { Language, Locale } from "../types";

export function ReportContents({
  language,
  sections,
}: {
  language: Language;
  sections: Locale["sections"];
}) {
  const chinese = language === "zh-Hant";
  return (
    <nav
      id="report-contents"
      className="report-contents"
      aria-label={chinese ? "本頁內容" : "On this page"}
    >
      <details>
        <summary>
          {chinese ? "瀏覽本頁所有章節" : "Browse every section"}
          <span className="contents-count">
            {chinese ? `共 ${sections.length} 節` : `${sections.length} sections`}
          </span>
        </summary>
        <p className="contents-intro">
          {chinese
            ? "選擇想了解的公司關聯、資料類型或檢視限制。章節按報告順序排列；每項發現的限制與證據一併列出。"
            : "Choose a company connection, type of record or review limit to explore. Sections follow the report’s order, with evidence and its limits kept together."}
        </p>
        <ol>
          {sections.map((section, index) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>
                <span className="contents-number" aria-hidden="true">
                  {index + 1}
                </span>
                <span>{section.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
