import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { readdir } from "node:fs/promises";
import { renderToString } from "react-dom/server";
import evidenceFiles from "../scripts/evidence-files.json";
import { App } from "../src/App";
import {
  evidenceHref,
  filterBusinesses,
  languageFromPath,
  languagePath,
  report,
} from "../src/report";
import type { Inline } from "../src/types";

function text(nodes: Inline[]): string {
  return nodes.map((node) => (node.type === "text" ? node.text : text(node.children))).join("");
}

describe("reviewed report content", () => {
  test("both languages preserve staged review scope and all evidence sections", () => {
    expect(report.businesses).toHaveLength(421);
    expect(report.locales.en.sections.map((section) => section.id)).toEqual(
      report.locales["zh-Hant"].sections.map((section) => section.id),
    );
    for (const locale of Object.values(report.locales)) {
      const release = locale.release.paragraphs.map(text).join(" ");
      for (const value of ["FulcrumSec", "128.3", "200", "10.6"]) expect(release).toContain(value);
      expect(
        locale.sections
          .flatMap((section) => section.blocks)
          .filter((block) => block.type === "findings")
          .flatMap((block) => block.items),
      ).toHaveLength(9);
      expect(
        locale.sections
          .flatMap((section) => section.blocks)
          .filter((block) => block.type === "downloads")
          .flatMap((block) => block.items),
      ).toHaveLength(42);
    }
    expect(report.locales.en.release.paragraphs.map(text).join(" ")).toContain(
      "two previously reviewed archives",
    );
    expect(report.locales["zh-Hant"].release.paragraphs.map(text).join(" ")).toContain(
      "先前已檢視的兩個壓縮檔",
    );
  });

  test("BigQuery progress preserves candidate limits and matches the coverage snapshot", async () => {
    const bq = await Bun.file(
      new URL("../public/evidence/bq_coverage.json", import.meta.url),
    ).json();
    expect(bq.archive).toBe("04_bigquery.tar.gz");
    expect(["in_progress", "complete", "failed"]).toContain(bq.status);
    for (const locale of Object.values(report.locales)) {
      const progress = locale.sections.find((section) => section.id === "bq-progress");
      expect(progress).toBeDefined();
      const tables = progress!.blocks.filter((block) => block.type === "table");
      expect(tables).toHaveLength(2);
      expect(tables[0].rows.map((row) => row.slice(1))).toEqual(
        [bq.status, bq.inventory.status, bq.scan.status].map((status) =>
          ["pending", "in_progress", "complete", "failed"].map((state) =>
            status === state ? "✓" : "—",
          ),
        ),
      );
      expect(tables[1].rows.map((row) => Number(row[1]))).toEqual([
        bq.inventory.table_count,
        bq.inventory.dataset_count,
        bq.inventory.archive_bytes,
        bq.scan.tables_complete,
        bq.scan.rows_parsed,
        bq.scan.parse_errors,
        bq.scan.hk_location_rows,
        bq.scan.candidate_company_rows,
      ]);
      const prose = progress!.blocks
        .filter((block) => block.type === "paragraph")
        .map((block) => text(block.content))
        .join(" ");
      expect(prose).toContain("421");
    }
    const english = report.locales.en.sections
      .find((section) => section.id === "bq-progress")!
      .blocks.filter((block) => block.type === "paragraph")
      .map((block) => text(block.content))
      .join(" ");
    expect(english).toContain("not confirmed organisations or affected customers");
    expect(english).toContain("it does not mean all source material has been interpreted");
  });

  test("search accepts names, full-width input, Chinese categories and empty states", () => {
    expect(filterBusinesses(report.businesses, "")).toHaveLength(421);
    expect(filterBusinesses(report.businesses, " SHOPLAZZA ")).toEqual(
      filterBusinesses(report.businesses, "Ｓｈｏｐｌａｚｚａ"),
    );
    expect(filterBusinesses(report.businesses, "Shoplazza").length).toBeGreaterThan(0);
    const first = report.businesses[0];
    expect(filterBusinesses(report.businesses, first.categories["zh-Hant"])).toContain(first);
    expect(filterBusinesses(report.businesses, "no-matching-business-489321")).toHaveLength(0);
  });

  test("reviewed BQ additions retain corporate identity limits in both editions", async () => {
    const review = await Bun.file(
      new URL("../public/evidence/bq_discovery_review.json", import.meta.url),
    ).json();
    expect(
      review.reviewed_labels.map((row: { organization_label: string }) => row.organization_label),
    ).toEqual(["FWD GROUP MANAGEMENT HOLDINGS LIMITED", "Swire Properties Inc."]);
    for (const locale of Object.values(report.locales)) {
      const section = locale.sections.find((value) => value.id === "bq-additions");
      expect(section).toBeDefined();
      const table = section!.blocks.find((value) => value.type === "table");
      expect(table?.type).toBe("table");
      if (table?.type === "table") {
        expect(table.rows.map((row) => row[0])).toEqual(
          review.reviewed_labels.map(
            (row: { organization_label: string }) => row.organization_label,
          ),
        );
      }
    }
    expect(review.reviewed_labels[1].limit).toContain("Do not classify");
    expect(review.reviewed_labels[0].limit).toContain("policyholder-data");
  });

  test("BQ linkage tables match reviewed aggregates and preserve ownership limits", async () => {
    const linkage = await Bun.file(
      new URL("../public/evidence/bq_linkage_review.json", import.meta.url),
    ).json();
    for (const locale of Object.values(report.locales)) {
      const section = locale.sections.find((value) => value.id === "bq-linkage");
      expect(section).toBeDefined();
      const table = section!.blocks.find((value) => value.type === "table");
      if (table?.type !== "table") throw new Error("Missing linkage table");
      expect(table.rows).toEqual(
        linkage.labels.map(
          (row: {
            organization_label: string;
            unambiguous_candidate_tenants: number;
            candidate_clusters: number;
            gateway_matched_clusters: number;
            gateway_log_records: number;
          }) => [
            row.organization_label,
            String(row.unambiguous_candidate_tenants),
            String(row.candidate_clusters),
            String(row.gateway_matched_clusters),
            String(row.gateway_log_records),
          ],
        ),
      );
      const prose = section!.blocks
        .filter((block) => block.type === "paragraph")
        .map((block) => text(block.content))
        .join(" ");
      for (const count of ["124,052", "99,465", "1,097"]) expect(prose).toContain(count);
    }
    const english = report.locales.en.sections
      .find((value) => value.id === "bq-linkage")!
      .blocks.filter((block) => block.type === "paragraph")
      .map((block) => text(block.content))
      .join(" ");
    expect(english).toContain("does not require Hong Kong geography");
    expect(english).toContain("does not establish ownership throughout the log interval");
    expect(english).toContain("Do not add the two sets of counts");
  });

  test("commercial geography counts preserve unsupported company-label limits", async () => {
    const commercial = await Bun.file(
      new URL("../public/evidence/bq_commercial_review.json", import.meta.url),
    ).json();
    for (const locale of Object.values(report.locales)) {
      const section = locale.sections.find((value) => value.id === "bq-commercial");
      expect(section).toBeDefined();
      const table = section!.blocks.find((value) => value.type === "table");
      if (table?.type !== "table") throw new Error("Missing commercial table");
      expect(table.rows.map((row) => row.slice(1, 4).map(Number))).toEqual(
        commercial.table_coverage.map(
          (row: {
            rows_parsed: number;
            hk_location_rows: number;
            candidate_company_rows: number;
          }) => [row.rows_parsed, row.hk_location_rows, row.candidate_company_rows],
        ),
      );
    }
    const english = report.locales.en.sections
      .find((value) => value.id === "bq-commercial")!
      .blocks.filter((block) => block.type === "paragraph")
      .map((block) => text(block.content))
      .join(" ");
    expect(english).toContain("A zero candidate count therefore does not mean");
    expect(english).toContain("No such joins were performed in this batch");
  });

  test("commercial and support associations preserve source and historical limits", async () => {
    const commercial = await Bun.file(
      new URL("../public/evidence/bq_commercial_links_review.json", import.meta.url),
    ).json();
    const support = await Bun.file(
      new URL("../public/evidence/bq_support_review.json", import.meta.url),
    ).json();
    for (const locale of Object.values(report.locales)) {
      const commercialSection = locale.sections.find((value) => value.id === "bq-commercial-links");
      const supportSection = locale.sections.find((value) => value.id === "bq-support");
      expect(commercialSection).toBeDefined();
      expect(supportSection).toBeDefined();
      const commercialTable = commercialSection!.blocks.find((value) => value.type === "table");
      const supportTable = supportSection!.blocks.find((value) => value.type === "table");
      if (commercialTable?.type !== "table" || supportTable?.type !== "table")
        throw new Error("Missing association evidence table");
      expect(commercialTable.rows.map((row) => Number(row[1]))).toEqual(
        [
          "salesforce_contract",
          "salesforce_quote",
          "salesforce_opportunity",
          "nexuscrm_opportunity",
        ].map((key) => commercial.totals_by_source_kind[key].unique_native_records),
      );
      expect(supportTable.rows).toEqual(
        support.exact_organization_name_route.label_counts
          .filter((row: { distinct_ticket_ids: number }) => row.distinct_ticket_ids > 0)
          .map(
            (row: {
              organization_label: string;
              organizations: number;
              distinct_ticket_ids: number;
            }) => [
              row.organization_label,
              String(row.organizations),
              String(row.distinct_ticket_ids),
            ],
          ),
      );
    }
    const prose = (id: string) =>
      report.locales.en.sections
        .find((value) => value.id === id)!
        .blocks.filter((block) => block.type === "paragraph")
        .map((block) => text(block.content))
        .join(" ");
    expect(prose("bq-commercial-links")).toContain(
      "must not be added as unique transactions or customers",
    );
    expect(prose("bq-commercial-links")).toContain("All five quote expiry dates precede");
    expect(prose("bq-support")).toContain("do not inherit Hong Kong geography");
    expect(prose("bq-support")).toContain(
      "does not establish an outage caused by the security incident",
    );
  });

  test("material counts retain per-source units and credential limitations", async () => {
    const evidence = await Bun.file(
      new URL("../public/evidence/bq_material_review.json", import.meta.url),
    ).json();
    for (const locale of Object.values(report.locales)) {
      const section = locale.sections.find((value) => value.id === "bq-material");
      expect(section).toBeDefined();
      const table = section!.blocks.find((value) => value.type === "table");
      if (table?.type !== "table") throw new Error("Missing material evidence table");
      expect(
        table.rows.map((row) => [row[0], Number(row[2]), Number(row[3]), Number(row[4])]),
      ).toEqual([
        ["BQM001", evidence.sources.BQM001.rows_parsed, 203171, 202543],
        ["BQM002", evidence.sources.BQM002.rows_parsed, 150725, 150149],
        ["BQM003", evidence.sources.BQM003.rows_parsed, 115132, 115132],
      ]);
    }
    const prose = report.locales.en.sections
      .find((value) => value.id === "bq-material")!
      .blocks.filter((block) => block.type === "paragraph")
      .map((block) => text(block.content))
      .join(" ");
    expect(prose).toContain("not counts of successful queries or usable credentials");
    expect(prose).toContain("do not establish a shared namespace");
    expect(prose).toContain("API records are not attributed to companies");
  });

  test("additional account labels preserve prospecting and geography conflicts", async () => {
    const evidence = await Bun.file(
      new URL("../public/evidence/bq_account_additions_review.json", import.meta.url),
    ).json();
    for (const locale of Object.values(report.locales)) {
      const section = locale.sections.find((value) => value.id === "bq-account-additions");
      expect(section).toBeDefined();
      const table = section!.blocks.find((value) => value.type === "table");
      if (table?.type !== "table") throw new Error("Missing additional account evidence table");
      expect(table.rows.map((row) => [row[0], Number(row[1]), row[2]])).toEqual(
        evidence.labels.map(
          (row: {
            organization_label: string;
            source_row_observations: number;
            account_qualification: { nexus_account_status: string };
          }) => [
            row.organization_label,
            row.source_row_observations,
            row.account_qualification.nexus_account_status === "qualified"
              ? "Qualified"
              : "Prospecting",
          ],
        ),
      );
      expect(table.rows).toHaveLength(4);
    }
    const section = report.locales.en.sections.find(
      (value) => value.id === "bq-account-additions",
    )!;
    const prose = section.blocks
      .filter((block) => block.type === "paragraph")
      .map((block) => text(block.content))
      .join(" ");
    expect(prose).toContain("HANG SENG BANK LTD was already indexed");
    expect(prose).toContain("must not be presented as confirmed Hong Kong customer accounts");
    expect(prose).toContain("The Nexus projection does not collect a won flag");
    expect(prose).toContain("75 repeated finance snapshots");
  });

  test("integration presence keeps field counts and units separate", () => {
    for (const locale of Object.values(report.locales)) {
      const section = locale.sections.find((value) => value.id === "bq-integration");
      const table = section!.blocks.find((value) => value.type === "table");
      if (table?.type !== "table") throw new Error("Missing integration evidence table");
      expect(table.rows.map((row) => [row[0], row[4]])).toEqual([
        ["BQI001", "1"],
        ["BQI002", "6 / 6"],
        ["BQI003", "5"],
        ["BQI004", "436"],
        ["BQI005", "2"],
        ["BQI006", "1"],
      ]);
    }
    const prose = report.locales.en.sections
      .find((value) => value.id === "bq-integration")!
      .blocks.filter((block) => block.type === "paragraph")
      .map((block) => text(block.content))
      .join(" ");
    expect(prose).toContain("no company, customer or Hong Kong attribution");
    expect(prose).toContain("Principal identifiers are not unique tokens");
    expect(prose).toContain("No credential or endpoint was tested");
  });

  test("DataApp presence preserves publication disagreements", () => {
    for (const locale of Object.values(report.locales)) {
      const section = locale.sections.find((value) => value.id === "bq-dataapp");
      const table = section!.blocks.find((value) => value.type === "table");
      if (table?.type !== "table") throw new Error("Missing DataApp evidence table");
      expect(table.rows.map((row) => [row[0], Number(row[2]), row[3]])).toEqual([
        ["BQAPP001", 42640, "—"],
        ["BQAPP002", 227864, "—"],
        ["BQAPP003", 45428, "21246"],
      ]);
    }
    const prose = report.locales.en.sections
      .find((value) => value.id === "bq-dataapp")!
      .blocks.filter((block) => block.type === "paragraph")
      .map((block) => text(block.content))
      .join(" ");
    expect(prose).toContain("195 publications disagree");
    expect(prose).toContain("deletion and current activity unverified");
    expect(prose).toContain("no company or Hong Kong attribution");
  });

  test("authentication presence keeps portal and raw version counts distinct", () => {
    for (const locale of Object.values(report.locales)) {
      const section = locale.sections.find((value) => value.id === "bq-auth");
      const table = section!.blocks.find((value) => value.type === "table");
      if (table?.type !== "table") throw new Error("Missing authentication evidence table");
      expect(table.rows.map((row) => [row[0], row[4]])).toEqual([
        ["BQAUTH001", "6"],
        ["BQAUTH003", "373"],
        ["BQAUTH005", "3550 / 3550"],
        ["BQAUTH007", "27 / 6"],
      ]);
    }
    const prose = report.locales.en.sections
      .find((value) => value.id === "bq-auth")!
      .blocks.filter((block) => block.type === "paragraph")
      .map((block) => text(block.content))
      .join(" ");
    expect(prose).toContain("no admitted session or person identifier");
    expect(prose).toContain("23,728 IDs have differing full-record versions");
    expect(prose).toContain("Final-layer naming does not establish current validity");
  });

  test("support and sales content preserve distinct label routes and units", () => {
    for (const locale of Object.values(report.locales)) {
      const support = locale.sections.find((value) => value.id === "bq-support-content")!;
      const sales = locale.sections.find((value) => value.id === "bq-sales-content")!;
      const supportTable = support.blocks.find((value) => value.type === "table");
      const salesTable = sales.blocks.find((value) => value.type === "table");
      if (supportTable?.type !== "table" || salesTable?.type !== "table")
        throw new Error("Missing content tables");
      expect(supportTable.rows.map((row) => [row[0], Number(row[1]), Number(row[2])])).toEqual([
        ["AmberGroup", 588, 4],
        ["Baidu (HONG KONG) Limited", 64, 13],
        ["Zhuo Fanl Industrial Co., Limited", 863, 23],
        ["shoplazza", 4, 0],
      ]);
      expect(
        salesTable.rows.map((row) => [row[0], Number(row[1]), Number(row[2]), Number(row[3])]),
      ).toEqual([
        ["Amber AI Limited", 2, 2, 184],
        ["Bytebase (HongKong) Limited", 1, 1, 232],
      ]);
    }
    const prose = report.locales.en.sections
      .filter((s) => ["bq-support-content", "bq-sales-content"].includes(s.id))
      .flatMap((s) => s.blocks)
      .filter((b) => b.type === "paragraph")
      .map((b) => text(b.content))
      .join(" ");
    expect(prose).toContain("disagree for 61 recording IDs");
    expect(prose).toContain("no attachment or URL was fetched");
    expect(prose).toContain("not merged with the separate support label AmberGroup");
  });

  test("HubSpot supplement keeps source counts and identity qualifications", () => {
    for (const locale of Object.values(report.locales)) {
      const section = locale.sections.find((value) => value.id === "bq-hubspot-additions")!;
      const table = section.blocks.find((value) => value.type === "table");
      if (table?.type !== "table") throw new Error("Missing HubSpot supplement");
      expect(table.rows.map((row) => [row[0], row[1]])).toEqual([
        ["China Mobile International Limited", "3 / 3"],
        ["China Telecom Global Limited", "1 / 1"],
        ["Sun Hung Kai Properties Limited", "1 / 1"],
        ["VTech Holdings Ltd.", "1 / 1"],
      ]);
    }
    const prose = report.locales.en.sections
      .find((s) => s.id === "bq-hubspot-additions")!
      .blocks.filter((b) => b.type === "paragraph")
      .map((b) => text(b.content))
      .join(" ");
    expect(prose).toContain("not six distinct companies");
    expect(prose).toContain("Bermuda incorporation");
    expect(prose).toContain("absent, null or empty string");
    expect(prose).toContain("do not authenticate CRM identities");
  });

  test("import fields preserve optional-field coverage and source units", () => {
    for (const locale of Object.values(report.locales)) {
      const section = locale.sections.find((s) => s.id === "bq-imports")!;
      const table = section.blocks.find((b) => b.type === "table");
      if (table?.type !== "table") throw new Error("Missing import field table");
      expect(table.rows.map((r) => [r[0], Number(r[1]), Number(r[2])])).toEqual([
        ["source_url", 46882, 0],
        ["current_tables", 46882, 199559],
        ["completed_tables", 46882, 199559],
        ["pending_tables", 46882, 199559],
        ["custom_csv_format", 40130, 0],
        ["csv_format", 0, 182763],
        ["target_table_infos", 28882, 201058],
      ]);
    }
    const prose = report.locales.en.sections
      .find((s) => s.id === "bq-imports")!
      .blocks.filter((b) => b.type === "paragraph")
      .map((b) => text(b.content))
      .join(" ");
    expect(prose).toContain("25,365 import IDs and 199,839 serverless import IDs");
    expect(prose).toContain("not establish ownership throughout a historical interval");
    expect(prose).toContain("separate precision review below covers 29 earlier source streams");
    expect(prose).toContain(
      "distinguishes changed numeric values from effects on reported results",
    );
  });

  test("MSP roles and exact label columns remain distinct in both languages", () => {
    for (const locale of Object.values(report.locales)) {
      const tables = locale.sections
        .find((s) => s.id === "bq-msp")!
        .blocks.filter((b) => b.type === "table");
      expect(tables).toHaveLength(2);
      expect(tables[0].rows.map((r) => [r[0], ...r.slice(1).map(Number)])).toEqual([
        ["billing_tenant_id", 0, 173786, 1207],
        ["billing_config_tenant_id", 174993, 0, 0],
        ["tenant_id", 0, 173786, 1207],
        ["msp_parent_tenant_id", 173780, 0, 1213],
      ]);
      expect(tables[1].rows.map((r) => [r[0], r[1], Number(r[2])])).toEqual([
        ["MEGAHARD LIMITED", "tenant_name", 2542],
        ["HONG KONG CLOUD Y TECHNOLOGY CO., LTD", "msp_parent_tenant_name", 310],
        ["MEGAHARD LIMITED", "msp_parent_tenant_name", 54945],
      ]);
    }
  });

  test("identity census keeps source rows and version groups separate", () => {
    for (const locale of Object.values(report.locales)) {
      const section = locale.sections.find((s) => s.id === "bq-identity")!;
      const table = section.blocks.find((b) => b.type === "table");
      if (table?.type !== "table") throw new Error("Missing identity census table");
      expect(table.rows.map((r) => [r[0], ...r.slice(2).map(Number)])).toEqual([
        ["BQIC001", 181935, 180824, 932, 1],
        ["BQIC002", 181938, 180827, 932, 0],
        ["BQIC003", 18, 18, 0, 0],
        ["BQIC004", 180824, 180824, 0, 6],
        ["BQIC005", 347, 347, 0, 0],
      ]);
    }
    const prose = report.locales.en.sections
      .find((s) => s.id === "bq-identity")!
      .blocks.filter((b) => b.type === "paragraph")
      .map((b) => text(b.content))
      .join(" ");
    expect(prose).toContain("119 rows with multiple distinct elements");
    expect(prose).toContain("not automatically a conflict");
    expect(prose).toContain("without admitting an identity bridge");
  });

  test("language URLs work at a nested static-host path", () => {
    expect(languageFromPath("/research/zh-Hant.html")).toBe("zh-Hant");
    expect(languageFromPath("/research/index.html")).toBe("en");
    expect(
      new URL(languagePath("zh-Hant"), "https://example.test/research/index.html").pathname,
    ).toBe("/research/zh-Hant.html");
    expect(
      new URL(evidenceHref("billing_evidence.csv"), "https://example.test/research/zh-Hant.html")
        .pathname,
    ).toBe("/research/evidence/billing_evidence.csv");
  });

  test("report links allow only public HTTPS, sections and reviewed file shapes", () => {
    expect(evidenceHref("https://www.pingcap.com/")).toBe("https://www.pingcap.com/");
    expect(evidenceHref("#catalog")).toBe("#catalog");
    for (const link of [
      "../private/raw.json",
      "javascript:alert(1)",
      "//other.test/data",
      "file:///tmp/data.csv",
    ])
      expect(() => evidenceHref(link)).toThrow();
  });

  test("both editions render real report HTML before JavaScript loads", () => {
    for (const language of ["en", "zh-Hant"] as const) {
      const html = renderToString(<App initialLanguage={language} />);
      expect(html).toContain(`lang="${language}"`);
      expect(html).toContain(report.locales[language].title);
      expect(html).toContain("128.3");
      expect(html).toContain("Shoplazza Hongkong Limited");
      expect(html).toContain('href="./evidence/billing_evidence.csv"');
      expect(html).toContain('href="./evidence/bq_coverage.json"');
      expect(html).toContain('href="./zh-Hant.html"');
    }
  });
});

