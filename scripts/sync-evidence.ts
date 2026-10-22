import { createHash } from "node:crypto";
import { mkdir, readdir } from "node:fs/promises";
import evidenceFiles from "./evidence-files.json";

// Most files come from the main report. Files named repos_* come from the
// repository-archive review, where the same file is stored without the prefix.
// Files in `findings` come from the findings-only deliveries, which list their
// hashes in manifest.json (or handoff_manifest.json) instead of SHA256SUMS.txt;
// they may be published under a different public name.
const report = new URL("../../analysis/output/report/", import.meta.url);
const repos = new URL("../../analysis/output/repos_review/", import.meta.url);
const destination = new URL("../public/evidence/", import.meta.url);

const findings: Record<string, { dir: URL; file: string }> = {
  "analytics_pseudonymous.json": {
    dir: new URL("../../analysis/output/findings_pseudonymous_v1/", import.meta.url),
    file: "analytics_pseudonymous.json",
  },
  "bq_scope_summary.json": {
    dir: new URL("../../analysis/output/findings_exposure_continuation_v1/", import.meta.url),
    file: "scope_summary.json",
  },
  "bq_marketplace_references_review.json": {
    dir: new URL("../../analysis/output/findings_marketplace_v1/", import.meta.url),
    file: "bq_marketplace_references_review.json",
  },
  "bq_user_account_links.json": {
    dir: new URL("../../analysis/output/findings_exposure_packet_v1/", import.meta.url),
    file: "exposure_packet.json",
  },
  "bq_sales_communications_hubspot.json": {
    dir: new URL("../../analysis/output/findings_sales_hubspot_v1/", import.meta.url),
    file: "candidate/exposure_packet.json",
  },
  "bq_workforce_directory.json": {
    dir: new URL("../../analysis/output/findings_workforce_directory_v1/", import.meta.url),
    file: "candidate/exposure_packet.json",
  },
  "bq_workforce_hr.json": {
    dir: new URL("../../analysis/output/findings_workforce_hr_v1/", import.meta.url),
    file: "candidate/exposure_packet.json",
  },
  "bq_workforce_ancillary.json": {
    dir: new URL("../../analysis/output/findings_workforce_ancillary_v1/", import.meta.url),
    file: "candidate/exposure_packet.json",
  },
  "bq_sales_conversations_chorus.json": {
    dir: new URL("../../analysis/output/findings_sales_chorus_v1/", import.meta.url),
    file: "candidate/exposure_packet.json",
  },
};

async function sums(dir: URL): Promise<Map<string, string>> {
  const text = await Bun.file(new URL("SHA256SUMS.txt", dir)).text();
  return new Map(
    text
      .trim()
      .split("\n")
      .map((line) => {
        const [hash, filename] = line.split("  ");
        return [filename, hash];
      }),
  );
}

async function manifest(dir: URL): Promise<Map<string, string>> {
  const own = Bun.file(new URL("manifest.json", dir));
  const data = await (
    (await own.exists()) ? own : Bun.file(new URL("handoff_manifest.json", dir))
  ).json();
  const files = data.files ?? data.artifacts;
  const entries: [string, { sha256: string }][] = Array.isArray(files)
    ? files.map((v: { path: string; sha256: string }) => [v.path, v])
    : Object.entries(files);
  return new Map(entries.map(([name, v]) => [name, v.sha256]));
}

const hashes = new Map<string, Map<string, string>>([
  [report.href, await sums(report)],
  [repos.href, await sums(repos)],
]);
for (const { dir } of Object.values(findings))
  if (!hashes.has(dir.href)) hashes.set(dir.href, await manifest(dir));

function locate(name: string): { dir: URL; file: string } {
  if (findings[name]) return findings[name];
  if (name.startsWith("repos_")) return { dir: repos, file: name.slice("repos_".length) };
  return { dir: report, file: name };
}

await mkdir(destination, { recursive: true });
const permitted = new Set([...evidenceFiles, "SHA256SUMS.txt"]);
for (const entry of await readdir(destination)) {
  if (!permitted.has(entry)) throw new Error(`Unreviewed file in public/evidence: ${entry}`);
}

const checksums: string[] = [];
for (const name of evidenceFiles) {
  const { dir, file } = locate(name);
  const data = await Bun.file(new URL(file, dir)).arrayBuffer();
  const hash = createHash("sha256").update(Buffer.from(data)).digest("hex");
  if (hashes.get(dir.href)?.get(file) !== hash)
    throw new Error(`Evidence checksum mismatch: ${name}`);
  await Bun.write(new URL(name, destination), data);
  checksums.push(`${hash}  ${name}`);
}
await Bun.write(new URL("SHA256SUMS.txt", destination), checksums.join("\n") + "\n");
console.log(`Copied ${evidenceFiles.length} reviewed evidence files.`);
