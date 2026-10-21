import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { readdir } from "node:fs/promises";
import evidenceFiles from "../scripts/evidence-files.json";
import { companies } from "../src/content/companies";
import { copyFor } from "../src/content";
import { facts } from "../src/content/facts";
import { laterNames } from "../src/content/later-names";
import { languages, resolveHref } from "../src/site";
import { businesses, entries } from "../src/lib/search";

const evidence = new URL("../public/evidence/", import.meta.url);
const read = (name: string) => Bun.file(new URL(name, evidence)).text();

function csv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  const input = text.replace(/^\uFEFF/, "");
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (quoted) {
      if (c === '"' && input[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (c === '"') {
        quoted = false;
      } else {
        cell += c;
      }
    } else if (c === '"') {
      quoted = true;
    } else if (c === ",") {
      row.push(cell);
      cell = "";
    } else if (c === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (c !== "\r") {
      cell += c;
    }
  }
  const [header, ...body] = rows;
  return body.map((values) => Object.fromEntries(header.map((key, i) => [key, values[i]])));
}

/** Every string in a copy object, so link and markup checks cover all of it. */
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

describe("site copy", () => {
  test("both languages have the same structure and no empty text", () => {
    const shape = (value: unknown): unknown => {
      if (typeof value === "function") return "fn";
      if (typeof value === "string") return value.trim() === "" ? "EMPTY" : "text";
      if (Array.isArray(value)) return value.map(shape);
      if (value && typeof value === "object") {
        return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]));
      }
      return value;
    };
    expect(shape(copyFor("zh-Hant"))).toEqual(shape(copyFor("en")));
    expect(JSON.stringify(shape(copyFor("en")))).not.toContain("EMPTY");
  });

  test("every link in the copy resolves in both languages", () => {
    const hrefs = (text: string) => [...text.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]);
    for (const language of languages) {
      const copy = copyFor(language);
      for (const text of strings(copy)) {
        for (const href of hrefs(text)) expect(() => resolveHref(language, href)).not.toThrow();
      }
      for (const link of copy.footer.links)
        expect(() => resolveHref(language, link.href)).not.toThrow();
      for (const group of copy.technical.downloads.groups) {
        for (const item of group.files)
          expect(() => resolveHref(language, `evidence:${item.file}`)).not.toThrow();
      }
    }
  });

  test("copy holds no raw HTML or unbalanced markup", () => {
    for (const language of languages) {
      for (const text of strings(copyFor(language))) {
        expect(text).not.toMatch(/<\/?[a-z][^>]*>/i);
        expect((text.match(/\*\*/g) ?? []).length % 2).toBe(0);
      }
    }
  });

  test("guidance never promises safety or accuses a named company", () => {
    const text = strings(copyFor("en").home).join(" ");
    expect(text).not.toMatch(/\b(you are safe|guaranteed|were hacked:|victims are)\b/i);
    expect(copyFor("en").home.action.intro).toContain("not legal or security advice");
  });
});

describe("company findings", () => {
  test("nine companies, each present in the directory with matching billing evidence", async () => {
    expect(companies).toHaveLength(facts.examinedCompanies);
    const labels = new Set(businesses.map((b) => b.label.toLowerCase()));
    const billing = csv(await read("billing_evidence.csv"));
    for (const company of companies) {
      expect(labels.has(company.name.toLowerCase())).toBe(true);
      expect(company.refs).toHaveLength(company.billingRecords.length);
      company.refs.forEach((ref, i) => {
        const row = billing.find((r) => r.evidence_ref === ref);
        expect(row?.organization_label).toBe(company.name);
        expect(Number(row?.billing_row_observations)).toBe(company.billingRecords[i]);
      });
      for (const language of languages) {
        const text = company.text[language];
        expect(text.found.length).toBeGreaterThan(0);
        if (company.refs.length === 1) {
          expect(text.found.join(" ")).toContain(company.billingRecords[0].toLocaleString("en-US"));
        }
      }
      for (const source of company.sources) expect(source.startsWith("https://")).toBe(true);
    }
  });

  test("code-archive additions match the repository review", async () => {
    const review = JSON.parse(await read("repos_findings.json"));
    expect(review.new_affected_company_count_asserted).toBe(false);
    for (const org of review.organizations) {
      const company = companies.find((c) => c.name === org.organization_label);
      expect(company).toBeDefined();
      for (const language of languages) {
        const found = company!.text[language].found.join(" ");
        if (org.finance_row_observations) {
          expect(company!.records.repo).toBe(true);
          expect(found).toContain(String(org.finance_row_observations));
        }
      }
    }
    // only companies the review says it strengthened carry a source-code tag
    const tagged = companies
      .filter((c) => c.records.repo)
      .map((c) => c.name)
      .sort();
    const withRows = review.organizations
      .filter((o: { finance_row_observations: number | null }) => o.finance_row_observations)
      .map((o: { organization_label: string }) => o.organization_label)
      .sort();
    expect(tagged).toEqual(withRows);
  });

  test("priority_findings.csv names the same nine companies", async () => {
    const rows = csv(await read("priority_findings.csv"));
    expect(rows.map((r) => r.organization_label).sort()).toEqual(
      companies.map((c) => c.name).sort(),
    );
  });
});