test("public evidence contains only the reviewed allowlist with matching checksums", async () => {
  const directory = new URL("../public/evidence/", import.meta.url);
  expect((await readdir(directory)).sort()).toEqual([...evidenceFiles, "SHA256SUMS.txt"].sort());
  const manifest = await Bun.file(new URL("SHA256SUMS.txt", directory)).text();
  for (const line of manifest.trim().split("\n")) {
    const [expected, name] = line.split("  ");
    const bytes = await Bun.file(new URL(name, directory)).arrayBuffer();
    expect(createHash("sha256").update(Buffer.from(bytes)).digest("hex")).toBe(expected);
  }
});

test("CRM document metadata preserves missing references and empty source", async () => {
  const evidence = await Bun.file(
    new URL("../public/evidence/bq_crm_documents_review.json", import.meta.url),
  ).json();
  expect(evidence.counts).toEqual({
    tables_complete: 6,
    rows_parsed: 4271,
    verified_empty_tables: 1,
    parse_errors: 0,
  });
  for (const locale of Object.values(report.locales)) {
    const section = locale.sections.find((s) => s.id === "bq-documents")!;
    const table = section.blocks.find((b) => b.type === "table");
    if (table?.type !== "table") throw new Error("Missing document metadata table");
    expect(table.rows.map((r) => r.slice(2).map(Number))).toEqual([
      [2976, 2976],
      [1127, 1127],
      [0, 0],
      [42, 42],
      [42, 42],
      [84, 84],
    ]);
  }
  const prose = report.locales.en.sections
    .find((s) => s.id === "bq-documents")!
    .blocks.filter((b) => b.type === "paragraph")
    .map((b) => text(b.content))
    .join(" ");
  expect(prose).toContain("Every Nexus version row lacks ContentDocumentId");
  expect(prose).toContain("No URL was fetched");
  expect(evidence.company_attribution_established).toBe(false);
});

