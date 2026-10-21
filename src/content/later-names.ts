import type { Localized } from "../types";

export interface LaterName {
  /** Exactly as written in the source files. */
  label: string;
  note: Localized;
}

/**
 * Names from the later BigQuery reviews. Labels that are already in the
 * 421-name directory get this note added to their existing entry.
 */
export const laterNames: LaterName[] = [
  {
    label: "FWD GROUP MANAGEMENT HOLDINGS LIMITED",
    note: {
      en: "Account records in two sales-system exports, with Hong Kong country fields, plus linked commercial records: 1 contract, 5 quotes and 4 opportunity records per system (the two systems may be repeating the same deals). Public sources confirm the name belongs to a Hong Kong company. This shows business-record exposure only, not insurance systems or policyholder data.",
      "zh-Hant":
        "兩個銷售系統匯出檔內有帳戶紀錄，國家欄位為香港；另有相關商業紀錄：每個系統各有 1 份合約、5 份報價及 4 筆銷售機會（兩個系統可能重複記錄同一批交易）。公開資料確認該名稱屬香港公司。這只顯示商業紀錄外洩，並不涉及保險系統或保單持有人資料。",
    },
  },
  {
    label: "Swire Properties Inc.",
    note: {
      en: "Account records with Hong Kong billing-city signals, plus two sales-lead records. Official sources link this exact name to a US (Miami) business, separate from Swire Properties Ltd. in Hong Kong, so we can’t treat it as a Hong Kong company.",
      "zh-Hant":
        "帳戶紀錄帶有香港帳單城市的跡象，另有兩筆銷售線索紀錄。官方資料把這個確切名稱連到一家美國（邁阿密）公司，與香港的太古地產有限公司（Swire Properties Ltd.）是兩回事，因此我們不能把它當作香港公司。",
    },
  },
  {
    label: "BitMEX",
    note: {
      en: "A “Prospecting” account record with Hong Kong city and state signals but a CN country field. The brand label doesn’t tell us which legal entity is behind it; BitMEX’s own notice names a Seychelles company.",
      "zh-Hant":
        "一筆「Prospecting」（洽談中）的帳戶紀錄，帶有香港城市及州份的跡象，但國家欄位為 CN。品牌名稱無法說明背後是哪個法律實體；BitMEX 自己的通告列出的是一家塞舌爾公司。",
    },
  },
  {
    label: "HANG SENG BANK LTD",
    note: {
      en: "A “Prospecting” account record. It doesn’t show a customer relationship, or any impact on banking systems or depositor data.",
      "zh-Hant":
        "一筆「Prospecting」（洽談中）的帳戶紀錄，並不顯示客戶關係，也不顯示銀行系統或存款人資料受到影響。",
    },
  },
  {
    label: "XGD Group",
    note: {
      en: "79 observations (75 of them repeated finance snapshots) with Hong Kong country fields and a “Qualified” status. Public sources tie the brand to a group headquartered in Shenzhen and don’t identify a Hong Kong subsidiary. The status doesn’t show an active, paying customer.",
      "zh-Hant":
        "79 筆觀察紀錄（其中 75 筆是重複的財務快照），國家欄位為香港，狀態為「Qualified」（已評估）。公開資料把該品牌連到一個總部在深圳的集團，並未指出任何香港子公司。這個狀態並不代表它是正在付費的活躍客戶。",
    },
  },
  {
    label: "中信银行（国际）",
    note: {
      en: "A “Prospecting” account record. The short name matches China CITIC Bank International’s branding. It doesn’t show any impact on banking systems or depositor data.",
      "zh-Hant":
        "一筆「Prospecting」（洽談中）的帳戶紀錄。這個簡稱與中信銀行（國際）的品牌相符，但並不顯示銀行系統或存款人資料受到影響。",
    },
  },
  {
    label: "China Mobile International Limited",
    note: {
      en: "Three company records in the marketing system (HubSpot) with a Hong Kong country field and no lifecycle stage. Its official headquarters document gives a Hong Kong location; it doesn’t say where the company is incorporated.",
      "zh-Hant":
        "市場推廣系統（HubSpot）內有三筆公司紀錄，國家欄位為香港，沒有生命週期階段。其官方總部文件載有香港地點，但沒有說明公司在何處註冊成立。",
    },
  },
  {
    label: "China Telecom Global Limited",
    note: {
      en: "One company record in the marketing system (HubSpot) with a Hong Kong country field. The company’s public terms say it is incorporated in Hong Kong.",
      "zh-Hant":
        "市場推廣系統（HubSpot）內有一筆公司紀錄，國家欄位為香港。該公司的公開條款指它在香港註冊成立。",
    },
  },
  {
    label: "Sun Hung Kai Properties Limited",
    note: {
      en: "One company record in the marketing system (HubSpot) with a Hong Kong country field. The company’s public articles say it is incorporated in Hong Kong. That doesn’t prove the record itself is genuine.",
      "zh-Hant":
        "市場推廣系統（HubSpot）內有一筆公司紀錄，國家欄位為香港。公司的公開章程指它在香港註冊成立，但這不能證明該筆紀錄本身屬實。",
    },
  },
  {
    label: "VTech Holdings Ltd.",
    note: {
      en: "One company record in the marketing system (HubSpot) with a Hong Kong country field. Public documents say VTech Holdings is incorporated in Bermuda with its head office in Hong Kong; no particular Hong Kong subsidiary is identified.",
      "zh-Hant":
        "市場推廣系統（HubSpot）內有一筆公司紀錄，國家欄位為香港。公開文件指偉易達控股在百慕達註冊成立、總辦事處設於香港；並未指出具體的香港子公司。",
    },
  },
  {
    label: "Sa Sa International Holdings Limited",
    note: {
      en: "One company record in the marketing system (HubSpot) with a Hong Kong country field. The company’s own pages say it is incorporated in the Cayman Islands with its head office in Chai Wan, Hong Kong. Its retail subsidiaries aren’t identified.",
      "zh-Hant":
        "市場推廣系統（HubSpot）內有一筆公司紀錄，國家欄位為香港。公司自家網頁指它在開曼群島註冊成立、總辦事處設於香港柴灣，並未指出其零售子公司。",
    },
  },
  {
    label: "CargoSmart Limited",
    note: {
      en: "One company record in the marketing system (HubSpot) with a Hong Kong country field and the stage “Subscriber”, which doesn’t prove a customer relationship or product use. Its own pages say it is incorporated in the British Virgin Islands with headquarters in Sha Tin, Hong Kong.",
      "zh-Hant":
        "市場推廣系統（HubSpot）內有一筆公司紀錄，國家欄位為香港，階段為「Subscriber」（訂閱者），這不能證明客戶關係或產品使用。公司自家網頁指它在英屬處女群島註冊成立、總部設於香港沙田。",
    },
  },
  {
    label: "PCCW-HKT DataCom Services Limited",
    note: {
      en: "One company record in the marketing system (HubSpot) with a Hong Kong country field. The internet registry IANA lists this company as manager of the .hkt domain, with a Hong Kong address. We keep it separate from PCCW Limited and HKT Limited.",
      "zh-Hant":
        "市場推廣系統（HubSpot）內有一筆公司紀錄，國家欄位為香港。互聯網註冊機構 IANA 列明該公司為 .hkt 網域的管理者，並附有香港地址。我們把它與電訊盈科有限公司及香港電訊有限公司分開處理。",
    },
  },
  {
    label: "Everbright Sun Hung Kai Company Limited",
    note: {
      en: "One sales-lead record in the marketing system (HubSpot) with a Hong Kong country field. A 2022 company announcement says this name was changed to China Everbright Securities International Company Limited, which a 2023 filing says is incorporated in Hong Kong. We keep it separate from the existing “Everbright Securities International” entry.",
      "zh-Hant":
        "市場推廣系統（HubSpot）內有一筆銷售線索紀錄，國家欄位為香港。2022 年的公司公告指此名稱已改為 China Everbright Securities International Company Limited，而 2023 年的文件指該公司在香港註冊成立。我們把它與現有的「Everbright Securities International」分開處理。",
    },
  },
  {
    label: "Neat Limited",
    note: {
      en: "One sales-lead record in the marketing system (HubSpot) with a Hong Kong country field. Public Hong Kong terms and a 2015 Companies Registry list show a company with this name (no. 2312276), but we couldn’t match it to the record itself.",
      "zh-Hant":
        "市場推廣系統（HubSpot）內有一筆銷售線索紀錄，國家欄位為香港。香港的公開條款及 2015 年公司註冊處名單顯示有同名公司（編號 2312276），但我們無法把它與該筆紀錄配對。",
    },
  },
  {
    label: "AmberGroup",
    note: {
      en: "Appears as an organisation in the support system, linked to 69 support tickets and 588 comments. Matched by exact name only; we don’t merge it with Amber AI Limited.",
      "zh-Hant":
        "在支援系統中以機構身分出現，連到 69 張支援工單及 588 則留言。僅以完全相同的名稱配對；我們不把它與 Amber AI Limited 合併。",
    },
  },
  {
    label: "Baidu (HONG KONG) Limited",
    note: {
      en: "Appears as an organisation in the support system, linked to 6 support tickets and 64 comments. Matched by exact name only, which doesn’t prove it is the same account or legal entity.",
      "zh-Hant":
        "在支援系統中以機構身分出現，連到 6 張支援工單及 64 則留言。僅以完全相同的名稱配對，不能證明它與其他資料屬同一個帳戶或法律實體。",
    },
  },
  {
    label: "Zhuo Fanl Industrial Co., Limited",
    note: {
      en: "Appears as an organisation in the support system, linked to 95 support tickets and 863 comments. Matched by exact name only, which doesn’t prove it is the same account or legal entity.",
      "zh-Hant":
        "在支援系統中以機構身分出現，連到 95 張支援工單及 863 則留言。僅以完全相同的名稱配對，不能證明它與其他資料屬同一個帳戶或法律實體。",
    },
  },
  {
    label: "shoplazza",
    note: {
      en: "Appears as an organisation in the support system, linked to 1 ticket and 4 comments. We keep this lowercase label separate from Shoplazza Hongkong Limited.",
      "zh-Hant":
        "在支援系統中以機構身分出現，連到 1 張工單及 4 則留言。我們把這個小寫名稱與 Shoplazza Hongkong Limited 分開處理。",
    },
  },
  {
    label: "Bytebase (HongKong) Limited",
    note: {
      en: "Appears in sales-call recordings: 1 recording, with 232 transcribed snippets. Matched by name only; no tenant or legal entity is confirmed.",
      "zh-Hant":
        "出現在銷售通話錄音中：1 段錄音，內有 232 段已轉錄的片段。僅以名稱配對，未能確認帳戶或法律實體。",
    },
  },
  {
    label: "HONG KONG CLOUD Y TECHNOLOGY CO., LTD",
    note: {
      en: "Appears as a parent account name in billing-model data (310 rows). This shows how billing was organised, not who paid or who used the service.",
      "zh-Hant":
        "在收費模型資料中以母帳戶名稱出現（310 列）。這只反映收費如何組織，並不說明誰付款或誰使用服務。",
    },
  },
];
