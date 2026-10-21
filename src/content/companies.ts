import type { Localized, Rich, Strength } from "../types";

export interface CompanyText {
  /** What we confirmed about the Hong Kong connection. */
  hk: Rich;
  /** What the files contain, as short statements. */
  found: Rich[];
  /** What this does not show. */
  careful: Rich;
}

export interface Company {
  id: string;
  /** Exactly as written in the source files; never translated. */
  name: string;
  /** Evidence reference IDs in billing_evidence.csv. */
  refs: string[];
  /** Billing record count for each reference, in the same order. */
  billingRecords: number[];
  records: { support: boolean; logs: boolean; repo: boolean };
  strength: { billing: Strength; support?: Strength; logs?: Strength; repo?: Strength };
  /** Public pages used to confirm the Hong Kong connection. */
  sources: string[];
  text: Localized<CompanyText>;
}

export const companies: Company[] = [
  {
    id: "shoplazza",
    name: "Shoplazza Hongkong Limited",
    refs: ["B003"],
    billingRecords: [800],
    records: { support: true, logs: false, repo: true },
    strength: { billing: "strong", support: "medium", repo: "medium" },
    sources: [
      "https://www.shoplazza.com/privacy",
      "https://www.shoplazza.cn/pages/hk-shoplazza-payments-terms-and-service",
      "https://www.cr.gov.hk/docs/wrpt/RNC063_2018.08.13-2018.08.19.pdf",
    ],
    text: {
      en: {
        hk: "Official terms identify Shoplazza Hongkong Limited as a Hong Kong legal entity.",
        found: [
          "**800 billing records**, dated March 2022 to July 2026.",
          "**19 technical support records** are linked to the company. 13 of them contain database-style code (SQL).",
          "The sales system contradicts itself: one field says the account is in production use, another says “Prospecting”.",
          "We found no link to the gateway logs we were given.",
          "**A source-code archive** also lists the company’s exact account ID in a production-named delivery configuration and in alert-routing settings, and holds **33 finance rows** for it (billing months October 2023 to May 2026). Configuration files don’t prove the service was deployed or that alerts were sent.",
        ],
        careful:
          "The conflicting labels in the sales system mean we can’t say how the company actually used the service. The source-code archive links are historical. They don’t show current use, a customer-database compromise, or exposure of the company’s own customers.",
      },
      "zh-Hant": {
        hk: "官方條款確認 Shoplazza Hongkong Limited 為香港法律實體。",
        found: [
          "**800 筆帳單紀錄**，日期為 2022 年 3 月至 2026 年 7 月。",
          "**19 筆技術支援紀錄**與該公司有關，其中 13 筆含有類似資料庫指令（SQL）的程式碼。",
          "銷售系統的資料自相矛盾：一個欄位顯示帳戶已投入正式使用，另一個狀態卻是「Prospecting」（洽談中）。",
          "在我們取得的閘道日誌中，找不到相關連結。",
          "**一個原始碼壓縮檔**亦在名稱含「production」（正式環境）的部署設定及警報轉送設定中，列出該公司完全吻合的帳戶編號，並存有 **33 列財務紀錄**（帳單月份為 2023 年 10 月至 2026 年 5 月）。設定檔不能證明服務曾經部署，或警報曾經發出。",
        ],
        careful:
          "銷售系統內的標示互相衝突，因此我們無法判斷該公司實際上如何使用這項服務。原始碼壓縮檔中的關聯屬歷史資料，並不顯示目前仍在使用、客戶資料庫外洩，或該公司自己的客戶受影響。",
      },
    },
  },
  {
    id: "starling-labs",
    name: "STARLING LABS LIMITED",
    refs: ["B012"],
    billingRecords: [1150],
    records: { support: true, logs: false, repo: false },
    strength: { billing: "strong", support: "medium" },
    sources: [
      "https://shopline.sg/terms",
      "https://blog.shopline.tw/shopline-guidelines-for-sharing-and-republishing-content/",
      "https://www.pingcap.com/case-study/shopline-slash-cluster-cost-with-tidb/",
    ],
    text: {
      en: {
        hk: "Linked to the SHOPLINE brand through public terms, marketplace records that use the shopline.com domain, and linked support records. The website address in the sales system (starlinglabs.com) is not independently verified.",
        found: [
          "**1,150 billing records**, dated August 2023 to July 2026.",
          "**12 technical support records** are linked to the company. 4 contain database-style code (SQL).",
          "The sales system labels it both “Commitment Plan” and “Customer”, yet its production flag is “No”.",
        ],
        careful:
          "Don’t combine this with SHOPLINE COMMERCE PTE. LTD., a separate Singapore entity, or assume that marketplace aliases belong to the same account.",
      },
      "zh-Hant": {
        hk: "公開條款、使用 shopline.com 網域的市集紀錄，以及相關的支援紀錄，都指向 SHOPLINE 品牌。銷售系統內記錄的網站（starlinglabs.com）未經獨立核實。",
        found: [
          "**1,150 筆帳單紀錄**，日期為 2023 年 8 月至 2026 年 7 月。",
          "**12 筆技術支援紀錄**與該公司有關，其中 4 筆含有類似資料庫指令（SQL）的程式碼。",
          "銷售系統同時標示為「Commitment Plan」與「Customer」，但正式使用欄位卻是「No」。",
        ],
        careful:
          "請勿將它與 SHOPLINE COMMERCE PTE. LTD.（另一家新加坡實體）混為一談，也不要假設市集上的別名屬於同一個帳戶。",
      },
    },
  },
  {
    id: "wetech",
    name: "Wetech Trading Limited",
    refs: ["B013", "B029", "B030"],
    billingRecords: [18200, 329, 31],
    records: { support: true, logs: true, repo: true },
    strength: { billing: "strong", support: "medium", logs: "clue", repo: "medium" },
    sources: ["https://wetechtl.cloud/contact/"],
    text: {
      en: {
        hk: "The company’s own website declares a Hong Kong location. We haven’t independently confirmed where it is incorporated.",
        found: [
          "**Three billing groups** (18,200, 329 and 31 records), covering July 2023 to August 2026.",
          "**232 technical support records**, 44 of which contain database-style code (SQL).",
          "A later BigQuery review links four server clusters to the company’s accounts, with 1,097 gateway log records. This is a candidate match, not proof.",
          "**A source-code archive** also lists the company’s exact account ID in a production-named delivery configuration, with report settings for its organisation and clusters and stored diagnostic and evaluation samples. It holds **33 finance rows** for it (October 2023 to May 2026).",
        ],
        careful:
          "Wetech is a hosting provider, so its resources can’t be assigned to its own customers. We can’t tell whose data sat behind these accounts. The source-code archive links are historical. They don’t show current use, a customer-database compromise, or exposure of the company’s own customers.",
      },
      "zh-Hant": {
        hk: "該公司自家網站聲明其位於香港。我們尚未獨立確認它在何處註冊成立。",
        found: [
          "**三組帳單紀錄**（18,200、329 及 31 筆），涵蓋 2023 年 7 月至 2026 年 8 月。",
          "**232 筆技術支援紀錄**，其中 44 筆含有類似資料庫指令（SQL）的程式碼。",
          "較後的 BigQuery 檢視把四個伺服器叢集連到該公司的帳戶，涉及 1,097 筆閘道日誌紀錄。這只是候選配對，並非證明。",
          "**一個原始碼壓縮檔**亦在名稱含「production」（正式環境）的部署設定中列出該公司完全吻合的帳戶編號，並附有其機構及叢集的報表設定，以及儲存的診斷和評估樣本。壓縮檔內另有 **33 列財務紀錄**（2023 年 10 月至 2026 年 5 月）。",
        ],
        careful:
          "Wetech 是寄存服務供應商，因此其資源不能直接算作其客戶的資源。我們無法得知這些帳戶背後是誰的資料。原始碼壓縮檔中的關聯屬歷史資料，並不顯示目前仍在使用、客戶資料庫外洩，或該公司自己的客戶受影響。",
      },
    },
  },
  {
    id: "megahard",
    name: "MEGAHARD LIMITED",
    refs: ["B019", "B021", "B022", "B023", "B024", "B025", "B026", "B027"],
    billingRecords: [76, 76, 18, 5, 5, 22, 4630, 127],
    records: { support: true, logs: true, repo: true },
    strength: { billing: "strong", support: "medium", logs: "medium", repo: "medium" },
    sources: [
      "https://www.cr.gov.hk/docs/wrpt/RNC063_2025.02.17-2025.02.23.pdf",
      "https://megahardlimited.com/contact/",
      "https://megahardlimited.com/",
    ],
    text: {
      en: {
        hk: "A past Hong Kong incorporation, and the company states its headquarters is in Hong Kong. We treat the link between the registry entry and its website domain with some caution.",
        found: [
          "**Eight billing groups**, the largest with 4,630 records.",
          "**3 support records** mention two server clusters. One of them appears in the gateway logs, with **11,594 records** between 8 June and 3 October 2026. Almost all (11,591) were successful requests.",
          "A later BigQuery review links 14 clusters to the company’s accounts, with 99,465 gateway records. This overlaps with the match above, so the two counts shouldn’t be added.",
          "**A source-code archive** holds **4 finance rows** (April to May 2026) that match two of the company’s historical account IDs. Other mentions of the company in that archive are only background.",
        ],
        careful:
          "We can’t prove the company owned those servers for the whole period, or say who its own customers were. The link to the logs is medium-confidence. The source-code archive links are historical. They don’t show current use, a customer-database compromise, or exposure of the company’s own customers.",
      },
      "zh-Hant": {
        hk: "該公司過去曾在香港註冊成立，並自稱總部設於香港。官方註冊記錄與其網站網域之間的連結，我們持較保留的態度。",
        found: [
          "**八組帳單紀錄**，其中最大一組有 4,630 筆。",
          "**3 筆支援紀錄**提及兩個伺服器叢集，其中一個出現在閘道日誌中，在 2026 年 6 月 8 日至 10 月 3 日間有 **11,594 筆紀錄**，幾乎全部（11,591 筆）為成功的請求。",
          "較後的 BigQuery 檢視把 14 個叢集連到該公司的帳戶，涉及 99,465 筆閘道紀錄。這與上述配對互相重疊，兩組數字不應相加。",
          "**一個原始碼壓縮檔**存有 **4 列財務紀錄**（2026 年 4 月至 5 月），與該公司兩個歷史帳戶編號吻合。該壓縮檔中對該公司的其他提及只屬背景資料。",
        ],
        careful:
          "我們無法證明該公司在整段期間都擁有那些伺服器，也無法說明它自己的客戶是誰。與日誌的關聯屬中等把握。原始碼壓縮檔中的關聯屬歷史資料，並不顯示目前仍在使用、客戶資料庫外洩，或該公司自己的客戶受影響。",
      },
    },
  },
  {
    id: "asiapac",
    name: "AsiaPac Net Media Limited",
    refs: ["B005", "B028"],
    billingRecords: [642, 6],
    records: { support: false, logs: false, repo: true },
    strength: { billing: "strong", repo: "medium" },
    sources: ["https://www.asiapacdigital.com/about"],
    text: {
      en: {
        hk: "The company’s own history page says it was founded in Hong Kong and is headquartered there.",
        found: [
          "**642 billing records** on the main account match, dated March 2022 to August 2026.",
          "A separate match adds 6 records, and a starred alias is kept apart.",
          "**A source-code archive** also lists the company’s exact account ID in a production-named delivery configuration, along with April 2023 resource and migration notes. It holds **32 finance rows** for it (October 2023 to May 2026), 29 of them with an invoice reference filled in.",
        ],
        careful:
          "This is the company’s own account and commercial information. Don’t add the aliases together, and don’t assume its advertising clients were exposed. The source-code archive links are historical. They don’t show current use, a customer-database compromise, or exposure of the company’s own customers.",
      },
      "zh-Hant": {
        hk: "該公司自家的歷史簡介指出，它在香港創立，總部也設於香港。",
        found: [
          "主要帳戶配對有 **642 筆帳單紀錄**，日期為 2022 年 3 月至 2026 年 8 月。",
          "另一組配對有 6 筆紀錄，而帶星號的別名則另行處理。",
          "**一個原始碼壓縮檔**亦在名稱含「production」（正式環境）的部署設定中列出該公司完全吻合的帳戶編號，並附有 2023 年 4 月的資源及遷移備註。壓縮檔內另有 **32 列財務紀錄**（2023 年 10 月至 2026 年 5 月），其中 29 列的發票參考欄位有內容。",
        ],
        careful:
          "這是該公司自己的帳戶及商業資料。請勿把各個別名相加，也不要假設它的廣告客戶已受影響。原始碼壓縮檔中的關聯屬歷史資料，並不顯示目前仍在使用、客戶資料庫外洩，或該公司自己的客戶受影響。",
      },
    },
  },
  {
    id: "river-game",
    name: "RIVER GAME HK LIMITED",
    refs: ["B002"],
    billingRecords: [402],
    records: { support: false, logs: false, repo: false },
    strength: { billing: "strong" },
    sources: [
      "https://www.topheroes.com/en/term_of_service.html",
      "https://www.rivergame.net/en/res/pdf/-_River_Game_HK_Limited_Compliance_EDPO_-_UK_Representative.pdf",
    ],
    text: {
      en: {
        hk: "The game’s official terms name the company, and an official document gives a Hong Kong address.",
        found: ["**402 billing records** linked to its accounts, dated July 2025 to August 2026."],
        careful: "Nothing here shows that a database of game players was exposed.",
      },
      "zh-Hant": {
        hk: "遊戲的官方條款列明該公司名稱，官方文件亦提供香港地址。",
        found: ["**402 筆帳單紀錄**連到其帳戶，日期為 2025 年 7 月至 2026 年 8 月。"],
        careful: "沒有任何跡象顯示遊戲玩家的資料庫曾經外洩。",
      },
    },
  },
  {
    id: "oceanbase",
    name: "OceanBase Hong Kong Limited",
    refs: ["B011"],
    billingRecords: [192],
    records: { support: false, logs: true, repo: false },
    strength: { billing: "strong", logs: "clue" },
    sources: [
      "https://en.oceanbase.com/legal/subcontractors-affiliates",
      "https://en.oceanbase.com/legal/service-agreement",
      "https://www.cr.gov.hk/docs/wrpt/wk_new%26changednamecoys_20220516.pdf",
    ],
    text: {
      en: {
        hk: "OceanBase’s official affiliate list confirms a Hong Kong entity.",
        found: [
          "**192 billing records**, dated June 2022 to April 2023.",
          "A separate “Oceanbase” label has 7 records in January 2026.",
          "A later BigQuery review links one server cluster to the company, with 5 gateway log records. This is a candidate match, not proof.",
        ],
        careful:
          "OceanBase makes databases, so this may be testing or evaluation rather than a live deployment. Don’t merge the two labels or call it production use.",
      },
      "zh-Hant": {
        hk: "OceanBase 的官方關聯公司名單確認其香港實體。",
        found: [
          "**192 筆帳單紀錄**，日期為 2022 年 6 月至 2023 年 4 月。",
          "另一個標示為「Oceanbase」的名稱，在 2026 年 1 月有 7 筆紀錄。",
          "較後的 BigQuery 檢視把一個伺服器叢集連到該公司，涉及 5 筆閘道日誌紀錄。這只是候選配對，並非證明。",
        ],
        careful:
          "OceanBase 本身是資料庫供應商，所以這可能只是測試或評估，而非正式部署。請勿把兩個名稱合併，也不要稱之為正式使用。",
      },
    },
  },
  {
    id: "klook",
    name: "KLOOK",
    refs: ["B004"],
    billingRecords: [7],
    records: { support: false, logs: false, repo: false },
    strength: { billing: "strong" },
    sources: ["https://www.klook.com/en-AU/conditions/", "https://www.klook.com/en-US/policy/"],
    text: {
      en: {
        hk: "Klook’s official terms name a Hong Kong operator, but the label in the files doesn’t tell us exactly which Klook entity holds the account.",
        found: [
          "**7 billing records**, from August to September 2022.",
          "The sales system marks the account as a proof of concept (POC) and as Mainland China.",
        ],
        careful:
          "This is old account information. It doesn’t show current production use, or that any traveller data was exposed.",
      },
      "zh-Hant": {
        hk: "Klook 的官方條款列明一家香港營運公司，但檔案中的名稱無法讓我們確定持有該帳戶的是哪一家 Klook 實體。",
        found: [
          "**7 筆帳單紀錄**，日期為 2022 年 8 月至 9 月。",
          "銷售系統把該帳戶標示為概念驗證（POC），並歸類為中國內地。",
        ],
        careful: "這是舊的帳戶資料，並不顯示目前仍在正式使用，也不顯示任何旅客資料外洩。",
      },
    },
  },
  {
    id: "coihub",
    name: "COIHUB TECHNOLOGY LIMITED",
    refs: ["B001"],
    billingRecords: [20],
    records: { support: false, logs: false, repo: false },
    strength: { billing: "strong" },
    sources: [
      "https://www.cr.gov.hk/docs/wrpt/RNC063_2020.08.17-2020.08.23.pdf",
      "https://www.financeaegis.com/policy",
      "https://www.cloudsteps.net/build.html",
    ],
    text: {
      en: {
        hk: "The company was incorporated in Hong Kong (a historical record), and an official platform policy names it.",
        found: ["**20 billing records**, from August to October 2022."],
        careful:
          "This is old commercial information. It says nothing about Transsion’s other companies or the people who use its products.",
      },
      "zh-Hant": {
        hk: "該公司曾在香港註冊成立（歷史紀錄），官方平台政策亦列明其名稱。",
        found: ["**20 筆帳單紀錄**，日期為 2022 年 8 月至 10 月。"],
        careful: "這是舊的商業資料，與傳音（Transsion）旗下其他公司，或其產品用戶無關。",
      },
    },
  },
];