test("billing-model comparison distinguishes full records from common projections", async () => {
  const evidence = await Bun.file(
    new URL("../public/evidence/bq_msp_namespace_comparison_review.json", import.meta.url),
  ).json();
  for (const locale of Object.values(report.locales)) {
    const section = locale.sections.find((s) => s.id === "bq-msp-comparison")!;
    const table = section.blocks.find((b) => b.type === "table");
    if (table?.type !== "table") throw new Error("Missing model comparison table");
    expect(table.rows.map((r) => r.slice(1).map(Number))).toEqual([
      [71560, 71560, 71560],
      [763, 71560, 71560],
      [763, 71560, 71560],
    ]);
  }
  expect(evidence.namespace_comparisons[0].full_decoded_record_multiset.equal).toBe(true);
  expect(evidence.namespace_comparisons[0].uncompressed_streams_byte_equal).toBe(false);
  expect(evidence.counts.physical_sources_deduplicated).toBe(0);
});

test("raw document snapshots retain repeated versions without file-count claims", async () => {
  const evidence = await Bun.file(
    new URL("../public/evidence/bq_crm_raw_documents_review.json", import.meta.url),
  ).json();
  for (const locale of Object.values(report.locales)) {
    const section = locale.sections.find((s) => s.id === "bq-raw-documents")!;
    const table = section.blocks.find((b) => b.type === "table");
    if (table?.type !== "table") throw new Error("Missing raw document table");
    expect(table.rows.map((r) => r.slice(1).map(Number))).toEqual([
      [3192, 42, 42],
      [3192, 42, 42],
      [6300, 84, 84],
    ]);
  }
  const prose = report.locales.en.sections
    .find((s) => s.id === "bq-raw-documents")!
    .blocks.filter((b) => b.type === "paragraph")
    .map((b) => text(b.content))
    .join(" ");
  expect(prose).toContain("not unique leaked-file counts");
  expect(prose).toContain("does not prove invalid timestamps");
  expect(evidence.raw_final_union_performed).toBe(false);
  expect(evidence.document_contents_reviewed).toBe(false);
});

