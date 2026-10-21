import { createHash } from "node:crypto";
import { mkdir, readdir } from "node:fs/promises";
import evidenceFiles from "./evidence-files.json";

// Most files come from the main report. Files named repos_* come from the
// repository-archive review, where the same file is stored without the prefix.
const sources = [
  { prefix: "", dir: new URL("../../analysis/output/report/", import.meta.url) },
  { prefix: "repos_", dir: new URL("../../analysis/output/repos_review/", import.meta.url) },
];
const destination = new URL("../public/evidence/", import.meta.url);

async function manifest(dir: URL): Promise<Map<string, string>> {
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

const hashes = new Map(
  await Promise.all(sources.map(async (s) => [s.dir.href, await manifest(s.dir)] as const)),
);

function locate(name: string): { dir: URL; file: string } {
  const repos = sources[1];
  if (name.startsWith(repos.prefix))
    return { dir: repos.dir, file: name.slice(repos.prefix.length) };
  return { dir: sources[0].dir, file: name };
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
