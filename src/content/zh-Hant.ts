import { facts, n } from "./facts";
import type { Copy } from "./types";

const issues = "https://github.com/chocochu/pingcap-hk-assessment/issues";
const repo = "https://github.com/chocochu/pingcap-hk-assessment";
const pingcapUpdate = "https://www.pingcap.com/trust-hub/security/security-update-october-2026/";
const pingcapJapan = "https://pingcap.co.jp/trust-hub/security/security-update-october-2026/";
const site = "PingCAP 外洩事件・香港影響";

export const zhHant: Copy = {
  siteName: site,
  skip: "跳至主要內容",
  navLabel: "主要章節",
  switchTo: "English",
  nav: {
    home: "總覽",
    search: "搜尋公司",
    companies: "公司個案",
    coverage: "檢查範圍",
    technical: "技術附註",
  },
  meta: {
    home: {
      title: `PingCAP 資料外洩對香港意味著甚麼 · ${site}`,
      description:
        "以淺白文字說明 PingCAP 資料外洩事件對香港企業的影響：發現了甚麼、不代表甚麼，以及你可以怎麼做。",
    },
    search: {
      title: `你的公司在外洩檔案中嗎？ · ${site}`,
      description:
        "搜尋公司名稱、品牌或網站，查看是否出現在 PingCAP 外洩檔案中，以及屬於哪一類紀錄。",
    },
    companies: {
      title: `我們仔細檢視的九家公司 · ${site}`,
      description:
        "九家與香港有關的公司，其帳戶及帳單紀錄出現在 PingCAP 外洩檔案中：發現了甚麼、把握有多大，以及哪些事情不能由此推斷。",
    },
    coverage: {
      title: `我們檢查了甚麼，又沒有檢查甚麼 · ${site}`,
      description: "這項評估已檢視外洩資料的多少、每項發現有多大把握，以及用語淺釋。",
    },
    technical: {
      title: `技術附註及下載 · ${site}`,
      description: "各項技術檢視的摘要、主要數字，以及可下載的已遮蓋證據檔案。",
    },
  },
  common: {
    updated: (date) => `${date}更新`,
    newTab: "（在新分頁開啟）",
    source: "來源",
    strength: {
      title: "我們有多大把握？",
      intro: "對於公司與檔案之間的每項關聯，我們分為三個等級。",
      levels: {
        strong: {
          label: "強",
          text: "識別編號完全吻合。例如同一個帳戶編號，同時出現在帳戶紀錄與帳單紀錄中。",
        },
        medium: {
          label: "中",
          text: "屬於間接關聯，例如支援要求中提到該公司的帳戶或伺服器位址。它指向該公司，但不能證明擁有權。",
        },
        clue: {
          label: "線索",
          text: "只是一個提示，例如銷售線索、.hk 網址、國家欄位或名稱相似。值得跟進，但並非證明。",
        },
      },
    },
  },
  footer: {
    lines: [
      "這是一項獨立評估，與 PingCAP 無關，亦不代表本站提及的任何公司的立場。",
      "我們並未核實外洩資料是否真確或完整。有關資料規模及來源的說法，均為發布者自己的主張。",
      "隨着更多資料獲檢視，結論可能會補充、更正或撤回。",
    ],
    version: (version, time) => `版本 ${version} · ${time}`,
    links: [
      { label: "回報錯誤", href: issues },
      { label: "用語淺釋", href: "page:coverage#glossary" },
      { label: "原始碼", href: repo },
    ],
  },

  home: {
    eyebrow: (date) => `獨立評估 · ${date}`,
    title: "PingCAP 資料外洩對香港意味著甚麼",
    deck: "2026 年 10 月，一個自稱 FulcrumSec 的組織開始公開一批檔案，聲稱取自 TiDB 資料庫的開發商 PingCAP。我們在這些檔案中搜尋與香港有關的企業。本站說明我們發現了甚麼，以及同樣重要的——這些發現不代表甚麼。",
    ctaSearch: "我的公司有被列出嗎？",
    ctaAction: "你可以怎麼做",
    brief: {
      title: "重點摘要",
      items: [
        {
          title: "發生了甚麼事",
          body: "PingCAP 表示，有人在 2026 年 9 月 9 日至 10 月 7 日期間，利用被盜的服務憑證進入其內部系統，並匯出帳戶、專案、帳單、SQL 編輯器及（已加密的）API 金鑰資料。FulcrumSec 聲稱整批資料共 10.6 TB，並表示還有更多。這些說法我們無法核實。",
        },
        {
          title: "我們發現了甚麼",
          body: "檔案中有與香港公司有關的商業紀錄，主要是帳戶、帳單及銷售紀錄。其中九家公司的證據足夠，我們可以逐一說明它們的紀錄。",
        },
        {
          title: "這不代表甚麼",
          body: "公司名稱出現在這裏，不代表它自己的系統被入侵，也不代表其客戶的資料被取走。很多時候只是代表該公司在 PingCAP 的紀錄裏，有時只是銷售線索。我們也無法告訴你，你個人有沒有受影響。",
        },
      ],
    },
    numbers: {
      title: "數字的背景",
      tiles: [
        {
          value: String(facts.examinedCompanies),
          label: "家公司逐一檢視",
          note: "它們的帳戶與帳單紀錄以完全吻合的編號配對，並由公開資料確認了與香港的關聯。",
        },
        {
          value: String(facts.namesScreened),
          label: "個公司名稱經篩選",
          note: `約十分之八（${facts.marketingOnly} 個）只出現在市場推廣或銷售線索名單中。這並非受害者名單。`,
        },
        {
          value: `${facts.bqTablesReviewed} / ${n(facts.bqTables)}`,
          label: "個 BigQuery 資料表已檢視",
          note: "BigQuery 是已公開的壓縮檔之一。我們仔細檢視的資料表不到 2%，因此這個數字預計會增加。",
        },
      ],
      caveat:
        "這些數字計算的是我們檢視過的紀錄和名稱，並非受影響的人數或公司數目，而且彼此重疊，請不要把它們相加。",
    },
    found: {
      title: "我們在檔案中發現了甚麼",
      intro: "檔案裏有幾種不同的資料。它們的嚴重程度不同，我們的把握也不同。",
      cards: [
        {
          icon: "receipt",
          title: "帳戶及帳單紀錄",
          body: "與香港有關的公司的帳戶及發票紀錄。這是我們最有把握的證據：我們以完全吻合的編號，把帳戶與帳單紀錄配對。有九家公司特別明顯，其帳單紀錄的日期介乎 2022 年至 2026 年。",
          page: "companies",
          cta: "查看這九家公司",
        },
        {
          icon: "support",
          title: "技術支援資料",
          body: `${facts.supportRecords} 筆支援紀錄連到 ${facts.supportCompanies} 個公司名稱，其中 ${facts.supportSqlRecords} 筆含有類似資料庫指令（SQL）的程式碼。這些程式碼可能是範例、疑難排解內容或第三方資料，並不顯示有人的客戶資料庫被取走。`,
          page: "technical",
          hash: "support",
          cta: "查看支援紀錄數字",
        },
        {
          icon: "logs",
          title: "伺服器活動日誌",
          body: `約 ${(facts.gatewayRecords / 100_000_000).toFixed(2)} 億筆來自 PingCAP 雲端閘道的日誌，日期為 2022 年 12 月至 2026 年 10 月。日誌只顯示有活動發生，並不顯示活動屬於誰。我們能把少數公司帳戶連到日誌活動，其中最大的是 MEGAHARD LIMITED。`,
          page: "companies",
          hash: "megahard",
          cta: "閱讀 MEGAHARD 個案",
        },
        {
          icon: "key",
          title: "與登入有關的欄位",
          body: `BigQuery 壓縮檔內有密碼、API 金鑰及登入權杖的欄位。例如全部 ${n(facts.apiRecordsWithKeys)} 筆 API 紀錄的「secret key」欄位都有內容。我們沒有測試其中任何一項，所以無法說明它們能否被讀取，或是否仍然有效。PingCAP 指 API 金鑰資料是已加密的。`,
          page: "technical",
          hash: "credentials",
          cta: "查看欄位數字",
        },
        {
          icon: "people",
          title: "個人：只有總數",
          body: `有兩份分析匯出資料把香港列為國家：BigQuery 使用者匯出資料約 ${(facts.analyticsExportRows / 1_000_000).toFixed(2)} 百萬列中有 ${n(facts.analyticsExportHkCountryRows)} 列，以及 ${facts.hkProfileRows} 筆 Mixpanel 設定檔資料列。另外，${facts.hkEmailContacts} 筆銷售聯絡人紀錄使用 .hk 電郵地址（涉及 ${facts.hkEmailDomains} 個網域）。資料列不等於人，亦未作去重；兩份匯出資料也可能重疊，而國家欄位不能說明某人居住在哪裏，所以這些數字不應相加，也不應當作受影響人數。`,
          page: "technical",
          hash: "location",
          cta: "查看計算方式",
        },
        {
          icon: "code",
          title: "原始碼儲存庫",
          body: `較新的壓縮檔載有 ${facts.repoDirectories} 個儲存庫的程式碼及設定。它為九家公司中的四家補充了細節，說明了較早匯出資料是如何產生的、為何資料列會重複，並載有儲存的財務及個人檔案資料。它沒有增加任何新的受影響公司，也沒有任何內容顯示客戶的資料庫曾被取走。`,
          page: "technical",
          hash: "repos",
          cta: "查看原始碼壓縮檔補充了甚麼",
        },
      ],
    },
    notMean: {
      title: "這不代表甚麼",
      items: [
        "**被列名不等於被入侵。** 這些是 PingCAP 關於其客戶、潛在客戶及合作夥伴的紀錄。公司出現在其中，不一定曾被入侵。",
        `**這不是受害者名單。** 這 ${facts.namesScreened} 個名稱包括銷售潛在客戶、合作夥伴、不同寫法的名稱，以及少數我們無法辨識的名稱。部分其後已被排除，不視為香港公司。`,
        "**知名機構的系統並未因此受損。** 銀行、交易所，以及交通和支付營運商（滙豐、港交所、恒生、八達通、港鐵）出現在市場推廣及銷售線索名單中。沒有任何跡象顯示它們的系統受到入侵。",
        "**數字不等於人數。** 一個客戶可以產生數以千計的紀錄。我們的數字不是客戶數目、已付發票數目或嚴重程度評分。",
        "**這一切都未經核實為真。** 我們無法確認外洩檔案是否真確或完整，而資料規模的數字來自發布者自己。",
      ],
    },
    action: {
      title: "你可以怎麼做",
      intro: "以下是一般性建議，並非法律或保安意見。如有疑問，請向你的供應商或專業人士查詢。",
      groups: [
        {
          title: "如果你的機構使用 PingCAP 或 TiDB Cloud",
          steps: [
            `閱讀 [PingCAP 的官方保安更新](${pingcapUpdate})，並向 PingCAP 或你購買服務的經銷商查詢你的機構是否受影響。PingCAP 發布更新時，仍在調查哪些客戶受到影響。`,
            "更換你的 TiDB Cloud API 金鑰及密碼，以及你曾重複使用這些密碼的任何地方。",
            "檢查你的帳戶自 9 月 9 日起有沒有不認得的活動。亦請查看 SQL 編輯器的歷史紀錄中有沒有敏感的查詢，因為 PingCAP 表示 SQL 編輯器資料是被匯出的資料之一。",
          ],
        },
        {
          title: "如果你的公司名稱出現在這裏",
          steps: [
            "[找到你的紀錄](page:search)，看看屬於哪一類。大部分是市場推廣或銷售線索，頂多只顯示曾有商業往來。",
            "請留意，帳單可能記在經銷商或寄存服務供應商名下，而非最終客戶。請向你的供應商查詢。",
            "如果你在與 PingCAP 有關的系統內存放個人資料，請考慮是否有責任通知客戶或監管機構，並徵詢專業意見。",
            `如果我們弄錯了你的公司，例如把它與名稱相近的公司混淆，請[告訴我們](${issues})。`,
          ],
        },
        {
          title: "給所有人",
          steps: [
            "對於聲稱與 PingCAP、TiDB、發票或帳戶問題有關的不明電郵、來電或訊息，請提高警覺。外洩的帳單和聯絡資料可令詐騙顯得更可信。請使用官方網站上的聯絡方式，而不是訊息內提供的。",
            "請避免下載或轉發外洩的壓縮檔，裏面可能含有他人的個人資料。",
          ],
        },
      ],
      note: "本站提供的下載檔案已遮蓋，不含個人姓名和電郵、憑證、客戶 IP 位址及端點，以及帳戶或叢集編號。",
    },
    background: {
      title: "事件經過詳情",
      paragraphs: [
        `PingCAP 在 10 月 19 日的更新中表示：服務憑證被盜、有人在 9 月 9 日至 10 月 7 日期間進入內部系統，並匯出帳戶、機構及專案資料、SQL 編輯器資料、商業及帳單資料，以及已加密的 API 金鑰資料。該公司稱沒有證據顯示儲存在 TiDB 內的資料受影響，並指客戶受影響的範圍仍在調查中。[閱讀官方更新](${pingcapUpdate})。`,
        `PingCAP 的[日文公告](${pingcapJapan})對外洩的 API 金鑰資料描述較為狹窄，並指私密金鑰部分並未外洩。兩份公告的範圍和確定程度不同，檔案中每項類似憑證的內容是否可用或無害，我們亦未能判定。`,
        "FulcrumSec 表示，首批發布的是五個 .tar.gz 壓縮檔，壓縮後 128.3 GB、解壓後略高於 200 GB，來自一批它聲稱共 10.6 TB 的資料，並稱還有更多。我們並未核實這些說法。",
        `到目前為止，我們取得了 ${facts.archivesAvailable} 個壓縮檔。[檢查範圍](page:coverage)說明了我們涵蓋了多少。一個雲端費用及使用量壓縮檔不在這次檢視範圍內。`,
      ],
    },
    next: {
      title: "接下來可以看",
      cards: [
        {
          title: "搜尋公司",
          body: "按名稱、品牌或網站搜尋，看看它出現在哪一類紀錄中。",
          page: "search",
        },
        {
          title: "公司個案",
          body: "證據足夠、可以逐一說明的九家公司。",
          page: "companies",
        },
        {
          title: "檢查範圍",
          body: "我們涵蓋了多少外洩資料、把握有多大，以及用語淺釋。",
          page: "coverage",
        },
        {
          title: "技術附註",
          body: "各項技術檢視的主要數字，以及已遮蓋的資料檔案。",
          page: "technical",
        },
      ],
    },
  },

  search: {
    title: "你的公司在外洩檔案中嗎？",
    intro: (total) =>
      `按公司名稱、品牌或網站搜尋。範圍涵蓋我們篩選過的 ${facts.namesScreened} 個名稱，以及較後檢視中發現的其他名稱（合共 ${total} 項）。被列出不代表公司曾被入侵。`,
    inputLabel: "公司名稱、品牌或網站",
    placeholder: "例如：Klook、megahard、.hk",
    clear: "清除",
    filterLabel: "顯示",
    filters: {
      all: "全部",
      examined: "已仔細檢視",
      account: "帳戶或財務紀錄",
      sales: "銷售紀錄",
      marketing: "僅市場推廣名單",
      later: "較後檢視中提及",
    },
    legendTitle: "標籤的意思",
    verdicts: {
      examined: {
        label: "已仔細檢視",
        text: "我們以完全吻合的編號，把這家公司的帳戶與帳單紀錄配對，並確認了與香港的關聯。請閱讀完整個案。",
      },
      account: {
        label: "帳戶或財務紀錄",
        text: "出現在客戶帳戶或與財務有關的商業紀錄中。它可能只是潛在客戶或過往客戶，而非正在使用的用戶。",
      },
      sales: {
        label: "銷售紀錄",
        text: "出現在銷售（CRM）紀錄中，這類紀錄除了客戶，也會記錄潛在客戶。",
      },
      marketing: {
        label: "僅市場推廣名單",
        text: "只出現在市場推廣、銷售線索或宣傳活動名單中，通常代表可能的客戶，而非用戶。",
      },
      later: {
        label: "較後檢視中提及",
        text: "在較後的 BigQuery 檢視中被提及。請閱讀附註了解其意思。",
      },
    },
    household: {
      title: "看到熟悉的名字？",
      body: "銀行、交易所，以及交通和支付營運商（例如滙豐、港交所、恒生、八達通和港鐵）主要出現在市場推廣及銷售線索名單中，有時也出現在銷售紀錄中。Livi Bank、HashKey 和 OSL 出現在帶有「Customer」標示的銷售或財務紀錄中，但「已投入正式使用」欄位為 No。這一切都不顯示這些機構的系統曾被入侵。",
    },
    count: (matched, total, shown) =>
      matched === 0
        ? `在 ${total} 項中沒有符合的結果`
        : `${total} 項中有 ${matched} 項符合 · 顯示 ${shown} 項`,
    more: (count) => `再顯示 ${count} 項`,
    none: {
      title: "沒有符合的結果",
      body: "這不代表該公司不在外洩資料中：我們只檢視了部分資料（見[檢查範圍](page:coverage)）。請試試其他寫法、中文名稱，或只輸入名稱的一部分。",
    },
    details: {
      toggle: "詳情",
      seen: (count) => `在我們篩選的紀錄中出現 ${count.toLocaleString("en-US")} 次`,
      countries: "紀錄中的國家欄位值",
      domains: "紀錄中的網站",
      domainsNote: "未核實是否屬該公司",
      category: "原始類別",
      noneRecorded: "沒有紀錄",
    },
    later: "來自較後的檢視",
    readFinding: "閱讀完整個案",
    noscript: `搜尋功能需要 JavaScript。你可以改為[下載 ${facts.namesScreened} 個篩選名稱的完整名單](evidence:business_labels.csv)。`,
  },

  companies: {
    title: "我們仔細檢視的九家公司",
    intro: [
      "對於這九家公司，我們做到了兩件事：以完全吻合的編號，把它們在外洩檔案中的帳戶與帳單紀錄配對；並透過官方條款、公司網站和政府公告等公開資料，確認了與香港的關聯。",
      "「與香港有關」有不同的形式：有些是在香港註冊的公司，有些則聲明總部在香港。每張卡片都會說明我們確認了甚麼。",
    ],
    caution:
      "這一切都不顯示公司自己的系統曾被入侵，或其客戶的資料曾外洩。它只顯示該公司出現在 PingCAP 的帳戶及帳單紀錄中。",
    cardLabels: {
      records: "找到的紀錄",
      hk: "與香港的關聯",
      found: "我們發現了甚麼",
      careful: "哪些事情不能由此推斷",
      sure: "我們有多大把握？",
      how: "我們如何確認與香港的關聯",
      refs: "帳單證據編號",
    },
    tags: { billing: "帳單", support: "支援", logs: "閘道日誌", repo: "原始碼" },
    related: {
      title: "你可能在找的其他名稱",
      intro: "這些名稱經常被搜尋。它們都不屬於那九家，而且各有各的限制。",
      items: [
        {
          name: "SHOPLINE COMMERCE PTE. LTD.、Amber AI Limited、Matrixport Technologies Ltd.",
          body: "這是新加坡實體，帳單紀錄分別有 867、390 及 809 筆，支援紀錄分別有 9、9 及 2 筆。它們的品牌與香港有關，但這不代表這些帳戶屬於香港公司，也不能把它們的資料歸給香港的關聯公司。",
        },
        {
          name: "Eats365",
          body: "48 筆帳單紀錄連到其帳戶名稱。銷售系統內記錄的網站（pos-nz.com）未能與 Eats365 的官方網域互相印證，因此我們無法確定它究竟是哪家公司。",
        },
        {
          name: "Longbridge Financial LLC",
          body: "已排除。其網域屬於一家美國按揭貸款機構，與香港的 Longport／Longbridge 不同。地理欄位互相矛盾，不足以把兩者視為同一家。",
        },
        {
          name: "Livi Bank、HashKey、OSL",
          body: "出現在帶有「Customer」標示的銷售及財務紀錄中，但正式使用欄位為 No。這只是帳戶紀錄外洩，並非已核實的正式使用。",
        },
        {
          name: "滙豐、港交所、恒生、八達通、港鐵",
          body: "主要出現在市場推廣及銷售線索名單中，部分亦有銷售系統紀錄。名稱出現在這裏，並不代表銀行、交易所、交通或支付系統曾被入侵。",
        },
        {
          name: "CloudSteps、Admazes、Qineasy、KBQuest、ZENS、Vision Board",
          body: "公開列明的 PingCAP 合作夥伴。合作夥伴身分有助於了解其身分背景，但並非受影響的證據，而經銷商或付款方的紀錄也不能識別每一個下游客戶。",
        },
      ],
    },
  },

  coverage: {
    title: "我們檢查了甚麼，又沒有檢查甚麼",
    intro:
      "可以把這批外洩資料想像成一個極大的檔案櫃。有些抽屜我們由頭讀到尾，有些只是搜尋了特定名稱，其餘的還沒有打開。這一頁說明哪些屬於哪一種，讓你判斷我們的發現有多大的參考價值。",
    picture: {
      title: "整體情況",
      tiles: [
        {
          value: `${facts.archivesAvailable} / ${facts.archivesClaimed}`,
          label: "個壓縮檔已取得",
          note: "發布者表示首批共有五個壓縮檔。我們取得了其中四個。",
        },
        {
          value: `${(facts.gatewayRecords / 100_000_000).toFixed(2)} 億`,
          label: "筆閘道日誌已讀取",
          note: "每個檔案都已讀取。日誌顯示活動，不顯示活動屬於誰。",
        },
        {
          value: `${facts.bqTablesReviewed} / ${n(facts.bqTables)}`,
          label: "個 BigQuery 資料表已檢視",
          note: "目前不到 2%。其餘只作列表，尚未檢視。",
        },
      ],
      barLabel: "已詳細檢視的 BigQuery 資料表",
      barNote: `${n(facts.bqTables)} 個資料表中的 ${n(facts.bqTablesReviewed)} 個（${n(facts.bqRowsReviewed)} 列）。「已檢視」是指我們統計了特定欄位，並不代表我們理解了其中的一切。`,
    },
    looked: {
      title: "我們看了甚麼",
      intro: "每一項都說明我們看得有多仔細，以及這些結果不能告訴你甚麼。",
      limitLabel: "這不能告訴你的事：",
      status: { done: "完整讀取", partial: "部分檢查", none: "未進行" },
      items: [
        {
          title: "閘道日誌",
          status: "done",
          body: `我們讀取了全部 ${n(facts.gatewayFiles)} 個檔案：${n(facts.gatewayRecords)} 筆有效日誌，日期為 2022 年 12 月 3 日至 2026 年 10 月 3 日（UTC）。三個檔案內共九個損壞的片段已被剔除。`,
          limit:
            "日誌只顯示有活動發生，不顯示活動屬於誰。檔案名稱含「.sample」，所以我們不知道日誌是否完整。",
        },
        {
          title: "帳單紀錄",
          status: "done",
          body: "我們掃描了全部 8,796,520 列帳單紀錄，涉及 1,607 個不同的帳單帳戶。",
          limit: "伺服器欄位全部為空，所以帳單無法告訴我們哪些伺服器屬於哪個帳戶。",
        },
        {
          title: "帳戶、個人檔案及聯絡人資料表",
          status: "partial",
          body: "我們以針對性的關鍵字，搜尋商業名稱、地點和識別編號，涵蓋 753 個 CSV 檔案（468,552 列）、48 個核心資料表（1,325,495 列）及 315 個 Parquet 檔案（在 2,540 萬列中搜尋了約 1,440 萬列）。",
          limit: "關鍵字搜尋可能漏掉名稱。我們沒有嘗試辨識每個欄位中的每家公司。",
        },
        {
          title: "文字檔、個人檔案及聯絡人",
          status: "partial",
          body: "522 個檔案（3,859,443 筆紀錄或行數），以關鍵字和模式檢查進行搜尋。",
          limit: "圖片、內嵌壓縮檔，以及我們沒有特別搜尋的自由文字，均未經分析。",
        },
        {
          title: "市集紀錄",
          status: "partial",
          body: "我們找到 76 組名稱或網站完全吻合的紀錄。",
          limit: "舊的地址及帳戶連結沒有按日期核對，而付款方、經銷商和最終用戶是不同的角色。",
        },
        {
          title: "一般壓縮檔的其餘部分",
          status: "partial",
          body: "我們列出了其中所有內容：3,226 項，其中 2,031 個為一般檔案，解壓後約 10.8 GB。",
          limit: "列出不等於理解。內嵌壓縮檔、圖片、資料庫結構及雜項檔案並未完整解讀。",
        },
        {
          title: "BigQuery 匯出資料",
          status: "partial",
          body: `清單已完成：${facts.bqDatasets} 個資料集內共 ${n(facts.bqTables)} 個資料表（壓縮檔約 33.8 GB）。我們詳細檢視了其中 ${facts.bqTablesReviewed} 個。我們亦掃描了 26 個資料表尋找香港地點的跡象：2,698,670 列，其中 55,253 列帶有香港跡象，20,513 列看似公司紀錄（未經確認）。`,
          limit: "仍有 5,736 個非空資料表未檢視。這些數字互相重疊。",
        },
        {
          title: "IP 位址所在地",
          status: "none",
          body: "我們原本打算使用的免費位置資料庫拒絕了下載（HTTP 403），而我們沒有嘗試繞過。",
          limit: "日誌中的地區值是基礎設施所在地區，並非客戶的所在地。",
        },
        {
          title: "原始碼儲存庫",
          status: "partial",
          body: `我們列出了 ${facts.repoDirectories} 個儲存庫中全部 ${n(facts.repoMembers)} 個項目，並在 ${n(facts.repoTextFiles)} 個文字檔中，搜尋較早發現中出現的公司名稱、網站和帳戶編號。其中 ${facts.repoGitRepositories} 個儲存庫，我們還讀取了部分已儲存的變更歷史（33 個檔案、543 個版本）。`,
          limit:
            "搜尋不等於讀完全部內容。依賴套件、二進位檔、內嵌壓縮檔、特殊文字編碼的檔案及連結檔案均未解析，大部分變更歷史亦未檢視。有兩個檔案達到我們設定的 100 次變更上限。",
        },
        {
          title: "我們沒有看過的壓縮檔",
          status: "none",
          body: "發布者表示首批共有五個壓縮檔，我們取得了四個。一個雲端費用及使用量壓縮檔，亦不在這次檢視範圍內。",
          limit: "本站任何地方都沒有反映這些檔案的內容。",
        },
      ],
    },
    sure: {
      title: "我們有多大把握？",
      intro:
        "帳戶與帳單的配對，使用檔案中記錄的完全吻合的識別編號。支援紀錄的連結較不確定，因為支援要求中的網址含有帳戶和叢集的參考資料，只能提供背景，不能證明擁有權。銷售線索、宣傳活動紀錄、經銷商地址、國家欄位和 .hk 網域，都只是有待進一步檢視的線索。",
    },
    add: {
      title: "為甚麼不應把數字相加",
      body: [
        "本站的數字是我們檢視過的紀錄數目，並非客戶、人數、已付發票或嚴重程度評分。一個客戶可以產生數以千計的紀錄。",
        "同一個帳戶或事件可以出現在多個地方：重複的快照、可能描述同一宗交易的兩個銷售系統，或記在經銷商名下的帳單。不同章節的總數互相重疊，相加會重複計算。",
        "當我們為同一家公司提供兩個數字（例如 MEGAHARD 的兩個閘道紀錄數目），它們來自不同的方法，並不打算相加。",
      ],
    },
    didNot: {
      title: "我們刻意不做的事",
      items: [
        "**我們沒有測試任何憑證**，也沒有聯絡任何客戶的系統。",
        "**我們沒有繞過封鎖。** 當下載被拒絕時，我們就放棄那項檢查。",
        "**我們不公開原始的外洩紀錄。** 我們的下載檔案已經遮蓋：不含個人姓名和電郵、憑證、客戶 IP 位址及端點，以及帳戶或叢集編號。個人只以總數出現。",
        "**我們並非在核實這次外洩。** 我們沒有確立這些資料是否真確或完整。",
      ],
    },
    glossary: {
      title: "用語淺釋",
      terms: [
        {
          term: "紀錄（或觀察值）",
          meaning:
            "在檔案中找到的一筆資料。多筆資料可能描述同一個帳戶或事件，所以不一定代表不同的人或公司。",
        },
        {
          term: "壓縮檔",
          meaning: "一大包檔案，像 zip 檔案一樣。這次外洩分成多個壓縮檔發布。",
        },
        {
          term: "帳單紀錄",
          meaning: "關於使用服務收費的一筆資料：哪個帳戶、哪個月份。我們計算筆數，不計算金額總和。",
        },
        {
          term: "銷售系統（CRM）",
          meaning:
            "公司用來追蹤客戶和潛在客戶的軟件。出現在其中的名稱可能只是潛在客戶，而非正在使用的用戶。檔案中的 Salesforce 和 NexusCRM 就是兩個例子。",
        },
        {
          term: "市場推廣系統（HubSpot）",
          meaning: "用來管理市場推廣聯絡人和銷售線索的軟件。",
        },
        {
          term: "銷售線索或潛在客戶",
          meaning: "將來可能成為客戶的對象。被列為線索，並不等於正在使用服務。",
        },
        {
          term: "支援紀錄（工單）",
          meaning:
            "發送給 PingCAP 支援團隊的求助要求，連同相關的對話。工單可以被合併，所以數目不代表獨立事件的數目。",
        },
        {
          term: "閘道日誌",
          meaning:
            "經過 PingCAP 雲端服務的請求的技術紀錄。數量不能說明有多少人受影響，也不能確定每項資源屬於誰。",
        },
        {
          term: "叢集（cluster）",
          meaning: "在雲端運行的資料庫，每個都有一個編號。",
        },
        {
          term: "租戶（tenant）",
          meaning: "PingCAP 系統中的帳戶持有人。一家公司可以有多個，帳單也可以記在經銷商名下。",
        },
        {
          term: "SQL",
          meaning:
            "用來向資料庫提出問題的語言。支援要求中出現這類程式碼，可能只是範例或疑難排解，並非客戶資料。",
        },
        {
          term: "憑證、API 金鑰、權杖、雜湊值",
          meaning:
            "向系統證明你身分的東西。雜湊值是機密資料的打亂形式。找到這類欄位，並不代表它能被讀取，或仍然有效。",
        },
        {
          term: "BigQuery 匯出資料",
          meaning: "取自 Google 資料倉儲產品的資料表副本，是已公開的壓縮檔之一。",
        },
        {
          term: "候選紀錄",
          meaning: "仍需進一步檢視的可能配對，並非已確認的發現。",
        },
      ],
    },
  },

  technical: {
    title: "技術附註及下載",
    intro:
      "供分析人員、記者和想了解細節的讀者使用。每一組摘要說明一類檢視及其主要數字。所有數字都可以在「下載」中已遮蓋的檔案內找到出處。不同檢視的數字互相重疊，不應相加。",
    groups: [
      {
        id: "location",
        title: "香港地點掃描及連結",
        summary: "我們如何在 BigQuery 匯出資料中尋找香港的跡象，以及如何嘗試把帳戶紀錄連到伺服器。",
        points: [
          "**地點掃描：** 完整掃描了 26 個資料表，解析 2,698,670 列，沒有錯誤。55,253 列帶有香港地點跡象，20,513 列看似公司紀錄（未經確認的候選紀錄）。這些跡象不能說明居住地、國籍或是否受到入侵。",
          "**連結：** 我們從財務帳戶紀錄中明確的租戶編號出發，涵蓋 11 個資料表（4,454,818 列），找到 27 個完全吻合名稱下的 39 個候選租戶。12 個租戶和 35 個叢集因名稱互相矛盾而被排除。請見下方的連結表。",
          "**個人：只有總數：** 有兩份分析匯出資料把香港列為國家。BigQuery 分析使用者匯出資料的 3,068,700 項資料列觀察中有 38,546 項如此（約 1.3%）；Mixpanel 設定檔資料列則有 416 筆。另有 255 筆銷售聯絡人（HubSpot）紀錄使用 .hk 電郵地址，涉及 116 個網域。這些數字可能重疊，全部未作去重，亦不能說明居住地或受影響人數。請勿相加。",
        ],
        files: [
          "bq_coverage.json",
          "bq_discovery_review.json",
          "bq_company_candidates.csv",
          "bq_linkage_review.json",
        ],
      },
      {
        id: "repos",
        title: "原始碼儲存庫",
        summary: `一個載有 ${facts.repoDirectories} 個程式碼儲存庫的壓縮檔。我們以完全吻合的方式，在其中搜尋較早發現中出現的公司名稱、網站和帳戶編號，並閱讀每個命中項目的上下文。它為現有的發現補充了細節，並沒有增加任何新的受影響公司、人數或發票數目。`,
        points: [
          `**搜尋範圍：** ${n(facts.repoMembers)} 個壓縮檔項目（411,157 個一般檔案，壓縮後約 18.5 GB）。在 ${n(facts.repoTextFiles)} 個文字檔（225,543 份不同內容）中，搜尋了 454 個公司名稱、228 個網站和 761 個帳戶識別編號。`,
          "**儲存的財務資料：** 一個已提交的財務檔案有 5,709 列、54 個欄位（帳單月份為 2019 年 10 月至 2026 年 5 月）。其中 102 列與較早的四個公司名稱以完全吻合的帳戶字串配對，詳見下表。這些資料列會重複同一帳戶及月份，而一個儲存格可以載有多張發票，所以 102 並非發票、客戶或事件的數目。我們不報告任何金額，也不應把這些資料列加到較早的帳單數字上：BigQuery 匯出資料中有對應的資料表，但我們沒有核對兩者的資料列是否相同。",
          "**設定：** 一個名稱含「production」（正式環境）的部署設定，列出 Shoplazza、AsiaPac 和 Wetech 完全吻合的帳戶編號。Shoplazza 另有針對該帳戶的警報轉送設定；Wetech 有其機構及叢集的報表設定，以及儲存的診斷和評估樣本；AsiaPac 則有 2023 年 4 月的資源及遷移備註。路徑名稱含「production」或儲存了警報規則，並不證明服務曾經部署、警報曾經發出，或該公司持續使用。寄存服務供應商和經銷商也無法顯示其下游客戶是誰。",
          "**載有個人檔案資料的筆記本：** 一個已儲存的筆記本有五個個人檔案表，內含電郵、帳戶參考、註冊日期、地區、推斷類別及 15 個使用情況欄位。它們共有 12,164 列，但只有 3,041 組不同的電郵及帳戶配對。其中七組配對的電郵網域與我們登記冊中的網域吻合（四個網域）。這些不是人，也不是僱員，而地區欄位也不能說明居住地。我們只報告總數，亦沒有執行筆記本中的任何儲存格。",
          "**較早匯出資料是如何產生的：** 程式碼顯示，名稱含 Salesforce 的模型可以讀取 NexusCRM 資料；部分模型會自行生成刪除及同步欄位、把同一個 ID 名稱用於不同帳戶系統、把租戶名稱複製成帳戶名稱、附加快照，並計算每月經常性收入。這解釋了為何重複的資料列和匯出名稱並非獨立紀錄，也不是擁有權的證明。程式碼實際如何運行，則未經核實。",
          "**支援系統程式碼：** 程式碼可以儲存原始工單內容、整理後的留言、自動生成的知識庫結果及追蹤紀錄。這只顯示在較早的匯出資料中可以往哪裏找，並不顯示任何香港工單曾被處理。",
          "**限制：** 在已檢視的內容中，沒有任何跡象顯示客戶的應用程式資料庫曾被取走，或有客戶憑證仍然有效。我們沒有執行任何程式碼，也沒有測試任何憑證或網站。",
        ],
        files: [
          "repos_company_materials.csv",
          "repos_findings.json",
          "repos_coverage.json",
          "repos_validation.json",
        ],
      },
      {
        id: "credentials",
        title: "密碼、金鑰及權杖（欄位是否存在）",
        summary:
          "我們統計了與憑證有關的欄位是否有內容。我們從未測試任何憑證，而這些資料也沒有歸屬於任何公司或香港。",
        points: [
          `**TiDB Cloud API 紀錄：** 全部 ${n(facts.apiRecordsWithKeys)} 個不同的紀錄編號，其 access key 及 secret key 欄位都有內容。這不能說明這些值是否獨特、有效、以明文儲存或可解密。`,
          "**SQL 編輯器訊息：** 三個資料表共解析 668,506 列。兩個 SQL 來源分別有 203,171 及 150,725 則不同的訊息。",
          "**驗證資料表：** 373 筆用戶紀錄的 Password 欄位有內容；3,550 筆連線階段紀錄的兩個權杖欄位都有內容；27 筆已連接應用程式紀錄中，有 6 筆的 ConsumerSecret 有內容。",
          "**內部 CRM 整合資料表：** 六個主體同時有存取權杖及更新權杖的密文欄位；436 筆 OAuth 更新權杖雜湊紀錄；5 筆 API 權杖雜湊紀錄；1 個具名憑證密鑰；2 個 webhook 密鑰。",
          "欄位有內容，並不說明值如何儲存、保護強度如何，或是否仍然有效。",
        ],
        files: [
          "bq_material_review.json",
          "bq_auth_presence_review.json",
          "bq_integration_presence_review.json",
        ],
      },
      {
        id: "sales",
        title: "銷售紀錄、報價及合約（CRM）",
        summary:
          "兩個銷售系統（Salesforce 和 NexusCRM）存放帳戶、報價、合約和銷售機會。我們檢查了它們的結構，並只在同一系統內帳戶編號吻合時才連結紀錄。",
        points: [
          "**已連結的商業紀錄：** 84 個完全吻合的帳戶名稱符合資格，其中 77 個有連結紀錄：67 份 Salesforce 合約、135 份報價、184 筆銷售機會，以及 198 筆 NexusCRM 銷售機會。兩個系統可能描述同一批交易。已刪除、草稿和已過期的紀錄仍然是儲存的商業資料，並不代表生效中的合約。",
          "**商業地理資料：** 五個資料表（13,329 列）中，585 列帶有香港跡象。合約、報價、銷售機會和稅務紀錄只提供地理資料。",
          "**NexusCRM 結構：** 505 列合約及 972 列報價，另有 1,048 個自訂報價產品、1,089 個報價明細及 2,644 個銷售機會明細。我們統計的是欄位，不是金額。",
          "**文件：** 只有中繼資料。Salesforce 有 2,976 筆文件及 1,127 筆版本紀錄，Nexus 有 42 份文件。我們沒有打開任何檔案，也沒有存取任何網址。",
          "**銷售通話逐字稿：** 168,728 次接觸、3,672 段錄音及 401,911 段逐字稿發言。我們配對了兩個完全吻合的公司名稱（Amber AI Limited 及 Bytebase (HongKong) Limited），並沒有公開任何片段。",
          "**市場推廣系統（HubSpot）的公司：** 檢查了 86,741 列公司紀錄。另有數個與香港有關的名稱，列在[搜尋頁](page:search)。",
        ],
        files: [
          "bq_commercial_review.json",
          "bq_commercial_links_review.json",
          "bq_account_additions_review.json",
          "bq_nexus_commercial_parents_review.json",
          "bq_nexus_line_items_review.json",
          "bq_crm_documents_review.json",
          "bq_crm_raw_documents_review.json",
          "bq_sales_content_review.json",
          "bq_hubspot_additions_review.json",
          "bq_hubspot_identity_context_v2_review.json",
          "bq_hubspot_identity_context_v3_review.json",
        ],
      },
      {
        id: "support-system",
        title: "支援系統",
        summary: "支援系統內的工單、留言及附件中繼資料。",
        points: [
          "共解析 193,563 列支援紀錄。嚴格的途徑（合資格的公司名稱、國家為香港，以及明確的編號）沒有配對到任何機構。較寬鬆的完全同名途徑配對到 49 個機構，其中四個連到 171 張工單。",
          "其後的跟進讀取了 19,458 列（18,920 則留言及 538 筆附件紀錄）。1,519 則留言和 40 筆附件紀錄連到那四個具名機構。我們記錄的是欄位是否存在，而非內容，也沒有存取任何附件。",
          "工單數目不代表獨立事件，因為工單可以被合併。舊工單上的「生產環境停擺」標示，並不顯示是這次事件引致的故障。",
        ],
        files: ["bq_support_review.json", "bq_support_content_review.json"],
      },
      {
        id: "analytics-export",
        title: "分析使用者匯出資料",
        summary:
          "BigQuery 壓縮檔內一大批分析使用者匯出資料。我們計算了資料列數，檢查三個地點欄位，以及哪些個人檔案欄位有填寫。所有數字都是資料列觀察數，不是人數、客戶數，也不是已確認的外洩。",
        points: [
          `**涵蓋範圍：** 全部 ${facts.analyticsExportSources} 個匯出來源均經兩輪分別解析，共 3,068,700 列，沒有解析錯誤。來源內及跨來源的資料列均未作去重，所以同一個人或裝置可能出現多於一次。`,
          `**香港跡象：** 國家欄位為香港的有 ${n(facts.analyticsExportHkCountryRows)} 列，城市欄位為香港的有 14,180 列，地區欄位則沒有。大部分資料列的國家欄位為空（2,048,479 列）或為其他國家（981,675 列）。我們沒有把三個數字相加，因為同一列可能符合多個欄位；我們也從不憑城市或地區推斷國家。`,
          "**哪些欄位有填寫：** 每一列都有個人檔案、地點、裝置、私隱、終身價值、預測、受眾及使用者屬性等容器。其中部分欄位經常是空的：例如終身收益數值出現在 174,415 列，手機型號出現在 35,940 列。「存在」包括空字串、清單及物件，所以不能說明數值可用或準確。這些容器之內沒有發現預期以外的額外欄位。我們沒有發布識別碼、時間戳或財務數值。",
          "**限制：** 這不能說明涉及多少人、客戶是誰，或任何香港企業是否受到影響。我們亦沒有核對這些資料列與 Mixpanel 設定檔資料列或本頁其他香港數字是否重疊，所以請勿相加。",
        ],
        files: ["bq_analytics_users_review.json"],
      },
      {
        id: "billing-models",
        title: "收費模型及身分",
        summary:
          "收費資料以同一個底層模型的多個版本出現。我們比較了它們的結構，但沒有嘗試判斷誰付款、誰管理或誰擁有甚麼。",
        points: [
          "**角色：** 178,404 列收費設定及 174,993 列模型化的費用明細。每一列費用都指向十個設定編號之一，但各個識別欄位扮演不同的角色，所以相同的值無法告訴我們誰付款或擁有某項資源。",
          "**命名空間：** 另外兩個明細資料表（各 71,560 列）內容彼此完全相同，但與較早的模型只有 763 筆完整紀錄相同，即使全部 71,560 個分組編號都有重疊。",
          "**每月模型：** 九個資料表，共 357,500 列。三個每月分配資料表含有大量重複紀錄（42,796、89,953 及 42,796 筆）。我們保留了它們，因為相同的紀錄並不證明是重複收費。金額欄位混合了數字和文字，所以我們沒有計算任何金額總和。",
          "**身分模型：** 對五個來源共 545,062 列進行普查，找不到可靠的身分系統橋接。兩個來源中有 932 組鍵值有多個版本，這可能是正常的。",
          "**CRM 身分聲明：** 兩個聲明資料表共 276,552 列，而對應的綁定匯出資料是空的。我們無法判斷任何聲明是否已被解決。",
        ],
        files: [
          "bq_msp_roles_review.json",
          "bq_msp_namespace_comparison_review.json",
          "bq_msp_monthly_census_review.json",
          "bq_identity_census_review.json",
          "bq_crm_quarantine_review.json",
        ],
      },
      {
        id: "pipelines",
        title: "匯入、複製及資料應用程式",
        summary: "描述客戶如何載入、複製和公開其資料的紀錄。這些紀錄沒有歸屬於任何公司或香港。",
        points: [
          "**匯入：** 250,292 列，包括 46,882 筆匯入紀錄、201,058 筆無伺服器匯入紀錄、1,795 列遷移工作及 557 個複製任務。全部 46,882 筆匯入紀錄的來源網址欄位都有內容。我們沒有開啟任何網址。",
          "**衍生匯入模型：** 六個來源共 582,045 列。其中一個是另一個的子集，兩個大型模型內容完全相同。",
          "**資料應用程式：** 315,932 列，涵蓋 42,640 個應用程式、227,864 個端點及 45,428 個發布項目。21,246 個發布項目的 SQL 範本欄位有內容，這並不顯示曾執行查詢，或有任何資料可被存取。",
        ],
        files: [
          "bq_import_presence_review.json",
          "bq_derived_imports_review.json",
          "bq_dataapp_review.json",
        ],
      },
      {
        id: "quality",
        title: "品質檢查",
        summary: "我們以精確的數值重讀較早的工作，確認四捨五入沒有改變任何結果。",
        points: [
          "我們重讀了 29 個資料表（7,951,942 列）。其中四個含有小數，而當中三個如果使用一般電腦的四捨五入，部分數值會改變。",
          "重新執行依賴它們的分析，結果相同：574,311 列銷售紀錄及 86,741 列市場推廣系統公司紀錄均沒有改變。",
        ],
        files: ["bq_numeric_precision_review.json"],
      },
    ],
    support: {
      title: "連到公司名稱的支援資料",
      body: `支援紀錄的連結不如帳單連結確定：支援要求中可編輯的網址含有帳戶和叢集的參考資料，只能提供背景，不能證明擁有權。我們檢視了 ${facts.supportRecords} 筆不同的支援紀錄，涉及 ${facts.supportCompanies} 個名稱及 51 組「公司加叢集」組合。${facts.supportSqlRecords} 筆含有類似 SQL 的文字，可能是範例查詢、疑難排解或第三方資料。針對性的自動檢查，在這些紀錄中沒有發現非佔位符的資料庫連線字串或 MySQL 密碼參數。這不代表憑證不存在：其他格式、圖片及內嵌壓縮檔不在檢查範圍內。我們沒有測試任何憑證。`,
      headers: [
        "公司名稱",
        "支援紀錄",
        "含 SQL 類程式碼區塊",
        "涉及的叢集",
        "出現在閘道日誌",
        "閘道紀錄",
      ],
      rows: [
        ["Shoplazza Hongkong Limited", "19", "13", "4", "0", "0"],
        ["Wetech Trading Limited", "232", "44", "40", "0", "0"],
        ["STARLING LABS LIMITED", "12", "4", "1", "0", "0"],
        ["SHOPLINE COMMERCE PTE. LTD.", "9", "5", "2", "0", "0"],
        ["Amber AI Limited", "9", "0", "1", "0", "0"],
        ["Matrixport Technologies Ltd.", "2", "2", "1", "0", "0"],
        ["MEGAHARD LIMITED", "3", "0", "2", "1", "11,594"],
      ],
    },
    repos: {
      title: "與較早公司名稱配對的財務資料列",
      body: "這些是原始碼壓縮檔內某個財務檔案中的資料列。每一列都與我們較早檢視中的帳戶字串完全吻合。至於公司與帳戶之間的連結，則是那些檢視所得的歷史候選配對。",
      headers: ["公司名稱", "財務資料列", "帳單月份"],
      rows: [
        ["AsiaPac Net Media Limited", "32", "2023-10 至 2026-05"],
        ["MEGAHARD LIMITED", "4", "2026-04 至 2026-05"],
        ["Shoplazza Hongkong Limited", "33", "2023-10 至 2026-05"],
        ["Wetech Trading Limited", "33", "2023-10 至 2026-05"],
      ],
      note: "資料列可以重複同一個帳戶及月份，所以這些數字並非發票、客戶或事件的數目。只有 AsiaPac 的資料列中有 29 列的發票參考欄位有內容。請勿把這些資料列加到較早的帳單數字上。",
    },
    linkage: {
      title: "從帳單帳戶到閘道日誌的候選連結",
      body: "另一條途徑從財務帳戶紀錄中明確的租戶編號出發，依據對應關係找到叢集，再在閘道日誌中配對這些叢集。這條途徑只限於目錄中已有的名稱，因此包括非香港及身分未明的名稱。排除後剩下 305 個候選叢集，其中 30 個與日誌吻合，涉及 9 個租戶及 7 個名稱，共 124,052 筆閘道紀錄。下表列出這七個吻合的名稱。",
      headers: ["公司名稱", "候選租戶", "候選叢集", "在日誌中出現的叢集", "閘道紀錄"],
      rows: [
        ["CHAINBASE TECHNOLOGY HOLDINGS PTE. LTD.", "1", "15", "7", "23,390"],
        ["HK FUTURE INIGHT TECH LIMITED", "1", "2", "1", "16"],
        ["Hytto Limited", "2", "14", "2", "24"],
        ["MEGAHARD LIMITED", "2", "15", "14", "99,465"],
        ["Metaverse Cloud Solution Limited", "1", "2", "1", "55"],
        ["OceanBase Hong Kong Limited", "1", "35", "1", "5"],
        ["Wetech Trading Limited", "2", "166", "4", "1,097"],
      ],
      note: "這些只是歷史上的候選關聯。叢集的建立日期可以解析，而且沒有任何吻合的日誌活動早於叢集建立時間，但這不能證明整段期間的擁有權。快照式的對應關係、經銷商、已刪除的資源和缺失的日誌，都限制了這些資料能說明的事情。請不要把這些數字與以支援紀錄為基礎的數字相加，因為兩者的重疊尚未釐清。",
    },
    updates: {
      title: "更新紀錄",
      intro: "評估仍在進行。日期及時間為香港時間（HKT）。",
      earlier: {
        title: "較早的評估版本",
        body: "直至 0.14 版（2026 年 10 月 21 日）的版本，加入了閘道日誌及一般壓縮檔的檢視，其後陸續加入多批 BigQuery 檢視。詳細的版本說明載於專案在 [GitHub](https://github.com/chocochu/pingcap-hk-assessment) 的歷史紀錄中。",
      },
    },
    downloads: {
      title: "下載",
      intro:
        "已遮蓋的證據檔案。檔案保留公司名稱、來源中記錄的網域（擁有權未經核實）、彙總數字及來源參考，不含個人姓名和電郵、憑證、客戶 IP 位址及端點，以及租戶或叢集編號，亦不包括原始的外洩紀錄。每個檔案的校驗碼載於 [SHA256SUMS.txt](evidence:SHA256SUMS.txt)。",
      groups: [
        {
          title: "由此開始",
          files: [
            { file: "priority_findings.csv", label: "九家公司個案（表格）" },
            { file: "business_labels.csv", label: `全部 ${facts.namesScreened} 個篩選名稱` },
            { file: "public_context.json", label: "用來確認身分的公開資料來源" },
            { file: "methodology.json", label: "分析方法" },
          ],
        },
        {
          title: "公司個案背後的證據",
          files: [
            { file: "billing_evidence.csv", label: "帳戶與帳單配對（30 組）" },
            { file: "account_evidence.csv", label: "帳戶及商業紀錄（231 筆）" },
            { file: "marketplace_evidence.csv", label: "市集配對（76 組）" },
            { file: "support_material_evidence.csv", label: "支援紀錄（286 筆）" },
            { file: "gateway_context.csv", label: "閘道日誌摘要" },
            { file: "business_label_sources.csv", label: "每個篩選名稱的來源" },
            { file: "all_source_label_index.csv", label: "較早的 516 個完全吻合名稱索引" },
          ],
        },
        {
          title: "BigQuery：公司名稱及地點",
          files: [
            { file: "bq_company_candidates.csv", label: "已檢視的公司名稱" },
            { file: "bq_discovery_review.json", label: "候選紀錄檢視及身分來源" },
            { file: "bq_linkage_review.json", label: "帳單帳戶到閘道的候選連結" },
            { file: "bq_coverage.json", label: "涵蓋範圍及限制" },
            { file: "bq_account_additions_review.json", label: "另外四個帳戶名稱" },
            { file: "bq_hubspot_additions_review.json", label: "市場推廣系統的公司名稱" },
            {
              file: "bq_hubspot_identity_context_v2_review.json",
              label: "公開身分背景（第 2 組）",
            },
            {
              file: "bq_hubspot_identity_context_v3_review.json",
              label: "公開身分背景（第 3 組）",
            },
          ],
        },
        {
          title: "BigQuery：銷售、支援及收費結構",
          files: [
            { file: "bq_commercial_review.json", label: "商業地理資料" },
            { file: "bq_commercial_links_review.json", label: "已連結的合約、報價及銷售機會" },
            { file: "bq_support_review.json", label: "支援系統關聯" },
            { file: "bq_support_content_review.json", label: "支援留言及附件（只記錄有否內容）" },
            { file: "bq_sales_content_review.json", label: "銷售通話逐字稿（只記錄有否內容）" },
            { file: "bq_nexus_commercial_parents_review.json", label: "NexusCRM 報價及合約" },
            { file: "bq_nexus_line_items_review.json", label: "NexusCRM 明細項目" },
            { file: "bq_crm_documents_review.json", label: "CRM 文件中繼資料" },
            { file: "bq_crm_raw_documents_review.json", label: "CRM 文件原始快照" },
            { file: "bq_crm_quarantine_review.json", label: "CRM 身分聲明" },
            { file: "bq_msp_roles_review.json", label: "收費模型的角色" },
            { file: "bq_msp_namespace_comparison_review.json", label: "收費模型比較" },
            { file: "bq_msp_monthly_census_review.json", label: "每月收費模型" },
            { file: "bq_identity_census_review.json", label: "身分模型" },
            {
              file: "bq_analytics_users_review.json",
              label: "分析使用者匯出資料：地點及欄位存在情況",
            },
          ],
        },
        {
          title: "BigQuery：憑證、匯入及資料應用程式",
          files: [
            { file: "bq_material_review.json", label: "SQL 編輯器及 API 紀錄（欄位是否存在）" },
            { file: "bq_integration_presence_review.json", label: "CRM 整合欄位（是否存在）" },
            { file: "bq_auth_presence_review.json", label: "驗證欄位（是否存在）" },
            { file: "bq_dataapp_review.json", label: "資料應用程式" },
            { file: "bq_import_presence_review.json", label: "匯入及複製欄位" },
            { file: "bq_derived_imports_review.json", label: "衍生匯入模型" },
            { file: "bq_numeric_precision_review.json", label: "數值精確度檢查" },
          ],
        },
        {
          title: "原始碼壓縮檔",
          files: [
            { file: "repos_company_materials.csv", label: "原始碼壓縮檔按公司補充的內容（表格）" },
            { file: "repos_findings.json", label: "發現及限制" },
            { file: "repos_coverage.json", label: "涵蓋範圍及限制" },
            { file: "repos_validation.json", label: "驗證及檢視結果" },
          ],
        },
        {
          title: "核實",
          files: [
            { file: "input_sha256.txt", label: "輸入壓縮檔的校驗碼" },
            { file: "validation_summary.json", label: "驗證及檢視結果" },
          ],
        },
      ],
    },
  },
};