test("derived imports preserve source counts and representation-only comparisons", async () => {
  const evidence = await Bun.file(
    new URL("../public/evidence/bq_derived_imports_review.json", import.meta.url),
  ).json();
  for (const locale of Object.values(report.locales)) {
    const table = locale.sections
      .find((s) => s.id === "bq-derived-imports")!
      .blocks.find((b) => b.type === "table");
    if (table?.type !== "table") throw new Error("Missing derived import table");
    expect(table.rows.map((r) => [r[0], ...r.slice(2).map(Number)])).toEqual([
      ["BQDRV001", 46586, 46586, 0],
      ["BQDRV002", 46882, 46882, 0],
      ["BQDRV003", 229384, 229384, 0],
      ["BQDRV004", 229384, 229384, 0],
      ["BQDRV005", 29415, 29415, 0],
      ["BQDRV006", 394, 394, 0],
    ]);
  }
  expect(
    evidence.derived_pair_comparisons[0].representations.full_records.right_only_row_observations,
  ).toBe(296);
  expect(evidence.derived_pair_comparisons[1].representations.raw_lines.equal).toBe(true);
  expect(evidence.derived_pair_comparisons[1].uncompressed_streams_byte_equal).toBe(false);
  expect(evidence.native_reference_join_performed).toBe(false);
  const prose = report.locales.en.sections
    .find((s) => s.id === "bq-derived-imports")!
    .blocks.filter((b) => b.type === "paragraph")
    .map((b) => text(b.content))
    .join(" ");
  expect(prose).toContain("Nine rows in each model");
  expect(prose).toContain("without a join to native tables");
});