describe("headline figures", () => {
  test("match the evidence downloads", async () => {
    const counts = JSON.parse(await read("report_counts.json"));
    expect(counts.screened_business_labels).toBe(facts.namesScreened);
    expect(counts.contextual_support_records).toBe(facts.supportRecords);
    expect(counts.gateway_context_labels).toBe(facts.supportCompanies);
    expect(counts.priority_findings).toBe(facts.examinedCompanies);
    expect(businesses).toHaveLength(facts.namesScreened);

    const bq = JSON.parse(await read("bq_coverage.json"));
    expect(bq.inventory.table_count).toBe(facts.bqTables);
    expect(bq.inventory.dataset_count).toBe(facts.bqDatasets);

    const repos = JSON.parse(await read("repos_coverage.json"));
    expect(repos.archive_members_inventoried).toBe(facts.repoMembers);
    expect(repos.repository_directories).toBe(facts.repoDirectories);
    expect(repos.source_text_member_files_searched).toBe(facts.repoTextFiles);
    expect(repos.git_repositories_reviewed).toBe(facts.repoGitRepositories);

    const analytics = JSON.parse(await read("bq_analytics_users_review.json"));
    expect(analytics.coverage.completed_sources).toBe(facts.analyticsExportSources);
    expect(Number(analytics.integrity.parsed_rows)).toBe(facts.analyticsExportRows);
    expect(Number(analytics.geography.country.hk_literal)).toBe(facts.analyticsExportHkCountryRows);

    const pseudonymous = JSON.parse(await read("analytics_pseudonymous.json"));
    expect(Number(pseudonymous.integrity.parsed_rows)).toBe(facts.pseudonymousExportRows);
    expect(Number(pseudonymous.integrity.parse_errors)).toBe(0);
    expect(Number(pseudonymous.geography["geo.country"].hk_literal)).toBe(
      facts.pseudonymousExportHkCountryRows,
    );
    expect(Number(pseudonymous.geography["geo.city"].hk_literal)).toBe(
      facts.pseudonymousExportHkCityRows,
    );
    expect(Number(pseudonymous.geography["geo.region"].hk_literal)).toBe(0);

    const marketplace = JSON.parse(await read("bq_marketplace_references_review.json"));
    expect(marketplace.selected_sources).toBe(facts.marketplaceSources);
    expect(marketplace.row_observations).toBe(facts.marketplaceRows);

    const scope = JSON.parse(await read("bq_scope_summary.json"));
    expect(scope.cumulative_unique_tables).toBe(facts.bqTablesReviewed);
    expect(scope.cumulative_table_row_observations).toBe(facts.bqRowsReviewed);
    expect(scope.remaining_nonempty_tables_outside_selected_scope).toBe(
      facts.bqNonEmptyTablesRemaining,
    );
    expect(scope.remaining_empty_tables_outside_selected_scope).toBe(facts.bqEmptyTablesRemaining);
    expect(scope.inventory_table_count).toBe(facts.bqTables);

    const gateway = JSON.parse(await read("gateway_final_coverage.json"));
    expect(gateway.valid_log_records).toBe(facts.gatewayRecords);
    expect(gateway.csv_files).toBe(facts.gatewayFiles);
  });

  test("marketing-only count is derived from the directory, not typed in", () => {
    const marketing = entries.filter((e) => e.verdict === "marketing").length;
    expect(marketing).toBe(facts.marketingOnly);
  });

  test("table review total adds up", () => {
    // 1,876 reviewed + 3,977 non-empty + 605 empty tables remain
    expect(
      facts.bqTablesReviewed + facts.bqNonEmptyTablesRemaining + facts.bqEmptyTablesRemaining,
    ).toBe(facts.bqTables);
  });
});

describe("evidence downloads", () => {
  test("every linked file exists, is allowlisted, and the folder holds nothing else", async () => {
    const present = (await readdir(evidence)).filter((f) => f !== "SHA256SUMS.txt");
    for (const language of languages) {
      for (const group of copyFor(language).technical.downloads.groups) {
        for (const { file } of group.files) {
          if (file === "SHA256SUMS.txt") continue;
          expect(present).toContain(file);
          expect(evidenceFiles).toContain(file);
        }
      }
    }
    for (const file of present) expect(evidenceFiles).toContain(file);
  });

  test("every technical group links to files that are listed under Downloads", () => {
    const copy = copyFor("en");
    const listed = new Set(
      copy.technical.downloads.groups.flatMap((g) => g.files.map((f) => f.file)),
    );
    for (const group of copy.technical.groups) {
      for (const file of group.files) expect(listed.has(file)).toBe(true);
    }
  });

  test("checksums match the committed files", async () => {
    const sums = new Map(
      (await read("SHA256SUMS.txt"))
        .trim()
        .split("\n")
        .map((line) => line.split("  ").reverse() as [string, string]),
    );
    const present = (await readdir(evidence)).filter((f) => f !== "SHA256SUMS.txt");
    for (const file of present) {
      const hash = createHash("sha256")
        .update(Buffer.from(await Bun.file(new URL(file, evidence)).arrayBuffer()))
        .digest("hex");
      expect(sums.get(file)).toBe(hash);
    }
  });
});

describe("later names", () => {
  test("every note exists in both languages", () => {
    for (const item of laterNames) {
      expect(item.note.en.length).toBeGreaterThan(20);
      expect(item.note["zh-Hant"].length).toBeGreaterThan(10);
    }
  });

  test("labels already in the directory get a note instead of a duplicate entry", () => {
    const labels = entries.map((e) => e.label.toLowerCase());
    expect(new Set(labels).size).toBe(labels.length);
    const merged = entries.find((e) => e.label === "AmberGroup");
    expect(merged?.later?.en).toContain("Amber AI Limited");
    expect(merged?.verdict).not.toBe("later");
  });
});
