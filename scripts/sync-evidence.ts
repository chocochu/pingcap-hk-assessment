import { createHash } from "node:crypto";
import { mkdir, readdir } from "node:fs/promises";
import evidenceFiles from "./evidence-files.json";

const source = new URL("../../analysis/output/report/", import.meta.url);
const destination = new URL("../public/evidence/", import.meta.url);
const manifest = await Bun.file(new URL("SHA256SUMS.txt", source)).text();
const hashes = new Map(
  manifest
    .trim()
    .split("\n")
    .map((line) => {
      const [hash, filename] = line.split("  ");
      return [filename, hash];
    }),
);
await mkdir(destination, { recursive: true });
const permitted = new Set([...evidenceFiles, "SHA256SUMS.txt"]);
for (const entry of await readdir(destination)) {
  if (!permitted.has(entry)) throw new Error(`Unreviewed file in public/evidence: ${entry}`);
}

const checksums: string[] = [];
for (const name of evidenceFiles) {
  const data = await Bun.file(new URL(name, source)).arrayBuffer();
  const hash = createHash("sha256").update(Buffer.from(data)).digest("hex");
  if (hashes.get(name) !== hash) throw new Error(`Evidence checksum mismatch: ${name}`);
  await Bun.write(new URL(name, destination), data);
  checksums.push(`${hash}  ${name}`);
}
await Bun.write(new URL("SHA256SUMS.txt", destination), checksums.join("\n") + "\n");
console.log(`Copied ${evidenceFiles.length} reviewed evidence files.`);