test("monthly model census retains duplicates and does not infer financial totals", async () => {
  const evidence = await Bun.file(
    new URL("../public/evidence/bq_msp_monthly_census_review.json", import.meta.url),
  ).json();
  for (const locale of Object.values(report.locales)) {
    const table = locale.sections
      .find((s) => s.id === "bq-monthly-models")!
      .blocks.find((b) => b.type === "table");
    if (table?.type !== "table") throw new Error("Missing monthly census table");
    expect(table.rows.map((r) => [r[0], ...r.slice(3).map(Number)])).toEqual([
      ["BQMSPM001", 575, 575, 0],
      ["BQMSPM002", 1683, 1683, 0],
      ["BQMSPM003", 575, 575, 0],
      ["BQMSPM004", 4178, 4178, 0],
      ["BQMSPM005", 28198, 28198, 0],
      ["BQMSPM006", 4178, 4178, 0],
      ["BQMSPM007", 71560, 28764, 42796],
      ["BQMSPM008", 174993, 85040, 89953],
      ["BQMSPM009", 71560, 28764, 42796],
    ]);
  }
  expect(evidence.sources.BQMSPM008.duplicate_typed_record_occurrences).toBe(89953);
  const prose = report.locales.en.sections
    .find((s) => s.id === "bq-monthly-models")!
    .blocks.filter((b) => b.type === "paragraph")
    .map((b) => text(b.content))
    .join(" ");
  expect(prose).toContain("25,656 occurrences");
  expect(prose).toContain("does not calculate monetary totals");
  expect(prose).toContain("equal records alone do not establish duplicate charges");
});

