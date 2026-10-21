import type { Language } from "../types";

const guide = {
  en: {
    label: "Start here",
    title: "What does this mean for Hong Kong?",
    answers: [
      {
        question: "What was found?",
        answer:
          "The reviewed files contain account and billing information linked to companies with Hong Kong connections. Some names also have links to technical support material. The strength of each connection varies.",
      },
      {
        question: "Does this mean my data was stolen?",
        answer:
          "This report cannot establish whether you personally are affected. A company appearing in these files does not by itself prove that its systems were breached or its customers’ data was exposed.",
      },
      {
        question: "How should I read a company name?",
        answer:
          "Start with the company findings, which explain the evidence and its limits. The wider search directory also includes prospects, alternate names and unresolved identities. A group connection or Hong Kong address alone does not identify the exact company involved.",
      },
    ],
    routeLabel: "Choose where to read next",
    routes: [
      {
        id: "findings",
        label: "Read the company findings",
        detail: "Evidence and limits, company by company",
      },
      {
        id: "catalog",
        label: "Look up a company name",
        detail: "A broader directory; not a list of confirmed victims",
      },
      {
        id: "coverage",
        label: "See what has been checked",
        detail: "Coverage, gaps and uncertainty",
      },
      {
        id: "report-contents",
        label: "Browse all report topics",
        detail: "Company connections, record types and review limits",
      },
    ],
    glossary: "Technical terms, in plain language",
    terms: [
      [
        "Record / observation",
        "An entry found in the files. Several entries can refer to the same account or event; they are not necessarily separate people or companies.",
      ],
      [
        "CRM",
        "Sales and customer-account records. A name here may be a potential customer, rather than an active user.",
      ],
      [
        "Gateway logs",
        "Technical records of activity passing through a service. Their volume does not tell us how many people were affected or which company owned every resource.",
      ],
      [
        "Candidate",
        "A possible match that still needs review. It is not yet a confirmed company finding.",
      ],
      [
        "BigQuery review / complete",
        "A review of a separate collection of exported data tables. “Complete” means the stated check finished, not that every part of the material has been understood.",
      ],
    ],
    countsTitle: "What these numbers count",
    counts:
      "These counts describe records examined, names screened and links found. They do not tell us how many people or companies were affected. Entries can repeat or overlap, so do not add these figures together.",
  },
  "zh-Hant": {
    label: "先看重點",
    title: "這些資料與香港有甚麼關係？",
    answers: [
      {
        question: "檔案中發現了甚麼？",
        answer:
          "已檢視的檔案包含與香港有關公司的帳戶及計費紀錄，部分名稱亦與技術支援內容有關。每項關聯的證據強度並不相同。",
      },
      {
        question: "這是否代表我的資料被盜？",
        answer:
          "這份報告無法判定你個人是否受影響。公司名稱出現在檔案中，單憑這一點不能證明該公司的系統被入侵，或其客戶資料已外洩。",
      },
      {
        question: "應如何理解報告中的公司名稱？",
        answer:
          "先閱讀公司相關發現，了解各項證據及限制。範圍較廣的搜尋目錄亦包含潛在客戶、不同寫法的名稱，以及身分未明的紀錄。單憑集團關係或香港地址，不能確定紀錄屬於哪一家公司。",
      },
    ],
    routeLabel: "選擇接下來閱讀的內容",
    routes: [
      { id: "findings", label: "閱讀各公司的發現", detail: "逐一查看證據及解讀限制" },
      { id: "catalog", label: "搜尋公司名稱", detail: "較廣的名稱目錄，並非已確認受害者名單" },
      { id: "coverage", label: "查看已檢查的範圍", detail: "涵蓋範圍、缺口及不確定之處" },
      { id: "report-contents", label: "瀏覽所有報告主題", detail: "公司關聯、資料類型及檢視限制" },
    ],
    glossary: "用白話理解技術用語",
    terms: [
      [
        "紀錄／觀察值",
        "在檔案中找到的一筆資料。多筆資料可能屬於同一帳戶或事件，不一定代表不同的人或公司。",
      ],
      ["CRM", "銷售及客戶帳戶紀錄。當中的名稱可能只是潛在客戶，不代表正在使用服務。"],
      [
        "閘道日誌（gateway logs）",
        "記錄經過某項服務的技術活動。紀錄數量不能說明有多少人受影響，也不能確定每項資源屬於哪家公司。",
      ],
      ["候選紀錄（candidate）", "仍需進一步檢視的可能匹配，尚未成為已確認的公司相關發現。"],
      [
        "BigQuery 檢視／完成",
        "對另一批匯出的資料表進行檢查。「完成」指指定的檢查已結束，不代表所有資料內容都已理解。",
      ],
    ],
    countsTitle: "這些數字計算的是甚麼？",
    counts:
      "這些數字計算已檢查的紀錄、已篩選的名稱及找到的關聯，不能說明有多少人或公司受影響。紀錄可能重複或互相重疊，請勿將各項數字相加。",
  },
};

export function ReadingGuide({ language }: { language: Language }) {
  const copy = guide[language];
  return (
    <section className="reading-guide" aria-labelledby="reading-guide-title">
      <p className="guide-label">{copy.label}</p>
      <h2 id="reading-guide-title">{copy.title}</h2>
      <div className="guide-layout">
        <dl className="guide-answers">
          {copy.answers.map(({ question, answer }) => (
            <div key={question}>
              <dt>{question}</dt>
              <dd>{answer}</dd>
            </div>
          ))}
        </dl>
        <nav className="guide-routes" aria-label={copy.routeLabel}>
          {copy.routes.map(({ id, label, detail }) => (
            <div key={id}>
              <a href={`#${id}`}>
                {label}
                <span aria-hidden="true"> ↗</span>
              </a>
              <p>{detail}</p>
            </div>
          ))}
        </nav>
      </div>
      <details className="guide-glossary">
        <summary>{copy.glossary}</summary>
        <dl>
          {copy.terms.map(([term, definition]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{definition}</dd>
            </div>
          ))}
        </dl>
      </details>
    </section>
  );
}

export function CountsGuide({ language }: { language: Language }) {
  return (
    <div className="counts-guide">
      <h2 id="counts-title">{guide[language].countsTitle}</h2>
      <p id="counts-explanation">{guide[language].counts}</p>
    </div>
  );
}
