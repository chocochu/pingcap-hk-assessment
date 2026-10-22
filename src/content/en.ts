import { facts, n } from "./facts";
import type { Copy } from "./types";

const issues = "https://github.com/chocochu/pingcap-hk-assessment/issues";
const repo = "https://github.com/chocochu/pingcap-hk-assessment";
const pingcapUpdate = "https://www.pingcap.com/trust-hub/security/security-update-october-2026/";
const pingcapJapan = "https://pingcap.co.jp/trust-hub/security/security-update-october-2026/";
const site = "PingCAP leak · Hong Kong impact";

export const en: Copy = {
  siteName: site,
  skip: "Skip to the main content",
  navLabel: "Main sections",
  switchTo: "繁體中文",
  nav: {
    home: "Overview",
    search: "Find a company",
    companies: "Company findings",
    coverage: "What we checked",
    technical: "Technical notes",
  },
  meta: {
    home: {
      title: `What the PingCAP data leak means for Hong Kong · ${site}`,
      description:
        "An independent, plain-language guide to what the PingCAP data leak means for Hong Kong businesses: what was found, what it doesn’t mean, and what you can do.",
    },
    search: {
      title: `Is your company in the leaked files? · ${site}`,
      description:
        "Search company names, brands and websites to see whether they appear in the PingCAP leak, and what kind of record they appear in.",
    },
    companies: {
      title: `Companies linked to billing records · ${site}`,
      description:
        "Every Hong Kong-linked company whose account matches billing records in the PingCAP leak: what was found, what kind of Hong Kong connection it has, and what it doesn’t show.",
    },
    coverage: {
      title: `What we checked, and what we didn’t · ${site}`,
      description:
        "How much of the PingCAP leak this assessment has reviewed, how sure we are about each finding, and a plain-English glossary.",
    },
    technical: {
      title: `Technical notes and downloads · ${site}`,
      description:
        "Summaries of each technical review of the PingCAP leak, key figures, and downloadable redacted evidence files.",
    },
  },
  common: {
    updated: (date) => `Updated ${date}`,
    newTab: "(opens in a new tab)",
    source: "Source",
    strength: {
      title: "How sure are we?",
      intro: "We rate every link between a company and the files on three levels.",
      levels: {
        strong: {
          label: "Strong",
          text: "Exact identifiers match. For example, the same account ID appears in both the account records and the billing records.",
        },
        medium: {
          label: "Medium",
          text: "A contextual link, such as a support request that mentions the company’s account or server address. It points to the company but doesn’t prove ownership.",
        },
        clue: {
          label: "Clue",
          text: "A hint, such as a sales lead, a .hk web address, a country field or a name match. Worth following up, but not proof.",
        },
      },
    },
  },
  footer: {
    lines: [
      "This is an independent assessment. It is not affiliated with PingCAP, and it is not a statement by any company named here.",
      "We haven’t verified that the leaked material is authentic or complete. Claims about its size and origin are the releasing group’s own.",
      "Findings may be expanded, corrected or withdrawn as more material is reviewed.",
    ],
    version: (version, time) => `Version ${version} · ${time}`,
    links: [
      { label: "Report a correction", href: issues },
      { label: "Glossary", href: "page:coverage#glossary" },
      { label: "Source code", href: repo },
    ],
  },

  home: {
    eyebrow: (date) => `Independent assessment · ${date}`,
    title: "What the PingCAP data leak means for Hong Kong",
    deck: "In October 2026, a group calling itself FulcrumSec began publishing files it says were taken from PingCAP, the company behind the TiDB database. We searched those files for businesses with Hong Kong connections. This site explains what we found and, just as important, what it doesn’t mean.",
    ctaSearch: "Is my company listed?",
    ctaAction: "What you can do",
    answer: {
      title: "Was the customer data of Hong Kong companies leaked?",
      body: `**We found no evidence of it, but the files do hold personal details linked to Hong Kong.** Most of what’s there is PingCAP’s own records about these companies, such as accounts, invoices, sales leads and support tickets, and we found no sign of the records of the companies’ own customers. That is “no evidence found”, not “proven safe”: we have checked only part of the files, and we can’t confirm they are genuine or complete. The files also include PingCAP’s cloud user accounts. ${n(facts.cloudUserHkTenantRows)} of those user records are linked to a customer account whose country is listed as Hong Kong, and ${n(facts.cloudUserHkTenantEmailRows)} of them contain something shaped like an email address. We don’t know who those users are (staff, developers or individuals), so these are counts of records, not of people.`,
      cta: "See exactly what is in the files",
    },
    brief: {
      title: "The short version",
      items: [
        {
          title: "Their customers’ data?",
          body: `**No evidence found.** What we mostly saw is PingCAP’s side of the relationship: these companies’ account, billing, sales and support records. Nothing we found shows that a company’s own shoppers, travellers, players or other users were in the files. Two things to know. Personal details linked to Hong Kong are in the files: ${n(facts.cloudUserHkTenantRows)} PingCAP cloud user records linked to a Hong Kong-listed customer account (${n(facts.cloudUserHkTenantEmailRows)} with an email-shaped contact detail), plus sales contacts and analytics profiles. We publish only totals. And we have so far checked only part of the files.`,
        },
        {
          title: "What happened",
          body: "PingCAP reports that stolen service credentials were used to get into its internal systems between 9 September and 7 October 2026. It says account, project, billing, SQL-editor and (encrypted) API-key information was exported. FulcrumSec says the collection totals 10.6 TB and that more is coming. We can’t verify that.",
        },
        {
          title: "What we found",
          body: `Business records linked to Hong Kong companies are in the files, mostly account, billing and sales records. These are the companies’ records with PingCAP, not their customers’ data. For ${facts.examinedCompanies} companies we could link the account to billing records, and we describe each one.`,
        },
        {
          title: "What it doesn’t mean",
          body: "A company’s name appearing here doesn’t mean its own systems were hacked, or that its customers’ data is in the files. We found no evidence of that. Often it just means the company is in PingCAP’s records, sometimes only as a sales lead. And we can’t tell you whether you personally are affected.",
        },
      ],
    },
    numbers: {
      title: "The numbers, in context",
      tiles: [
        {
          value: String(facts.examinedCompanies),
          label: "companies with a profile",
          note: "Every company whose account matches billing records by exact ID. Each profile says what kind of Hong Kong connection public sources show.",
        },
        {
          value: String(facts.namesScreened),
          label: "company names screened",
          note: `About 8 in 10 (${facts.marketingOnly}) appear only in marketing or sales-lead lists. This is not a list of victims.`,
        },
        {
          value: `${n(facts.bqTablesReviewed)} of ${n(facts.bqTables)}`,
          label: "BigQuery tables reviewed so far",
          note: `BigQuery is one of the released archives. We’ve counted specific fields in about ${Math.round((facts.bqTablesReviewed / facts.bqTables) * 100)}% of its tables, so expect this to grow.`,
        },
      ],
      caveat:
        "These numbers count the records and names we reviewed. They don’t count affected people or companies, and they overlap, so please don’t add them up.",
    },
    found: {
      title: "What we found in the files",
      intro:
        "The files hold several different kinds of material. They aren’t equally serious, and we aren’t equally certain about them.",
      cards: [
        {
          icon: "receipt",
          title: "Account and billing records",
          body: "Account and invoice history tied to companies with Hong Kong connections. This is our strongest evidence: we matched accounts to billing records using exact ID numbers. We describe every company we could match this way, with billing records dated between 2022 and 2026.",
          page: "companies",
          cta: "See the company profiles",
        },
        {
          icon: "support",
          title: "Technical support material",
          body: `${facts.supportRecords} support records link to ${facts.supportCompanies} company names. ${facts.supportSqlRecords} of them contain database-style code (SQL). That code might be examples, troubleshooting or third-party text. It doesn’t show that anyone’s customer database was taken.`,
          page: "technical",
          hash: "support",
          cta: "See the support figures",
        },
        {
          icon: "logs",
          title: "Server activity logs",
          body: `About ${Math.round(facts.gatewayRecords / 1_000_000)} million log entries from PingCAP’s cloud gateway, dated December 2022 to October 2026. Logs show that activity happened, not whose it was. We could tie a small number of company accounts to log activity. The largest is MEGAHARD LIMITED.`,
          page: "companies",
          hash: "megahard",
          cta: "Read the MEGAHARD finding",
        },
        {
          icon: "key",
          title: "Login-related fields",
          body: `The BigQuery archive has fields for passwords, API keys and login tokens. For example, all ${n(facts.apiRecordsWithKeys)} API records have their “secret key” field filled in. We didn’t test any of them, so we can’t say whether they’re readable or still work. PingCAP describes the API-key information as encrypted.`,
          page: "technical",
          hash: "credentials",
          cta: "See the field counts",
        },
        {
          icon: "people",
          title: "People, as totals only",
          body: `Three analytics exports list Hong Kong as a country: ${n(facts.pseudonymousExportHkCountryRows)} of about ${(facts.pseudonymousExportRows / 1_000_000).toFixed(2)} million rows in a pseudonymised analytics export (users appear only as coded IDs), ${n(facts.analyticsExportHkCountryRows)} of about ${(facts.analyticsExportRows / 1_000_000).toFixed(2)} million rows in the BigQuery user export, and ${facts.hkProfileRows} Mixpanel profile rows. Separately, ${facts.hkEmailContacts} sales-contact records use a .hk email address (across ${facts.hkEmailDomains} domains). Rows aren’t people and weren’t de-duplicated, the exports may overlap, and a country field doesn’t show where someone lives, so none of these numbers should be added together or read as affected people. A different kind of count comes from PingCAP’s own cloud user accounts: of ${n(facts.cloudUserRows)} user records, ${n(facts.cloudUserHkTenantRows)} link to a customer account whose country field says Hong Kong, and ${n(facts.cloudUserHkTenantEmailRows)} of those contain an email-shaped string. We don’t know who these users are or where they live, and we didn’t work out how many different people these records cover.`,
          page: "technical",
          hash: "location",
          cta: "See how we counted",
        },
        {
          icon: "code",
          title: "Source-code repositories",
          body: `A newer archive holds code and configuration from ${facts.repoDirectories} repositories. It adds detail to four of the company profiles, shows how earlier exports were built and why their rows repeat, and holds stored finance and profile data. It doesn’t add any new affected companies, and nothing in it shows a customer database was taken.`,
          page: "technical",
          hash: "repos",
          cta: "See what the code archive adds",
        },
      ],
    },
    notMean: {
      title: "What this does not mean",
      items: [
        "**Being named isn’t being breached.** These are PingCAP’s records about its customers, prospects and partners. A company appearing in them hasn’t necessarily been hacked.",
        `**It isn’t a list of victims.** The ${facts.namesScreened} names include sales prospects, partners, spelling variants and a few we couldn’t identify. Some were later ruled out as Hong Kong companies.`,
        "**Well-known names aren’t compromised.** Banks, exchanges, and transport and payment operators (HSBC, HKEX, Hang Seng, Octopus, MTR) show up in marketing and lead lists. Nothing here shows their systems were compromised.",
        "**Numbers aren’t people.** One customer can generate thousands of records. Our counts aren’t customers, invoices paid or severity scores.",
        "**None of it is verified as genuine.** We can’t confirm the leaked files are authentic or complete, and the size figures come from the group that released them.",
      ],
    },
    action: {
      title: "What you can do",
      intro:
        "This is general guidance, not legal or security advice. If you’re unsure, ask your vendor or a professional.",
      groups: [
        {
          title: "If your organisation uses PingCAP or TiDB Cloud",
          steps: [
            `Read [PingCAP’s official security update](${pingcapUpdate}) and ask PingCAP, or the reseller you buy through, whether your organisation is in scope. When PingCAP published its update, it was still investigating which customers were affected.`,
            "Replace your TiDB Cloud API keys and passwords, and anywhere else you reused them.",
            "Check your account’s activity since 9 September for anything you don’t recognise. Also look through your SQL-editor history for sensitive queries, since PingCAP says SQL-editor data was among what was exported.",
          ],
        },
        {
          title: "If your company’s name appears here",
          steps: [
            "[Find your entry](page:search) and read what kind of record it is. Most are marketing or sales-lead entries, which show a business relationship at most.",
            "Remember that billing can sit with a reseller or hosting provider rather than the end customer. Ask yours.",
            "If you hold personal data in systems linked to PingCAP, consider whether you have a duty to notify customers or regulators, and take advice.",
            `If we’ve got your company wrong, for example by mixing it up with a similarly named one, [tell us](${issues}).`,
          ],
        },
        {
          title: "For everyone",
          steps: [
            "Be careful with unexpected emails, calls or messages about PingCAP, TiDB, invoices or account problems. Leaked billing and contact details can make scams look convincing. Use contact details from the official website, not from the message.",
            "Avoid downloading or passing on the leaked archives. They can contain other people’s personal information.",
          ],
        },
      ],
      note: "Our own downloads are redacted. They leave out personal names and emails, credentials, customer IP addresses and endpoints, and account or cluster IDs.",
    },
    background: {
      title: "More on what happened",
      paragraphs: [
        `PingCAP’s 19 October update reports stolen service credentials, internal access from 9 September to 7 October, and exported account, organisation and project data, SQL-editor data, commercial and billing data, and encrypted API-key information. It says it found no evidence that data stored in TiDB was affected, and that the scope for customers was still under investigation. [Read the official update](${pingcapUpdate}).`,
        `PingCAP’s [Japanese-language notice](${pingcapJapan}) describes the exposed API key material more narrowly and says the private-key parts were not exposed. The two notices differ in scope and certainty, and we haven’t resolved whether every credential-like item in the files is usable or harmless.`,
        "FulcrumSec says the first part of its release is five .tar.gz archives, 128.3 GB compressed and just over 200 GB uncompressed, from a collection it claims totals 10.6 TB. It says more is coming. We haven’t verified these claims.",
        `We’ve had access to ${facts.archivesAvailable} archives so far. [What we checked](page:coverage) explains how much we’ve covered. A cloud cost-and-usage archive is outside this review.`,
      ],
    },
    next: {
      title: "Where to go next",
      cards: [
        {
          title: "Find a company",
          body: "Search by name, brand or website and see what kind of record it appears in.",
          page: "search",
        },
        {
          title: "Company findings",
          body: "A profile for every company we could link to billing records.",
          page: "companies",
        },
        {
          title: "What we checked",
          body: "How much of the leak we’ve covered, how sure we are, and a plain-English glossary.",
          page: "coverage",
        },
        {
          title: "Technical notes",
          body: "Key figures from each technical review, plus the redacted data files.",
          page: "technical",
        },
      ],
    },
  },

  search: {
    title: "Is your company in the leaked files?",
    intro: (total) =>
      `Search by company name, brand or website. This covers the ${facts.namesScreened} names we screened, plus the other names from later reviews (${total} entries in all). Being listed doesn’t mean a company was breached.`,
    inputLabel: "Company name, brand or website",
    placeholder: "For example: Klook, megahard, .hk",
    clear: "Clear",
    filterLabel: "Show",
    filters: {
      all: "Everything",
      examined: "Company profile",
      account: "Account or finance records",
      sales: "Sales records",
      marketing: "Marketing lists only",
      later: "Named in a later review",
    },
    industry: {
      label: "Industry",
      hint: "Pick one or more.",
      clear: "Clear industries",
      note: "Industries are our own plain-language grouping, based on the company name. They are not verified company information. A name can fit several groups, so the numbers add up to more than the total.",
      detail: "Industry (our grouping)",
    },
    legendTitle: "What the labels mean",
    verdicts: {
      examined: {
        label: "Company profile",
        text: "We matched this company’s account to billing records by exact ID. Its profile says what we found and what kind of Hong Kong connection it has.",
      },
      account: {
        label: "Account or finance records",
        text: "Appears in customer-account or finance-related business records. It may be a prospect or a past customer, not an active user.",
      },
      sales: {
        label: "Sales records",
        text: "Appears in sales (CRM) records, which track prospects as well as customers.",
      },
      marketing: {
        label: "Marketing list only",
        text: "Appears only in marketing, lead or campaign lists. This usually means a possible customer, not a user.",
      },
      later: {
        label: "Named in a later review",
        text: "Named in a later BigQuery review. Read the note to see what that means.",
      },
    },
    household: {
      title: "Seeing a household name?",
      body: "Banks, exchanges, and transport and payment operators (such as HSBC, HKEX, Hang Seng, Octopus and MTR) appear mainly in marketing and lead lists, and sometimes in sales records. Livi Bank, HashKey and OSL appear in sales or finance records with a “Customer” label, but with the “in production” flag set to No. None of this shows that those organisations’ systems were compromised.",
    },
    count: (matched, total, shown) =>
      matched === 0
        ? `No matches among ${total} entries`
        : `${matched} of ${total} entries · showing ${shown}`,
    more: (count) => `Show ${count} more`,
    none: {
      title: "No match",
      body: "That doesn’t mean the company isn’t in the leak: we’ve only reviewed part of the material (see [what we checked](page:coverage)). Try another spelling, the Chinese name, or just part of the name.",
    },
    details: {
      toggle: "Details",
      seen: (count) =>
        `Appears ${count.toLocaleString("en-US")} ${count === 1 ? "time" : "times"} in the records we screened`,
      countries: "Country values on record",
      domains: "Websites on record",
      domainsNote: "not verified as the company’s own",
      category: "Original category",
      noneRecorded: "None recorded",
    },
    later: "From a later review",
    readFinding: "Read the profile",
    noscript: `Search needs JavaScript. You can [download the full list of ${facts.namesScreened} screened names](evidence:business_labels.csv) instead.`,
  },

  companies: {
    title: "Companies linked to billing records",
    intro: [
      `There is a profile here for **every company whose account in the leaked files matches billing records by exact ID number**: ${facts.examinedCompanies} in all. We didn’t pick them for being unusual or worse affected. The same rule applies to each, and they’re listed alphabetically.`,
      "Each profile says what kind of Hong Kong connection public sources show, such as company registries, official terms and company websites: a Hong Kong-registered company, a company that says it is based in Hong Kong, or a Hong Kong brand or group whose account is held by a company elsewhere.",
      "Every other name is in [Find a company](page:search), labelled with the kind of record it appears in.",
    ],
    caution:
      "None of this shows that a company’s own systems were breached or that its customers’ data was exposed. It shows that the company appears in PingCAP’s account and billing records.",
    cardLabels: {
      records: "Records found",
      hk: "Hong Kong connection",
      found: "What we found",
      careful: "What this doesn’t show",
      sure: "How sure are we?",
      how: "How we confirmed the Hong Kong link",
      refs: "Billing evidence",
    },
    tags: { billing: "Billing", support: "Support", logs: "Gateway logs", repo: "Source code" },
    hkLinks: {
      registered: "Hong Kong-registered company",
      based: "Says it is based in Hong Kong",
      group: "Hong Kong brand or group",
    },
    related: {
      title: "Other names you might be looking for",
      intro:
        "These names come up often in searches, but we couldn’t link them to billing records by exact ID, so they have no profile. Each has its own limits.",
      items: [
        {
          name: "Longbridge Financial LLC",
          body: "Excluded. Its domain identifies a US mortgage lender, which is different from Longport/Longbridge in Hong Kong. Inconsistent geography fields don’t justify merging them.",
        },
        {
          name: "Livi Bank, HashKey, OSL",
          body: "Appear in sales and finance records with a “Customer” label but with the production flag set to No. This is account-record exposure, not verified production use.",
        },
        {
          name: "HSBC, HKEX, Hang Seng, Octopus, MTR",
          body: "Appear mainly in marketing and lead lists, and some also have a sales-system entry. No bank, exchange, transport or payments-system compromise follows from their names appearing here.",
        },
        {
          name: "CloudSteps, Admazes, Qineasy, KBQuest, ZENS, Vision Board",
          body: "Publicly listed PingCAP partners. Partner status is useful identity context, but it isn’t evidence of exposure, and reseller or payer records don’t identify every downstream customer.",
        },
      ],
    },
  },

  coverage: {
    title: "What we checked, and what we didn’t",
    intro:
      "Think of the leak as a very large filing cabinet. We’ve read some drawers from front to back, searched others for particular names, and not opened the rest. This page shows which is which, so you can judge how much weight our findings can carry.",
    picture: {
      title: "The big picture",
      tiles: [
        {
          value: `${facts.archivesAvailable} of ${facts.archivesClaimed}`,
          label: "archives available to us",
          note: "The releasing group says its first release is five archives. We’ve had access to four.",
        },
        {
          value: `${Math.round(facts.gatewayRecords / 1_000_000)} million`,
          label: "gateway log entries read",
          note: "Every file was read. Logs show activity, not who it belongs to.",
        },
        {
          value: `${n(facts.bqTablesReviewed)} of ${n(facts.bqTables)}`,
          label: "BigQuery tables reviewed",
          note: `About ${Math.round((facts.bqTablesReviewed / facts.bqTables) * 100)}% so far. The rest have been listed but not reviewed.`,
        },
      ],
      barLabel: "BigQuery tables reviewed so far",
      barNote: `${n(facts.bqTablesReviewed)} of ${n(facts.bqTables)} tables (${n(facts.bqRowsReviewed)} rows). “Reviewed” means we counted specific fields, not that we understood everything in them.`,
    },
    looked: {
      title: "What we looked at",
      intro: "Each item shows how thoroughly we looked, and what that can’t tell you.",
      limitLabel: "What this can’t tell you:",
      status: { done: "Read in full", partial: "Partly checked", none: "Not done" },
      items: [
        {
          title: "Gateway logs",
          status: "done",
          body: `We read all ${n(facts.gatewayFiles)} files: ${n(facts.gatewayRecords)} valid log entries, dated 3 December 2022 to 3 October 2026 (UTC). Nine broken fragments in three files were left out.`,
          limit:
            "Logs show that activity happened, not whose it was. File names include “.sample”, so we can’t tell whether the logs are complete.",
        },
        {
          title: "Billing records",
          status: "done",
          body: "We scanned all 8,796,520 billing rows. They cover 1,607 distinct billing accounts.",
          limit:
            "The server field is empty throughout, so billing can’t tell us which servers belong to which account.",
        },
        {
          title: "Account, profile and contact tables",
          status: "partial",
          body: "We searched using targeted keywords for business names, locations and IDs. That covered 753 CSV files (468,552 rows), 48 core tables (1,325,495 rows) and 315 Parquet files, where we searched about 14.4 million of 25.4 million rows.",
          limit:
            "Keyword searches can miss names. We didn’t try to recognise every company in every column.",
        },
        {
          title: "Text files, profiles and contacts",
          status: "partial",
          body: "522 files (3,859,443 records or lines) searched with keyword and pattern checks.",
          limit:
            "Images, nested archives and free text we didn’t specifically search for weren’t analysed.",
        },
        {
          title: "Marketplace records",
          status: "partial",
          body: "We found 76 groups of records that match a business name or website exactly.",
          limit:
            "Old address and account links aren’t checked against dates, and payers, resellers and end users are different roles.",
        },
        {
          title: "The rest of the general archive",
          status: "partial",
          body: "We listed everything in it: 3,226 items, of which 2,031 are regular files, about 10.8 GB uncompressed.",
          limit:
            "Listing isn’t understanding. Nested archives, images, database layouts and miscellaneous files weren’t fully interpreted.",
        },
        {
          title: "BigQuery export",
          status: "partial",
          body: `Inventory complete: ${n(facts.bqTables)} tables in ${facts.bqDatasets} datasets (an archive of about 33.8 GB). We counted specific fields in ${n(facts.bqTablesReviewed)} tables (${n(facts.bqRowsReviewed)} row observations, each table counted once). We also scanned 26 tables for Hong Kong location signals: 2,698,670 rows, 55,253 of them with a Hong Kong signal and 20,513 that look like company records (unconfirmed).`,
          limit: `${n(facts.bqNonEmptyTablesRemaining)} non-empty tables (and ${facts.bqEmptyTablesRemaining} empty ones) are still unreviewed. Counting fields isn’t understanding everything in them. These counts overlap.`,
        },
        {
          title: "IP address locations",
          status: "none",
          body: "The free location database we planned to use refused the download (HTTP 403), and we didn’t try to get around that.",
          limit: "Region values in the logs are infrastructure regions, not where customers are.",
        },
        {
          title: "Source-code repositories",
          status: "partial",
          body: `We listed all ${n(facts.repoMembers)} items in ${facts.repoDirectories} repositories and searched ${n(facts.repoTextFiles)} text files for the company names, websites and account IDs from our earlier findings. For ${facts.repoGitRepositories} repositories we also read selected parts of the saved change history (33 files, 543 versions).`,
          limit:
            "Searching isn’t reading everything. Dependencies, binary files, nested archives, files in unusual text encodings and linked files weren’t parsed, and most of the change history wasn’t looked at. Two files hit our 100-change limit.",
        },
        {
          title: "Archives we haven’t seen",
          status: "none",
          body: "The group says its first release is five archives. We’ve had access to four. A cloud cost-and-usage archive is also outside this review.",
          limit: "Anything in those isn’t reflected anywhere on this site.",
        },
      ],
    },
    sure: {
      title: "How sure are we?",
      intro:
        "Account and billing matches use exact identifiers recorded in the files. Support links are less certain, because the web addresses in support requests contain account and cluster references that give context but don’t prove ownership. Sales leads, campaign entries, reseller addresses, country fields and .hk domains are clues for further review.",
    },
    add: {
      title: "Why you shouldn’t add the numbers up",
      body: [
        "Counts on this site are records we looked at, not customers, people, invoices paid or severity scores. One customer can create thousands of records.",
        "The same account or event can show up in several places: repeated snapshots, two sales systems that may describe the same deal, or billing under a reseller. Totals from different sections overlap, so adding them double-counts.",
        "Where we give two numbers for one company (for example, two gateway counts for MEGAHARD), they come from different methods and aren’t meant to be summed.",
      ],
    },
    didNot: {
      title: "What we deliberately did not do",
      items: [
        "**We tested no credentials** and contacted no customer systems.",
        "**We didn’t work around blocks.** When a download was refused, we left that check undone.",
        "**We don’t publish raw leaked records.** Our downloads are redacted: they leave out personal names and emails, credentials, customer IP addresses and endpoints, and account or cluster IDs. People appear only as totals.",
        "**We aren’t verifying the leak.** We haven’t established that the material is authentic or complete.",
      ],
    },
    glossary: {
      title: "Plain-English glossary",
      terms: [
        {
          term: "Record (or observation)",
          meaning:
            "One entry found in the files. Several entries can describe the same account or event, so they aren’t necessarily separate people or companies.",
        },
        {
          term: "Archive",
          meaning: "A large bundle of files, like a zip file. The leak was released as several.",
        },
        {
          term: "Billing record",
          meaning:
            "An entry about charges for using the service: which account, which month. We count entries; we don’t total money.",
        },
        {
          term: "Sales system (CRM)",
          meaning:
            "Software that companies use to track customers and sales prospects. A name there may be a potential customer, not an active user. Salesforce and NexusCRM are two examples in the files.",
        },
        {
          term: "Marketing system (HubSpot)",
          meaning: "Software used to manage marketing contacts and sales leads.",
        },
        {
          term: "Lead or prospect",
          meaning:
            "A possible future customer. Appearing as a lead isn’t the same as using the service.",
        },
        {
          term: "Support record (ticket)",
          meaning:
            "A help request sent to PingCAP’s support team, with the conversation around it. Tickets can be merged, so counts aren’t unique incidents.",
        },
        {
          term: "Gateway log",
          meaning:
            "A technical record of requests passing through a PingCAP cloud service. The volume doesn’t tell us how many people were affected or who owned each resource.",
        },
        {
          term: "Cluster",
          meaning: "A database running in the cloud. Each one has an ID.",
        },
        {
          term: "Tenant",
          meaning:
            "An account holder in PingCAP’s system. A single company can have several, and billing can sit with a reseller.",
        },
        {
          term: "SQL",
          meaning:
            "The language used to ask databases questions. Code like this in a support request may be an example or troubleshooting, not customer data.",
        },
        {
          term: "Credential, API key, token, hash",
          meaning:
            "Things that prove who you are to a system. A hash is a scrambled form of a secret. Finding a field for one doesn’t mean it’s readable, or that it still works.",
        },
        {
          term: "BigQuery export",
          meaning:
            "A copy of tables from Google’s data-warehouse product. It’s one of the released archives.",
        },
        {
          term: "Candidate",
          meaning: "A possible match that still needs checking. It isn’t a confirmed finding.",
        },
      ],
    },
  },

  technical: {
    title: "Technical notes and downloads",
    intro:
      "For analysts, journalists and anyone who wants the detail. Each group summarises one family of reviews with its key figures. All figures can be traced to the redacted files under Downloads. Counts from different reviews overlap and shouldn’t be added.",
    groups: [
      {
        id: "location",
        title: "Hong Kong location scan and linkage",
        summary:
          "How we looked for Hong Kong signals in the BigQuery export, and how we tried to link account records to servers.",
        points: [
          "**Location scan:** 26 tables scanned in full, 2,698,670 rows parsed with no errors. 55,253 rows carry a Hong Kong location signal, and 20,513 look like company records (unconfirmed candidates). Signals don’t show residence, nationality or compromise.",
          "**Linkage:** starting from explicit tenant IDs in financial account records, across 11 tables (4,454,818 rows), we found 39 candidate tenants under 27 exact labels. 12 tenants and 35 clusters were excluded for conflicting labels. See the linkage table below.",
          `**People, as totals:** three analytics exports list Hong Kong as a country. In the pseudonymised analytics export, ${n(facts.pseudonymousExportHkCountryRows)} of ${n(facts.pseudonymousExportRows)} row observations do (about ${((facts.pseudonymousExportHkCountryRows / facts.pseudonymousExportRows) * 100).toFixed(1)}%). In the BigQuery analytics user export, 38,546 of 3,068,700 do (about 1.3%). In the Mixpanel profile rows, 416 do. 255 sales-contact (HubSpot) records use .hk email addresses across 116 domains. These counts may overlap, none is de-duplicated, and none shows residence or a count of affected people. Don’t add them together.`,
          "**User accounts:** a separate count, of PingCAP cloud user records linked to a customer account listed in Hong Kong, is in [User accounts, support text and sign-in records](#user-account-links). It is a different measure, so don’t add it to the numbers above.",
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
        title: "Source-code repositories",
        summary: `An archive of ${facts.repoDirectories} code repositories. We searched it for the company names, websites and account IDs from our earlier findings, using exact matches, and read the context of each hit. It adds detail to existing findings. It does not add any new affected company, person or invoice count.`,
        points: [
          `**What we searched:** ${n(facts.repoMembers)} archive items (411,157 regular files, about 18.5 GB compressed). ${n(facts.repoTextFiles)} text files (225,543 distinct contents) were searched for 454 company names, 228 websites and 761 account identifiers.`,
          "**Stored finance data:** a committed finance file has 5,709 rows and 54 columns (billing months October 2019 to May 2026). 102 rows match four earlier company labels by exact account string: see the table below. Rows repeat tenant-and-month entries, and a cell can hold several invoices, so 102 is not an invoice, customer or incident count. We report no amounts, and these rows shouldn’t be added to earlier billing totals: the BigQuery export has matching tables, but we haven’t checked whether the rows are the same.",
          "**Configuration:** a production-named delivery configuration lists exact account IDs for Shoplazza, AsiaPac and Wetech. Shoplazza also has account-specific alert routing, Wetech has report settings for its organisation and clusters plus stored diagnostic and evaluation samples, and AsiaPac has April 2023 resource and migration notes. A “production” path or a stored alert rule doesn’t prove the service was deployed, an alert fired, or that the company kept using it. Hosting providers and resellers don’t identify their downstream customers.",
          "**A notebook with profile data:** a saved notebook has five profile tables with an email, account reference, signup date, region, an inferred class and 15 usage columns. They hold 12,164 rows but only 3,041 distinct email-and-account pairs. Seven pairs match email domains already in our registry (four domains). These aren’t people or employees, and a region field doesn’t show residence. We report totals only, and no notebook cell was run.",
          "**How earlier exports were built:** the code shows that Salesforce-named models can read NexusCRM data, that some models invent deletion and sync fields, reuse the same ID name for different account systems, copy a tenant name into an account name, append snapshots, and calculate monthly recurring revenue. That explains why repeated rows and export names aren’t independent records or proof of ownership. How the code ran in practice is unverified.",
          "**Support code:** the code can store raw ticket context, normalised comments, generated knowledge-base results and traces. That shows where to look in earlier exports, not that any Hong Kong ticket was processed.",
          "**Limits:** nothing reviewed shows that a customer’s application database was extracted or that a customer credential works. No code was run, and no credential or website was tested.",
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
        title: "Passwords, keys and tokens (field presence)",
        summary:
          "We counted whether credential-related fields are filled in. We never tested a credential, and none of this is attributed to a company or to Hong Kong.",
        points: [
          `**TiDB Cloud API records:** all ${n(facts.apiRecordsWithKeys)} distinct record IDs have non-empty access-key and secret-key fields. That doesn’t show the values are unique, valid, stored in plain text or decryptable.`,
          "**SQL-editor messages:** 668,506 rows parsed across three tables. The two SQL sources hold 203,171 and 150,725 distinct messages.",
          "**Authentication tables:** 373 user records have a Password field filled in, 3,550 session records have both token fields filled in, and 6 of 27 connected-app records have a ConsumerSecret filled in.",
          "**Internal CRM integration tables:** six principals have both access- and refresh-token ciphertext fields, 436 OAuth refresh-token hash records, 5 API-token hash records, 1 named-credential secret and 2 webhook secrets.",
          "A filled-in field doesn’t show how a value is stored, how strongly it’s protected, or that it still works.",
        ],
        files: [
          "bq_material_review.json",
          "bq_auth_presence_review.json",
          "bq_integration_presence_review.json",
        ],
      },
      {
        id: "sales",
        title: "Sales records, quotes and contracts (CRM)",
        summary:
          "Two sales systems (Salesforce and NexusCRM) hold accounts, quotes, contracts and opportunities. We checked their structure and linked records only where account IDs match within the same system.",
        points: [
          "**Linked commercial records:** 84 exact account labels were eligible and 77 have linked records: 67 Salesforce contracts, 135 quotes, 184 opportunities, and 198 NexusCRM opportunities. The two systems may describe the same deals. Deleted, draft and expired records are still stored commercial information, not active contracts.",
          "**Commercial geography:** across five tables (13,329 rows), 585 rows carry Hong Kong signals. Contracts, quotes, opportunities and tax records contribute geography only.",
          "**NexusCRM structure:** 505 contract rows and 972 quote rows, plus 1,048 custom quote products, 1,089 quote line items and 2,644 opportunity line items. We counted fields, not amounts.",
          "**Documents:** metadata only. Salesforce has 2,976 document and 1,127 version records, and Nexus has 42 documents. We opened no files and fetched no URLs.",
          "**Sales-call transcripts:** 168,728 engagements, 3,672 recordings and 401,911 transcribed utterances. We matched two exact company names (Amber AI Limited and Bytebase (HongKong) Limited) and published no snippets.",
          "**Marketing-system (HubSpot) companies:** 86,741 company rows were checked. A few more Hong Kong-linked names are on the [search page](page:search).",
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
        title: "Support system",
        summary: "Tickets, comments and attachment metadata held in the support system.",
        points: [
          "193,563 support rows were parsed. The strict route (an eligible company name, Hong Kong country and explicit IDs) matched no organisations. A looser exact-name route matched 49 organisations, four of which have 171 linked tickets.",
          "A follow-up read 19,458 rows (18,920 comments and 538 attachment records). 1,519 comments and 40 attachment records connect to the four named organisations. We recorded that fields exist, not what they contain, and fetched no attachments.",
          "Ticket counts aren’t unique incidents, because tickets can be merged. A “production down” flag on an old ticket doesn’t show an outage caused by this incident.",
        ],
        files: ["bq_support_review.json", "bq_support_content_review.json"],
      },
      {
        id: "analytics-export",
        title: "Analytics user export",
        summary:
          "A large family of analytics user exports in the BigQuery archive. We counted rows and checked three location fields and which profile fields are filled in. Every count is a row observation: it is not a person, a customer or a confirmed exposure.",
        points: [
          `**Coverage:** all ${facts.analyticsExportSources} export sources were read in two separate passes, 3,068,700 rows with no parse errors. Rows weren’t de-duplicated within or across sources, so the same person or device could appear more than once.`,
          `**Hong Kong signals:** the country field is a Hong Kong value in ${n(facts.analyticsExportHkCountryRows)} rows, the city field in 14,180 rows and the region field in none. Most rows have an empty country (2,048,479) or another country (981,675). We didn’t add the three counts, because one row can match several fields, and we never inferred a country from a city or region.`,
          "**What is filled in:** every row has the profile, location, device, privacy, lifetime-value, prediction, audience and user-property containers. Some fields inside them are often empty: for example a lifetime-revenue value is present in 174,415 rows and a mobile model in 35,940. “Present” includes empty strings, lists and objects, so it doesn’t show a value is usable or accurate. No unexpected extra fields turned up directly inside those containers. We published no identifiers, timestamps or financial values.",
          "**Limits:** this doesn’t show how many people are involved, who the customers are, or that any Hong Kong business was affected. We also didn’t check whether these rows overlap with the Mixpanel profile rows or the other Hong Kong counts on this page, so don’t add them.",
        ],
        files: ["bq_analytics_users_review.json"],
      },
      {
        id: "pseudonymised-export",
        title: "Pseudonymised analytics export",
        summary:
          "A second, much larger family of analytics user exports in the BigQuery archive, where each row carries a coded user ID instead of a name. We counted rows and checked three location fields. Every count is a row observation: it is not a person, a customer or a confirmed exposure.",
        points: [
          `**Coverage:** all ${facts.pseudonymousExportSources} export sources, ${n(facts.pseudonymousExportRows)} rows, with no parse errors. Two separately written counters agreed on every source, though they share the same file reader. Rows weren’t de-duplicated within or across sources, so the same person or device could appear more than once.`,
          `**Hong Kong signals:** the country field is a Hong Kong value in ${n(facts.pseudonymousExportHkCountryRows)} rows (about ${((facts.pseudonymousExportHkCountryRows / facts.pseudonymousExportRows) * 100).toFixed(1)}%), the city field in ${n(facts.pseudonymousExportHkCityRows)} rows and the region field in none. Most rows list another country (14,289,337); 63,020 have an empty country. We counted only eight fixed spellings (such as “HK”, “Hong Kong” and “香港”). We didn’t add the three counts, because one row can match several fields, and we never inferred a country from a city or region.`,
          "**Coded IDs:** every row has a coded user ID and a stream ID. We published neither, nor any hash of them, and we didn’t link these rows to any other export. No unexpected extra fields turned up directly inside the seven record containers.",
          "**Limits:** this doesn’t show how many people are involved, who the customers are, where anyone lives now, or that any Hong Kong business was affected. We didn’t check whether these rows overlap with the BigQuery user export above, the Mixpanel profile rows or the other Hong Kong counts on this page, so don’t add them. The download’s own status flags describe the moment it was built; the later reviews have passed.",
        ],
        files: ["analytics_pseudonymous.json"],
      },
      {
        id: "marketplace-references",
        title: "Marketplace records: how they link",
        summary:
          "Six marketplace tables (offers, products, accounts and agreements). We checked only whether the identifiers in one table literally appear in another. The results contain no names, prices or locations.",
        points: [
          `**Coverage:** ${facts.marketplaceSources} sources, ${n(facts.marketplaceRows)} rows, with no parse errors. Two separately written counters agreed on every figure, though they share the same file reader. 48,579 of the rows are agreements, but they hold only 605 distinct agreement IDs, so most are repeats of the same agreement.`,
          "**What matched:** the seller on every one of the 817 offer rows and the maker on every one of the 54 product rows appears in the account table. 48,561 of the 48,579 agreement rows have a subscriber that appears in the account table’s cloud-account field, and all 48,579 have a vendor that does. 34,902 agreement rows point to an offer that is in the offer table; 13,677 don’t.",
          "**What didn’t match:** none of the 48,579 agreement rows has a buyer ID that literally appears as any of the account table’s three ID forms. That doesn’t prove they are unrelated, only that the IDs aren’t written the same way. All 649 offer targets are of the “buyer accounts” kind; none targets countries or regions.",
          "**Limits:** these are literal matches in the shape of the data. They don’t show who owns an account, who the customers are, where anyone is, what was paid, or that any company was affected. The separate matching figures describe different row groups and shouldn’t be added.",
        ],
        files: ["bq_marketplace_references_review.json"],
      },
      {
        id: "user-account-links",
        title: "User accounts, support text and sign-in records",
        summary:
          "Fifteen BigQuery tables holding PingCAP’s cloud user accounts, the customer accounts they belong to, support-system text and sign-in (OAuth) records. We checked which chosen fields are filled in and how the tables point to each other. Every count is a table-row observation: it is not a person, a company or a confirmed exposure.",
        points: [
          `**Coverage:** ${facts.userLinkSources} sources were read in two separate passes, ${n(facts.userLinkRowsPerPass)} rows each time, with no parse errors. ${facts.userLinkNewSources} sources are new (${n(facts.userLinkNewRows)} rows); the other two (projects and customer accounts) were read again only to follow links and add no coverage. The second pass is a repeat check, not twice as many rows, and both passes share the same file reader.`,
          `**Hong Kong link:** the user list has ${n(facts.cloudUserRows)} rows, and every one points to exactly one customer account (“tenant”) record. ${n(facts.cloudUserHkTenantRows)} of them point to an account whose country field is exactly a Hong Kong value, and ${n(facts.cloudUserHkTenantEmailRows)} of those rows contain an email-shaped string. ${n(facts.cloudUserOtherCountryRows)} rows point to an account with another country and ${n(facts.cloudUserNoCountryRows)} to one with no country. A second export of the same users gives the same figures, so don’t add the two.`,
          `**What is filled in:** ${n(facts.userEmailNonEmptyRows)} user rows have a non-empty email field, and ${n(facts.userEmailShapedRows)} of those look like an email address by a simple pattern. 198,353 rows have a first name and 163,321 a last name. We didn’t work out how many different people these cover. We published no names or emails.`,
          `**Support-system text:** ${facts.suspendedTickets} suspended support tickets each have text, a subject and an author email. ${facts.suspendedAttachments} attachment records belong to six of those tickets and each lists a file name and a link. We opened no link and don’t know whether the files exist or can be reached. 113 of 114 help-article rows have body text and all five post rows have details. We didn’t read any of this text.`,
          `**Sign-in (OAuth) records:** ${n(facts.oauthRows)} rows in tables named for OAuth access tokens contain an email-shaped string. They point to ${n(facts.oauthUsers)} different users and ten of the 11 application records. We didn’t establish that any usable token or credential is in them.`,
          `**Internal and account context:** the Salesforce user table has ${facts.salesforceUserRows} rows, 319 with an email-shaped string and 13 flagged active. There are also 366,571 role-assignment rows, 386,927 user-to-project rows and 373,551 contact-to-company rows. We didn’t interpret role codes, and these rows don’t show who is employed by whom.`,
          "**Limits:** “Hong Kong” here is a country field on a customer-account record. It doesn’t show where a person lives, that a company is registered in Hong Kong, who is a customer, or any current relationship. Email-shaped means only that the text follows a simple pattern: no mailbox or identity was checked. We counted only 173 chosen fields, so this is not a review of everything in these tables. We checked the integrity of the selected files inside the archive, but did not re-run the checksum of the whole archive.",
        ],
        files: ["bq_user_account_links.json"],
      },
      {
        id: "sales-conversations",
        title: "Sales-conversation records (Chorus tables)",
        summary:
          "Fifteen BigQuery tables from a dataset named “chorusai”: conversation participants, summaries, tracker-mention text, action items and a small user list. We checked which chosen fields are filled in and whether the tables point to each other. We did not read the text, and every count is a row observation, not a person, a company or a confirmed exposure.",
        points: [
          `**Coverage:** ${facts.chorusSources} new sources (${n(facts.chorusRows)} rows) were read in two separate passes, and the main “engagement” table (${n(facts.chorusEngagementRows)} rows) was read again only to follow links, adding no coverage. Each pass covered ${n(facts.chorusRowsPerPass)} rows with no parse errors. Both passes share the same file reader.`,
          `**What is filled in:** the participant table has ${n(facts.chorusParticipantRows)} rows, with an email-shaped string in ${n(facts.chorusParticipantEmailRows)} and a name in 204,563. 30,552 of 30,553 recap rows have text, and so do all 113,768 current and 96,963 discontinued tracker-mention rows and all 13,573 action items. The current and discontinued rows are kept apart: don’t add them into a count of different items.`,
          "**How the tables link:** every row in the 13 tables checked against the engagement table points to exactly one engagement row. That is a row-by-row match, not one shared engagement. Some other links don’t resolve within this set: 1,109 participant rows pointing to the small user list, 390 engagement rows pointing to it, and 10 current and 8 discontinued tracker-mention rows pointing to a tracker.",
          "**Hong Kong:** none of the chosen fields is a country field, so this batch gives no Hong Kong count and ties no record to a Hong Kong company or person.",
          "**Limits:** we didn’t read the text, so presence says nothing about what the records say or whether they are confidential. No audio, attached file or link was opened. A match between a discontinued and a current tracker-mention row is a candidate link, not proof they are the same item. Email-shaped is a simple pattern, not a verified address. The download’s own status flag says “pending independent review and admission”: that describes the moment it was built, and the delivery was later reviewed and admitted. We did not re-run the checksum of the whole archive.",
        ],
        files: ["bq_sales_conversations_chorus.json"],
      },
      {
        id: "sales-communications",
        title: "Sales and marketing communications (HubSpot tables)",
        summary:
          "Five BigQuery tables from the marketing system (HubSpot): saved meetings, tasks, calls, emails and notes. We checked which chosen fields are filled in. We did not read the text, and every count is a row observation, not a person, a company or a confirmed exposure.",
        points: [
          `**Coverage:** ${facts.hubspotSources} new sources (${n(facts.hubspotRows)} rows) were read in two separate passes with no parse errors, covering 168 chosen fields. Both passes share the same file reader.`,
          `**What is filled in:** ${n(facts.hubspotMeetingRows)} meeting rows (every one has a title, 612 have body text), ${facts.hubspotTaskRows} task rows (32 with body text), ${n(facts.hubspotCallRows)} call rows (every one has a title and body text), ${n(facts.hubspotEmailRows)} email rows (6,056 with plain text, 5,869 with HTML and 6,055 with a subject) and ${facts.hubspotNoteRows} note rows (302 with body text). The text, HTML and preview fields can describe the same message, so don’t add them together.`,
          `**Email addresses:** of the ${n(facts.hubspotEmailRows)} email rows, ${n(facts.hubspotFromEmailShapedRows)} have an email-shaped string in the from-address field, 5,699 in the to-address field and 6,069 in the sender field. Email-shaped is a simple text pattern: a non-match doesn’t prove an address is bad, and none of these counts is a number of different addresses or people.`,
          "**Hong Kong:** none of the chosen fields is a country field, so this batch gives no Hong Kong count and ties no record to a Hong Kong company or person. The ten ID fields we checked are each valid and unique within their own table, but we didn’t link any message to a company.",
          "**Limits:** we didn’t read the text, so presence says nothing about what the messages say or whether they are confidential. No linked file, recording or attachment was opened, and a reference field doesn’t show that the file exists or can be reached. The download’s own status flag says “pending independent review and admission”: that describes the moment it was built, and the delivery was later reviewed and admitted. We did not re-run the checksum of the whole archive.",
        ],
        files: ["bq_sales_communications_hubspot.json"],
      },
      {
        id: "workforce-records",
        title: "Staff directory, HR and department records",
        summary:
          "Thirty BigQuery tables that hold what look like staff directories, HR snapshots, reporting lines, department lists and accounting-context tables. We checked which chosen fields are filled in and how some tables point to each other. We did not read the contents. Every count is a row observation, not a person, and these records are not tied to any Hong Kong company or person.",
        points: [
          `**Coverage:** ${facts.workforceSources} new sources in three batches, each read in two separate passes with no parse errors: directory and membership tables (${facts.workforceDirectorySources} sources, ${n(facts.workforceDirectoryRows)} rows), HR snapshot and account-context tables (${facts.workforceHrSources} sources, ${n(facts.workforceHrRows)} rows) and department and accounting-context tables (${facts.workforceAncillarySources} sources, ${n(facts.workforceAncillaryRows)} rows). The passes share the same file reader.`,
          "**Directories:** the user tables hold a name in every row: 438 rows in one chat-system (Lark) table, 379 in a second (Feishu) table, 380 in a curated table and 2,292 in its raw counterpart. An email-shaped string is in 336 of the Lark rows, 376 of the Feishu rows and 2,269 of the raw rows (the curated table has no email field in our set). Raw and curated records can overlap, so we kept them apart.",
          "**How the directory tables link:** all 440 curated membership rows point to exactly one user row and one department row, and so do all 2,629 raw membership rows. That is a row-by-row match, not a finding about who works where. Three department-parent comparisons leave 17, 22 and 18 rows without a match inside this set, which doesn’t mean a record is missing.",
          `**HR snapshots:** a monthly employee-and-department snapshot has ${n(facts.workforceHrMonthlyRows)} rows, each with a name and an email-shaped string, and 29,665 with a leader email. A users snapshot has ${n(facts.workforceHrUsersSnapshotRows)} rows with a name and email-shaped string in every row and a leader email in 92,691. Smaller daily and basic versions have 642 and 971 rows, and a curated and a raw user export have 578 and 30,939 rows with a work email in every row. Some snapshot keys repeat (103, 358 and 13 extra rows in three of them), and we kept the repeats. A project snapshot has 7,973 rows, 7,432 with an owner email, and a raw cloud-account table has 72,656 rows, 14,734 with an owner email. Field presence doesn’t show who owns a resource.`,
          "**Manager links:** in the curated user export 475 of 539 manager references point to exactly one user row and 64 do not; in the raw export 26,678 of 29,013 do and 2,335 do not. “Do not” means not found inside this set, not a missing employee or a wrong manager.",
          "**Department and accounting context:** a monthly department and cost-centre snapshot has 5,879 rows, each with a department name and 5,827 with a cost-centre name. An update log has 13,154 rows, and four small spreadsheet and finance-model tables have 10, 86, 9 and 51 rows with a description or explanation filled in. We excluded money fields, calculated no totals and read no descriptions. A table name that mentions salary doesn’t show that a salary value, or any individual’s pay, is inside.",
          "**Hong Kong:** the two country fields in the directory tables and the six in the HR tables contain no exact Hong Kong value under our fixed spellings. That doesn’t show Hong Kong people are absent: we didn’t check what the country values mean, and names or email shapes say nothing about where a person lives.",
          "**Limits:** these counts don’t show how many different people are involved, whose employees they describe, whether anyone is still employed, whether any content is confidential, or that anything was exposed. Snapshots and raw and curated copies overlap, so the three downloads’ counts shouldn’t be added to each other or to other counts on this page. The downloads’ own status flags say “pending independent review and admission”: that describes the moment they were built, and the deliveries were later reviewed and admitted. We did not re-run the checksum of the whole archive.",
        ],
        files: [
          "bq_workforce_directory.json",
          "bq_workforce_hr.json",
          "bq_workforce_ancillary.json",
        ],
      },
      {
        id: "billing-models",
        title: "Billing models and identities",
        summary:
          "Billing data comes in several versions of the same underlying model. We compared their structure but did not try to say who paid, managed or owned anything.",
        points: [
          "**Roles:** 178,404 billing-config rows and 174,993 modelled cost-detail rows. Every cost row points to one of ten config IDs, but the identifier fields play different roles, so equal values can’t tell us who paid or owned a resource.",
          "**Namespaces:** two further detail tables (71,560 rows each) are identical to each other, but share only 763 full records with the earlier model, even though all 71,560 grouping IDs overlap.",
          "**Monthly models:** nine tables with 357,500 rows. The three monthly-distribution tables contain many repeated records (42,796, 89,953 and 42,796). We kept them, since equal records don’t prove duplicate charges. Amount fields mix numbers and text, so we calculated no money totals.",
          "**Identity models:** a five-source census of 545,062 rows found no reliable bridge between identity systems. 932 key groups in two sources have several versions, which can be normal.",
          "**CRM identity claims:** two claim tables hold 276,552 rows, and the matching binding exports are empty. We can’t tell whether any claim was resolved.",
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
        title: "Imports, replication and data apps",
        summary:
          "Records describing how customers load, copy and expose their data. No company or Hong Kong attribution is made for these.",
        points: [
          "**Imports:** 250,292 rows, made up of 46,882 import records, 201,058 serverless import records, 1,795 migration-job rows and 557 replication tasks. A source-URL field is filled in for all 46,882 import records. We opened no URLs.",
          "**Derived import models:** 582,045 rows in six sources. One is a subset of another, and two large models are identical in content.",
          "**Data apps:** 315,932 rows covering 42,640 applications, 227,864 endpoints and 45,428 publications. 21,246 publications have an SQL-template field filled in, which doesn’t show a query ran or that any data was reachable.",
        ],
        files: [
          "bq_import_presence_review.json",
          "bq_derived_imports_review.json",
          "bq_dataapp_review.json",
        ],
      },
      {
        id: "quality",
        title: "Quality checks",
        summary:
          "We re-read earlier work at exact numeric precision to check that rounding hadn’t changed any result.",
        points: [
          "We reread 29 tables (7,951,942 rows). Four contain decimal numbers, and in three of those, ordinary computer rounding would have changed some values.",
          "Re-running the analyses that depend on them gave the same results: 574,311 sales rows and 86,741 marketing-system company rows were unchanged.",
        ],
        files: ["bq_numeric_precision_review.json"],
      },
    ],
    support: {
      title: "Support material linked to company names",
      body: `Support links are less certain than billing links: the editable web addresses in support requests contain account and cluster references, which give context but don’t prove ownership. We reviewed ${facts.supportRecords} distinct support records across ${facts.supportCompanies} labels and 51 company-and-cluster combinations. ${facts.supportSqlRecords} records contain SQL-style text, which may be example queries, troubleshooting or third-party material. Narrow automated checks found no non-placeholder database connection strings or MySQL password arguments in these records. That doesn’t show credentials are absent: other formats, images and nested archives were outside the check. No credential was tested.`,
      headers: [
        "Company label",
        "Support records",
        "With SQL-style code blocks",
        "Clusters referenced",
        "Found in gateway logs",
        "Gateway records",
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
      title: "Stored finance rows matched to earlier company names",
      body: "These are rows in one finance file inside the source-code archive. Each matched an account string from our earlier reviews exactly. The company-to-account links themselves are historical candidates from those reviews.",
      headers: ["Company label", "Finance rows", "Billing months"],
      rows: [
        ["AsiaPac Net Media Limited", "32", "2023-10 to 2026-05"],
        ["MEGAHARD LIMITED", "4", "2026-04 to 2026-05"],
        ["Shoplazza Hongkong Limited", "33", "2023-10 to 2026-05"],
        ["Wetech Trading Limited", "33", "2023-10 to 2026-05"],
      ],
      note: "Rows can repeat the same account and month, so these numbers aren’t invoices, customers or incidents. Invoice references are filled in on 29 of the AsiaPac rows only. Don’t add these rows to the earlier billing counts.",
    },
    linkage: {
      title: "Candidate links from billing accounts to gateway logs",
      body: "A separate route started from explicit tenant IDs in financial account records, followed mappings to clusters, and matched those clusters in the gateway logs. It was limited to labels already in the directory, so it includes non-Hong Kong and unresolved names. 305 candidate clusters remain after exclusions; 30 of them match the logs, across 9 tenants and 7 labels, with 124,052 gateway records. The seven matched labels are below.",
      headers: [
        "Company label",
        "Candidate tenants",
        "Candidate clusters",
        "Clusters seen in logs",
        "Gateway records",
      ],
      rows: [
        ["CHAINBASE TECHNOLOGY HOLDINGS PTE. LTD.", "1", "15", "7", "23,390"],
        ["HK FUTURE INIGHT TECH LIMITED", "1", "2", "1", "16"],
        ["Hytto Limited", "2", "14", "2", "24"],
        ["MEGAHARD LIMITED", "2", "15", "14", "99,465"],
        ["Metaverse Cloud Solution Limited", "1", "2", "1", "55"],
        ["OceanBase Hong Kong Limited", "1", "35", "1", "5"],
        ["Wetech Trading Limited", "2", "166", "4", "1,097"],
      ],
      note: "These are historical candidate associations. Cluster creation dates parse, and no matched log activity begins before its cluster was created, but that doesn’t prove ownership across the whole period. Snapshot mappings, resellers, deleted resources and missing logs all limit what this can show. Don’t add these counts to the support-based ones; their overlap hasn’t been reconciled.",
    },
    updates: {
      title: "Updates",
      intro: "The assessment is ongoing. Dates and times are in Hong Kong time (HKT).",
      earlier: {
        title: "Earlier assessment releases",
        body: "Releases up to 0.14 (21 October 2026) added the gateway-log and general-archive reviews, then successive BigQuery review batches. The detailed release notes are in the project’s history on [GitHub](https://github.com/chocochu/pingcap-hk-assessment).",
      },
    },
    downloads: {
      title: "Downloads",
      intro:
        "Redacted evidence files. They keep company labels, domains recorded in the source (not verified ownership), aggregate counts and source references. They leave out personal names and emails, credentials, customer IP addresses and endpoints, and tenant or cluster IDs. Raw leaked records are not included. A checksum for each file is in [SHA256SUMS.txt](evidence:SHA256SUMS.txt).",
      groups: [
        {
          title: "Start here",
          files: [
            {
              file: "priority_findings.csv",
              label: "The analysis team’s original nine-company table",
            },
            { file: "business_labels.csv", label: `All ${facts.namesScreened} screened names` },
            { file: "public_context.json", label: "Public sources used to confirm identities" },
            { file: "methodology.json", label: "How the analysis was done" },
          ],
        },
        {
          title: "Evidence behind the company findings",
          files: [
            { file: "billing_evidence.csv", label: "Account-to-billing matches (30 groups)" },
            { file: "account_evidence.csv", label: "Account and business records (231)" },
            { file: "marketplace_evidence.csv", label: "Marketplace matches (76 groups)" },
            { file: "support_material_evidence.csv", label: "Support records (286)" },
            { file: "gateway_context.csv", label: "Gateway log summary" },
            { file: "business_label_sources.csv", label: "Where each screened name came from" },
            { file: "all_source_label_index.csv", label: "Earlier index of 516 exact names" },
          ],
        },
        {
          title: "BigQuery: company names and locations",
          files: [
            { file: "bq_company_candidates.csv", label: "Reviewed company names" },
            { file: "bq_discovery_review.json", label: "Candidate review and identity sources" },
            { file: "bq_linkage_review.json", label: "Billing-account-to-gateway candidates" },
            { file: "bq_coverage.json", label: "Coverage and limits" },
            { file: "bq_account_additions_review.json", label: "Four more account names" },
            { file: "bq_hubspot_additions_review.json", label: "Marketing-system company names" },
            {
              file: "bq_hubspot_identity_context_v2_review.json",
              label: "Public identity context (set 2)",
            },
            {
              file: "bq_hubspot_identity_context_v3_review.json",
              label: "Public identity context (set 3)",
            },
          ],
        },
        {
          title: "BigQuery: sales, support and billing structure",
          files: [
            { file: "bq_commercial_review.json", label: "Commercial geography" },
            {
              file: "bq_commercial_links_review.json",
              label: "Linked contracts, quotes and opportunities",
            },
            { file: "bq_support_review.json", label: "Support-system associations" },
            {
              file: "bq_support_content_review.json",
              label: "Support comments and attachments (presence only)",
            },
            {
              file: "bq_sales_content_review.json",
              label: "Sales-call transcripts (presence only)",
            },
            {
              file: "bq_nexus_commercial_parents_review.json",
              label: "NexusCRM quotes and contracts",
            },
            { file: "bq_nexus_line_items_review.json", label: "NexusCRM line items" },
            { file: "bq_crm_documents_review.json", label: "CRM document metadata" },
            { file: "bq_crm_raw_documents_review.json", label: "Raw CRM document snapshots" },
            { file: "bq_crm_quarantine_review.json", label: "CRM identity claims" },
            { file: "bq_msp_roles_review.json", label: "Billing-model roles" },
            { file: "bq_msp_namespace_comparison_review.json", label: "Billing-model comparison" },
            { file: "bq_msp_monthly_census_review.json", label: "Monthly billing models" },
            { file: "bq_identity_census_review.json", label: "Identity models" },
            {
              file: "bq_analytics_users_review.json",
              label: "Analytics user export: location and field presence",
            },
            {
              file: "analytics_pseudonymous.json",
              label: "Pseudonymised analytics export: location and field presence",
            },
            {
              file: "bq_marketplace_references_review.json",
              label: "Marketplace records: how identifiers link",
            },
            {
              file: "bq_user_account_links.json",
              label: "User accounts, support text and sign-in records: field presence and links",
            },
            {
              file: "bq_sales_conversations_chorus.json",
              label: "Sales-conversation records (Chorus tables): field presence and links",
            },
            {
              file: "bq_sales_communications_hubspot.json",
              label: "Sales and marketing communications (HubSpot tables): field presence",
            },
            {
              file: "bq_workforce_directory.json",
              label: "Staff directory and membership tables: field presence and links",
            },
            {
              file: "bq_workforce_hr.json",
              label: "HR snapshots and account context: field presence and links",
            },
            {
              file: "bq_workforce_ancillary.json",
              label: "Department and accounting context: field presence",
            },
            { file: "bq_scope_summary.json", label: "BigQuery review scope so far" },
          ],
        },
        {
          title: "BigQuery: credentials, imports and data apps",
          files: [
            {
              file: "bq_material_review.json",
              label: "SQL-editor and API records (field presence)",
            },
            {
              file: "bq_integration_presence_review.json",
              label: "CRM integration fields (presence)",
            },
            { file: "bq_auth_presence_review.json", label: "Authentication fields (presence)" },
            { file: "bq_dataapp_review.json", label: "Data apps" },
            { file: "bq_import_presence_review.json", label: "Import and replication fields" },
            { file: "bq_derived_imports_review.json", label: "Derived import models" },
            { file: "bq_numeric_precision_review.json", label: "Numeric precision checks" },
          ],
        },
        {
          title: "Source-code archive",
          files: [
            {
              file: "repos_company_materials.csv",
              label: "What the code archive adds, by company (table)",
            },
            { file: "repos_findings.json", label: "Findings and limits" },
            { file: "repos_coverage.json", label: "Coverage and limits" },
            { file: "repos_validation.json", label: "Validation and review results" },
          ],
        },
        {
          title: "Verification",
          files: [
            { file: "input_sha256.txt", label: "Checksums of the input archives" },
            { file: "validation_summary.json", label: "Validation and review results" },
          ],
        },
      ],
    },
  },
};