test("numeric precision review retains rounding evidence and bounded output checks", async () => {
  const evidence = await Bun.file(
    new URL("../public/evidence/bq_numeric_precision_review.json", import.meta.url),
  ).json();
  for (const locale of Object.values(report.locales)) {
    const section = locale.sections.find((s) => s.id === "bq-numeric-precision")!;
    const table = section.blocks.find((b) => b.type === "table");
    if (table?.type !== "table") throw new Error("Missing numeric review table");
    expect(table.rows.map((r) => r.slice(1).map(Number))).toEqual([
      [797722, 238424, 209275],
      [3045, 0, 0],
      [23972, 307, 307],
      [168647, 50701, 50599],
    ]);
  }
  expect(evidence.sales_exact_audit.checks.frozen_sales_outputs_unchanged).toBe(true);
  expect(evidence.hubspot_exact_audit.original_signatures_cover_safe_projections_only).toBe(true);
  expect(evidence.additional_cumulative_source_rows).toBe(0);
  expect(evidence.all_earlier_families_covered).toBe(false);
  const prose = report.locales.en.sections
    .find((s) => s.id === "bq-numeric-precision")!
    .blocks.filter((b) => b.type === "paragraph")
    .map((b) => text(b.content))
    .join(" ");
  expect(prose).toContain("117 physical tables and 18,154,882");
  expect(prose).toContain("5,736 nonempty tables and 605 empty tables");
  expect(prose).toContain("other earlier families remain outside this numeric review");
});

