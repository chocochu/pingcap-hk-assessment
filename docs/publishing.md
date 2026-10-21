# Publishing an update

The site content is edited by hand in this repository. The analysis workspace produces evidence files; it does not generate site text.

## When the analysis changes

1. Finish the analysis redaction and validation process in the parent workspace.
2. Add any new evidence file to `scripts/evidence-files.json`, then run `bun run sync:evidence`. It refuses files that aren't on the allowlist or whose checksum differs from the analysis manifest.
3. Update `src/content/facts.ts` for any changed headline figure.
4. Update copy in **both** `src/content/en.ts` and `src/content/zh-Hant.ts`:
   - a new company finding goes in `src/content/companies.ts` and in `facts.examinedCompanies`;
   - a new name found in a later review goes in `src/content/later-names.ts`;
   - a new technical review goes in the matching group under `technical.groups`, and its file under `technical.downloads`.
5. Add an entry to the top of `history` in `src/data/publication.json`: increment `version`, set `preparedAt` to an ISO 8601 instant with seconds and a timezone, and give a short English and Traditional Chinese summary. Also update the top-level `version` and `preparedAt`.

## Check

```sh
bun run check
bun run build
bun run preview
```

`bun run check` cross-checks the headline figures against `report_counts.json`, `bq_coverage.json`, `gateway_final_coverage.json` and `billing_evidence.csv`, and confirms that both languages have identical structure, every link resolves, and every download exists, is allowlisted and matches `SHA256SUMS.txt`.

Then look at both languages in a browser: the overview, search (try a company name, a miss, and each filter), and the company cards. Check the pages at phone width.

## Publish

Never stage raw archives, private analysis, credentials or local receipts. Push normally to `main`; never force-push. Vercel deploys `main`; confirm the production deployment is ready, then open the English and Traditional Chinese pages.

## Redaction boundary

Public downloads may contain company labels, source-recorded domains, aggregate counts and redacted source references. They must not contain personal names or emails, credentials, customer IP addresses or endpoints, tenant or cluster identifiers, or raw leaked records.
