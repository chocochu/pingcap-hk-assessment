import type { HkLink, Localized, Rich, Strength } from "../types";

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
  /** What kind of Hong Kong connection public sources show. */
  hkLink: HkLink;
  /** Evidence reference IDs in billing_evidence.csv. */
  refs: string[];
  /** Other billing labels described in this profile but kept apart from its counts. */
  otherLabels?: string[];
  /** Billing record count for each reference, in the same order. */
  billingRecords: number[];
  records: { support: boolean; logs: boolean; repo: boolean };
  strength: { billing: Strength; support?: Strength; logs?: Strength; repo?: Strength };
  /** Public pages used to confirm the Hong Kong connection. */
  sources: string[];
  text: Localized<CompanyText>;
}

const profiles: Company[] = [
  {
    id: "shoplazza",
    name: "Shoplazza Hongkong Limited",
    hkLink: "registered",
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
    hkLink: "registered",
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
    hkLink: "based",
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
    hkLink: "registered",
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
    hkLink: "based",
    refs: ["B005", "B028"],
    otherLabels: ["AsiaPac Net Media Limited*"],
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
    hkLink: "based",
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
    hkLink: "registered",
    refs: ["B011"],
    otherLabels: ["Oceanbase"],
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
    hkLink: "group",
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
    hkLink: "registered",
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
  {
    id: "amber-ai",
    name: "Amber AI Limited",
    hkLink: "group",
    refs: ["B008"],
    billingRecords: [390],
    records: { support: true, logs: false, repo: false },
    strength: { billing: "strong", support: "medium" },
    sources: [
      "https://www.hkstp.org/en/directory/information-communications-technology/amber-ai-services-limited",
      "https://www.cr.gov.hk/docs/wrpt/RNC063_2022.12.12-2022.12.18.pdf",
    ],
    text: {
      en: {
        hk: "Amber Group’s Hong Kong company, Amber AI Services Limited, is on the Hong Kong Companies Registry and in the Hong Kong Science Park directory. The account name in the files, “Amber AI Limited”, isn’t an exact match, and the records list Singapore as well as Hong Kong.",
        found: [
          "**390 billing records**, dated August 2022 to August 2024.",
          "**9 technical support records** are linked to the company.",
          "**Sales-call transcripts:** 2 recorded calls, with 184 transcribed lines, are linked to the account. We haven’t published any of their content.",
        ],
        careful:
          "We can’t tell which Amber Group company held this account. Don’t read it as covering every Amber company, or as a sign that its customers’ assets were affected.",
      },
      "zh-Hant": {
        hk: "Amber Group 的香港公司 Amber AI Services Limited 載於香港公司註冊處紀錄及香港科學園的公司名錄。檔案中的帳戶名稱「Amber AI Limited」並非完全吻合，紀錄中的地區除香港外亦有新加坡。",
        found: [
          "**390 筆帳單紀錄**，日期為 2022 年 8 月至 2024 年 8 月。",
          "**9 筆技術支援紀錄**與該公司有關。",
          "**銷售通話文字紀錄：**有 2 次錄音通話、共 184 行轉錄文字與該帳戶有關。我們沒有公開任何內容。",
        ],
        careful:
          "我們無法判斷持有這個帳戶的是 Amber Group 旗下哪一家公司。請勿把它理解為涵蓋所有 Amber 公司，或視為其客戶資產受影響的跡象。",
      },
    },
  },
  {
    id: "baidu-hk",
    name: "Baidu (HONG KONG) Limited",
    hkLink: "registered",
    refs: ["B007"],
    billingRecords: [20],
    records: { support: true, logs: false, repo: false },
    strength: { billing: "strong", support: "clue" },
    sources: ["https://www.sec.gov/Archives/edgar/data/1329099/000114554908001006/h02175e20vf.htm"],
    text: {
      en: {
        hk: "Baidu’s annual filing with the US Securities and Exchange Commission names Baidu (Hong Kong) Limited as its Hong Kong subsidiary, set up in November 2007.",
        found: [
          "**20 billing records**, dated April 2022 to April 2025.",
          "The sales system labels it “Customer”, with a first order in June 2022, while other status fields say “Prospecting” and “POC” (proof of concept).",
          "**6 support tickets**, with 64 comments and 13 attachments, belong to a support-system organisation with exactly the same name. That match is by name only.",
        ],
        careful:
          "Baidu is a large group. This is one account under its Hong Kong subsidiary’s name. It doesn’t tell us which Baidu business used it, and nothing here shows that Baidu’s own systems or users were affected.",
      },
      "zh-Hant": {
        hk: "百度向美國證券交易委員會提交的年報，列明 Baidu (Hong Kong) Limited 為其香港附屬公司，於 2007 年 11 月成立。",
        found: [
          "**20 筆帳單紀錄**，日期為 2022 年 4 月至 2025 年 4 月。",
          "銷售系統把它標示為「Customer」（客戶），首張訂單在 2022 年 6 月，但其他狀態欄位卻是「Prospecting」（洽談中）及「POC」（概念驗證）。",
          "支援系統中一個名稱完全相同的機構有 **6 張支援工單**，連同 64 則留言及 13 個附件。這只是名稱配對。",
        ],
        careful:
          "百度是大型集團，這只是以其香港附屬公司名義開設的一個帳戶。它不能說明是百度哪一項業務在使用，也沒有任何跡象顯示百度自己的系統或用戶受影響。",
      },
    },
  },
  {
    id: "bit-com",
    name: "Bit.com",
    hkLink: "group",
    refs: ["B009"],
    billingRecords: [95],
    records: { support: false, logs: false, repo: false },
    strength: { billing: "strong" },
    sources: [
      "https://www.bit.com/bit-formerly-matrixport",
      "https://images.bitexch.co/legal/240819/01.pdf",
    ],
    text: {
      en: {
        hk: "Bit.com is a brand of the Matrixport group (renamed BIT in March 2026), which says it is headquartered in Singapore and has Hong Kong companies. Bit.com isn’t a Hong Kong company in its own right.",
        found: [
          "**95 billing records**, dated September 2022 to July 2023.",
          "This is a separate account from Matrixport Technologies Ltd., so don’t add the two billing counts together.",
        ],
        careful:
          "Bit.com is a website and brand, not a single company, so we can’t say which legal entity held this account. Nothing here shows that customers’ assets were affected.",
      },
      "zh-Hant": {
        hk: "Bit.com 是 Matrixport 集團（2026 年 3 月改名為 BIT）的品牌。該集團表示總部設於新加坡，並設有香港公司。Bit.com 本身並不是一家香港公司。",
        found: [
          "**95 筆帳單紀錄**，日期為 2022 年 9 月至 2023 年 7 月。",
          "這是與 Matrixport Technologies Ltd. 分開的帳戶，兩者的帳單紀錄數目不應相加。",
        ],
        careful:
          "Bit.com 是網站及品牌，而非單一公司，因此我們無法說明持有這個帳戶的是哪一個法律實體。沒有任何跡象顯示客戶資產受影響。",
      },
    },
  },
  {
    id: "clink-lab",
    name: "CLINK LAB LIMITED",
    hkLink: "registered",
    refs: ["B020"],
    billingRecords: [48],
    records: { support: false, logs: false, repo: false },
    strength: { billing: "strong" },
    sources: [
      "https://www.cr.gov.hk/docs/wrpt/wk_new&changednamecoys_20251117.pdf",
      "https://ezenhancer.ai/agreement/terms-and-conditions/",
    ],
    text: {
      en: {
        hk: "The Hong Kong Companies Registry lists Clink Lab Limited as incorporated in November 2025. App terms of service name it as a Hong Kong company that takes payments on the app’s behalf.",
        found: [
          "**48 billing records**, dated April to August 2026.",
          "The sales system labels it “Customer” with a Hong Kong billing country, but its production flag is “No”.",
        ],
        careful:
          "Clink handles payments for other apps, so this account may relate to its platform rather than to a single business. Nothing here shows that its merchants, their customers or any payment details were exposed.",
      },
      "zh-Hant": {
        hk: "香港公司註冊處紀錄顯示 Clink Lab Limited 於 2025 年 11 月註冊成立。有應用程式的服務條款列明它是代該程式收款的香港公司。",
        found: [
          "**48 筆帳單紀錄**，日期為 2026 年 4 月至 8 月。",
          "銷售系統把它標示為「Customer」（客戶），帳單國家為香港，但正式使用欄位是「No」。",
        ],
        careful:
          "Clink 為其他應用程式處理付款，因此這個帳戶可能與其平台有關，而非屬於單一企業。沒有任何跡象顯示其商戶、商戶的客戶或任何付款資料外洩。",
      },
    },
  },
  {
    id: "eats365",
    name: "Eats365",
    hkLink: "group",
    refs: ["B015"],
    billingRecords: [48],
    records: { support: false, logs: false, repo: false },
    strength: { billing: "strong" },
    sources: [
      "https://www.hkstp.org/en/directory/information-communications-technology/eats365-solutions-limited",
      "https://www.hkstp.org/media/x1ta5fjs/smart-city-iot-directory-2020-web.pdf",
      "https://www.eats365pos.com/hk/blog/post/2023-hofex-eats365-limited-offer",
    ],
    text: {
      en: {
        hk: "Eats365 is a restaurant-software group headquartered in Hong Kong, listed in the Hong Kong Science Park directory. Several Eats365 companies exist, and the account name doesn’t tell us which one this is.",
        found: [
          "**48 billing records**, dated March to September 2024.",
          "The sales system gives a Hong Kong billing country and labels it “Customer”, with its production flag set to “No”.",
          "The website recorded in the sales system (pos-nz.com) doesn’t match Eats365’s official websites.",
        ],
        careful:
          "Because the website doesn’t match, we can’t be sure this account belongs to Eats365 at all. Nothing here shows that restaurant or diner data was exposed.",
      },
      "zh-Hant": {
        hk: "Eats365 是總部設於香港的餐飲軟件集團，載於香港科學園的公司名錄。Eats365 旗下有多家公司，帳戶名稱無法讓我們判斷是哪一家。",
        found: [
          "**48 筆帳單紀錄**，日期為 2024 年 3 月至 9 月。",
          "銷售系統記錄的帳單國家為香港，並標示為「Customer」（客戶），但正式使用欄位是「No」。",
          "銷售系統內記錄的網站（pos-nz.com）與 Eats365 的官方網站不符。",
        ],
        careful:
          "由於網站不符，我們甚至無法確定這個帳戶屬於 Eats365。沒有任何跡象顯示餐廳或食客的資料外洩。",
      },
    },
  },
  {
    id: "hk-future-insight",
    name: "HK FUTURE INIGHT TECH LIMITED",
    hkLink: "registered",
    refs: ["B017"],
    billingRecords: [64],
    records: { support: false, logs: true, repo: false },
    strength: { billing: "strong", logs: "clue" },
    sources: ["https://www.cr.gov.hk/docs/wrpt/RNC063_2024.04.08-2024.04.14.pdf"],
    text: {
      en: {
        hk: "The Hong Kong Companies Registry lists HK Future **Insight** Tech Limited, incorporated in April 2024. The name in the files is spelled “INIGHT”, so this is very likely the same company, but we can’t be certain.",
        found: [
          "**64 billing records**, dated May 2025 to May 2026.",
          "The sales system labels it a “Partner” with a Hong Kong billing country and a first order in June 2025. Its production flag is “No”.",
          "A later BigQuery review links one server cluster to the company’s account, with 16 gateway log records. This is a candidate match, not proof.",
        ],
        careful:
          "A “Partner” may resell the service to others, so this account could have served other businesses. We can’t tell whose data, if any, sat behind it.",
      },
      "zh-Hant": {
        hk: "香港公司註冊處紀錄列有 HK Future **Insight** Tech Limited，於 2024 年 4 月註冊成立。檔案中的名稱拼寫為「INIGHT」，所以很可能是同一家公司，但我們無法確定。",
        found: [
          "**64 筆帳單紀錄**，日期為 2025 年 5 月至 2026 年 5 月。",
          "銷售系統把它標示為「Partner」（合作夥伴），帳單國家為香港，首張訂單在 2025 年 6 月。其正式使用欄位是「No」。",
          "較後的 BigQuery 檢視把一個伺服器叢集連到該公司的帳戶，涉及 16 筆閘道日誌紀錄。這只是候選配對，並非證明。",
        ],
        careful:
          "「Partner」可能會把服務轉售給其他人，所以這個帳戶可能曾服務其他企業。我們無法得知其背後是誰的資料，甚至是否有任何資料。",
      },
    },
  },
  {
    id: "matrixport",
    name: "Matrixport Technologies Ltd.",
    hkLink: "group",
    refs: ["B010"],
    billingRecords: [809],
    records: { support: true, logs: false, repo: false },
    strength: { billing: "strong", support: "medium" },
    sources: [
      "https://www.bit.com/bit-formerly-matrixport",
      "https://images.bitexch.co/legal/240819/01.pdf",
    ],
    text: {
      en: {
        hk: "Matrixport (renamed BIT in March 2026) says it is headquartered in Singapore and has Hong Kong companies. The records for this account name Singapore and China, not Hong Kong.",
        found: [
          "**809 billing records**, dated September 2022 to March 2026.",
          "**2 technical support records** are linked to the company. Both contain database-style code (SQL).",
          "Bit.com, a Matrixport brand, has its own separate account.",
        ],
        careful:
          "This is a group-level Hong Kong link. Don’t assign this account to the group’s Hong Kong companies, or read it as a sign that customers’ assets were affected.",
      },
      "zh-Hant": {
        hk: "Matrixport（2026 年 3 月改名為 BIT）表示總部設於新加坡，並設有香港公司。這個帳戶的紀錄列出的地區是新加坡及中國，而不是香港。",
        found: [
          "**809 筆帳單紀錄**，日期為 2022 年 9 月至 2026 年 3 月。",
          "**2 筆技術支援紀錄**與該公司有關，兩筆都含有類似資料庫指令（SQL）的程式碼。",
          "Matrixport 旗下品牌 Bit.com 另有獨立帳戶。",
        ],
        careful:
          "這只是集團層面與香港的關聯。請勿把這個帳戶歸到集團的香港公司，也不要視為客戶資產受影響的跡象。",
      },
    },
  },
  {
    id: "metaverse-cloud",
    name: "Metaverse Cloud Solution Limited",
    hkLink: "based",
    refs: ["B016"],
    billingRecords: [31],
    records: { support: false, logs: true, repo: false },
    strength: { billing: "strong", logs: "clue" },
    sources: ["https://metaverse-hk.cloud/"],
    text: {
      en: {
        hk: "The company’s own website (metaverse-hk.cloud) gives a Hong Kong office address in Tsim Sha Tsui. The sales system records a different website, metaverse-sg.cloud, which we haven’t verified.",
        found: [
          "**31 billing records**, all in July 2024.",
          "The sales system labels it “Customer” with a Hong Kong billing country, but its status is “POC” (proof of concept) and its production flag is “No”.",
          "A later BigQuery review links one server cluster to the company’s account, with 55 gateway log records. This is a candidate match, not proof.",
        ],
        careful:
          "The records point to a short proof of concept. They don’t show production use, or that the company’s own clients were affected.",
      },
      "zh-Hant": {
        hk: "該公司自家網站（metaverse-hk.cloud）列出位於尖沙咀的香港辦公室地址。銷售系統記錄的卻是另一個網站 metaverse-sg.cloud，我們未有核實。",
        found: [
          "**31 筆帳單紀錄**，全部在 2024 年 7 月。",
          "銷售系統把它標示為「Customer」（客戶），帳單國家為香港，但狀態是「POC」（概念驗證），正式使用欄位是「No」。",
          "較後的 BigQuery 檢視把一個伺服器叢集連到該公司的帳戶，涉及 55 筆閘道日誌紀錄。這只是候選配對，並非證明。",
        ],
        careful: "紀錄顯示這是短期的概念驗證，並不顯示正式使用，也不顯示該公司自己的客戶受影響。",
      },
    },
  },
  {
    id: "shopline-commerce",
    name: "SHOPLINE COMMERCE PTE. LTD.",
    hkLink: "group",
    refs: ["B014"],
    billingRecords: [867],
    records: { support: true, logs: false, repo: false },
    strength: { billing: "strong", support: "medium" },
    sources: [
      "https://shopline.hk/en/faq/about",
      "https://www.pingcap.com/case-study/shopline-slash-cluster-cost-with-tidb/",
    ],
    text: {
      en: {
        hk: "SHOPLINE says it was founded in Hong Kong in 2013. This account belongs to its Singapore company (“PTE. LTD.”), and the sales system gives Singapore as its billing country.",
        found: [
          "**867 billing records**, dated June 2022 to August 2025.",
          "**9 technical support records** are linked to the company. 5 contain database-style code (SQL).",
          "The sales system labels it “Customer”, but its production flag is “No”.",
        ],
        careful:
          "Don’t combine this with STARLING LABS LIMITED, SHOPLINE’s Hong Kong contracting company, which has its own profile. Nothing here shows that SHOPLINE merchants or their shoppers were affected.",
      },
      "zh-Hant": {
        hk: "SHOPLINE 表示於 2013 年在香港創立。這個帳戶屬於其新加坡公司（「PTE. LTD.」），銷售系統記錄的帳單國家亦為新加坡。",
        found: [
          "**867 筆帳單紀錄**，日期為 2022 年 6 月至 2025 年 8 月。",
          "**9 筆技術支援紀錄**與該公司有關，其中 5 筆含有類似資料庫指令（SQL）的程式碼。",
          "銷售系統把它標示為「Customer」（客戶），但正式使用欄位是「No」。",
        ],
        careful:
          "請勿把它與 STARLING LABS LIMITED（SHOPLINE 的香港簽約公司，另有個別簡介）混為一談。沒有任何跡象顯示 SHOPLINE 商戶或其顧客受影響。",
      },
    },
  },
];

/** Every company whose account matches billing records by exact ID, in alphabetical order. */
export const companies: Company[] = profiles.sort((a, b) =>
  a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
);