test("CRM quarantine versions remain source-local claims with no accepted bindings", async () => {
  const evidence = await Bun.file(
    new URL("../public/evidence/bq_crm_quarantine_review.json", import.meta.url),
  ).json();
  for (const locale of Object.values(report.locales)) {
    const table = locale.sections
      .find((s) => s.id === "bq-crm-quarantine")!
      .blocks.find((b) => b.type === "table");
    if (table?.type !== "table") throw new Error("Missing quarantine table");
    expect(table.rows.map((r) => [r[0], ...r.slice(2).map(Number)])).toEqual([
      ["BQQCL001", 45433, 45433, 0],
      ["BQQCL002", 231119, 45433, 42275],
    ]);
  }
  expect(evidence.inventory_only_empty_binding_references.selected_streams_scanned).toBe(0);
  expect(evidence.accepted_binding_established).toBe(false);
  expect(evidence.raw_final_union_performed).toBe(false);
  expect(evidence.sources.BQQCL002.maximum_versions_per_id_group).toBe(8);
  const prose = report.locales.en.sections
    .find((s) => s.id === "bq-crm-quarantine")!
    .blocks.filter((b) => b.type === "paragraph")
    .map((b) => text(b.content))
    .join(" ");
  expect(prose).toContain("equal cardinalities do not establish equal combinations");
  expect(prose).toContain("no latest record is selected");
});

test("further company contexts distinguish source observations from jurisdiction and customer status", async () => {
  const evidence = await Bun.file(
    new URL("../public/evidence/bq_hubspot_identity_context_v2_review.json", import.meta.url),
  ).json();
  const names = [
    "Sa Sa International Holdings Limited",
    "CargoSmart Limited",
    "PCCW-HKT DataCom Services Limited",
  ];
  for (const locale of Object.values(report.locales)) {
    const table = locale.sections
      .find((s) => s.id === "bq-hubspot-identity-context")!
      .blocks.find((b) => b.type === "table");
    if (table?.type !== "table") throw new Error("Missing identity context table");
    expect(table.rows.map((r) => r[0])).toEqual(names);
    expect(table.rows.map((r) => Number(r[1]))).toEqual([1, 1, 1]);
  }
  expect(evidence.additional_physical_sources).toBe(0);
  expect(evidence.additional_cumulative_rows).toBe(0);
  expect(
    evidence.reviewed_labels.map((s: { lifecycle_category: string }) => s.lifecycle_category),
  ).toEqual(["missing", "subscriber", "missing"]);
  const prose = report.locales.en.sections
    .find((s) => s.id === "bq-hubspot-identity-context")!
    .blocks.filter((b) => b.type === "paragraph")
    .map((b) => text(b.content))
    .join(" ");
  expect(prose).toContain("Cayman Islands incorporation");
  expect(prose).toContain("British Virgin Islands incorporation");
  expect(prose).toContain("not a current Companies Registry check");
  expect(prose).toContain("do not authenticate the CRM records");
});

test("Nexus parent structure keeps additional fields and unadmitted reference strings explicit", async () => {
  const evidence = await Bun.file(
    new URL("../public/evidence/bq_nexus_commercial_parents_review.json", import.meta.url),
  ).json();
  for (const locale of Object.values(report.locales)) {
    const table = locale.sections
      .find((s) => s.id === "bq-nexus-commercial-parents")!
      .blocks.find((b) => b.type === "table");
    if (table?.type !== "table") throw new Error("Missing commercial parent table");
    expect(table.rows.map((r) => [r[0], ...r.slice(2).map(Number)])).toEqual([
      ["BQNCP001", 505, 505, 30],
      ["BQNCP002", 972, 972, 109],
    ]);
  }
  expect(evidence.sources.BQNCP001.literal_flags.Archived__c).toEqual({
    string_zero: 491,
    string_one: 14,
  });
  expect(evidence.sources.BQNCP002.literal_flags.IsDeleted).toEqual({
    string_zero: 956,
    string_one: 16,
  });
  const prose = report.locales.en.sections
    .find((s) => s.id === "bq-nexus-commercial-parents")!
    .blocks.filter((b) => b.type === "paragraph")
    .map((b) => text(b.content))
    .join(" ");
  expect(prose).toContain("no native target join is admitted");
  expect(prose).toContain("do not establish executed contracts");
  expect(prose).toContain("Line-item tables are outside this two-source batch");
});

test("dated company context preserves exact source labels and excludes unsupported customer conclusions", async () => {
  const evidence = await Bun.file(
    new URL("../public/evidence/bq_hubspot_identity_context_v3_review.json", import.meta.url),
  ).json();
  for (const locale of Object.values(report.locales)) {
    const table = locale.sections
      .find((s) => s.id === "bq-hubspot-dated-identity")!
      .blocks.find((b) => b.type === "table");
    if (table?.type !== "table") throw new Error("Missing dated identity table");
    expect(table.rows.map((r) => [r[0], Number(r[1])])).toEqual([
      ["Everbright Sun Hung Kai Company Limited", 1],
      ["Neat Limited", 1],
    ]);
  }
  expect(evidence.additional_physical_sources).toBe(0);
  expect(
    evidence.reviewed_labels.map((r: { lifecycle_category: string }) => r.lifecycle_category),
  ).toEqual(["lead", "lead"]);
  const prose = report.locales.en.sections
    .find((s) => s.id === "bq-hubspot-dated-identity")!
    .blocks.filter((b) => b.type === "paragraph")
    .map((b) => text(b.content))
    .join(" ");
  expect(prose).toContain("10 January 2022");
  expect(prose).toContain("30 November 2023");
  expect(prose).toContain("26 November 2015");
  expect(prose).toContain("it was not matched to a private CRM identifier");
  expect(prose).toContain("do not date or authenticate the CRM rows");
});

test("line-item structure retains missing references and literal flags without native joins", async () => {
  const evidence = await Bun.file(
    new URL("../public/evidence/bq_nexus_line_items_review.json", import.meta.url),
  ).json();
  for (const locale of Object.values(report.locales)) {
    const table = locale.sections
      .find((s) => s.id === "bq-nexus-line-items")!
      .blocks.find((b) => b.type === "table");
    if (table?.type !== "table") throw new Error("Missing line-item table");
    expect(table.rows.map((r) => [r[0], ...r.slice(2).map(Number)])).toEqual([
      ["BQNLI001", 1048, 1048, 0],
      ["BQNLI002", 1089, 1089, 0],
      ["BQNLI003", 2644, 2644, 0],
    ]);
  }
  expect(evidence.sources.BQNLI001.literal_flags.IsDeleted).toEqual({ string_one: 1048 });
  expect(evidence.sources.BQNLI002.identifier_state_rows.Product2Id.absent).toBe(1);
  expect(evidence.cross_source_or_native_join_performed).toBe(false);
  const prose = report.locales.en.sections
    .find((s) => s.id === "bq-nexus-line-items")!
    .blocks.filter((b) => b.type === "paragraph")
    .map((b) => text(b.content))
    .join(" ");
  expect(prose).toContain("no parent records were read or joined");
  expect(prose).toContain("no explicit foreign-key targets");
  expect(prose).toContain("without treating them as established deletion or live-state semantics");
});
