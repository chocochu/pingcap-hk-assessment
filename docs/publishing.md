# Publishing validated report updates

The analysis chat owns the source archives, analysis and generated local report.
The publishing chat checks hourly and publishes only a validated snapshot. It does
not start scans or infer new findings from chat summaries alone.

## Capture a release

1. Read the latest analysis status and `analysis/private/bq_latest_refresh.json`
   in the parent workspace. A completed refresh is required; an in-progress BQ
   investigation can still produce a valid, explicitly limited progress update.
2. Clone the public repository into a separate local checkout. Fetch `main` and
   confirm the checkout is clean. Never reset the analysis chat's working files.
3. Run `analysis/scripts/prepare_site_publication.py --destination <checkout>`
   from the parent workspace. This local helper is not distributed in this repo.
   It acquires the refresh lock, verifies the validation receipt, source report
   hash and evidence checksums, and copies only the reviewed report data and
   allowlisted evidence. It retains an immutable private snapshot and receipt.
4. If `meaningful_change` is false, leave the public site unchanged. The content
   fingerprint ignores narrowly defined generation timestamps and derived hashes;
   a clock change alone is not a new finding.

## Version and verify

For a changed snapshot, update `src/data/publication.json` once per release:

- Increment the last numeric component of `version`.
- Record `preparedAt` as an ISO 8601 instant with seconds and timezone. This is
  the time the website release was prepared, not the original source event time.
- Copy `sourceReportSha256` and `contentSha256` from the preparation receipt.
- Prepend a history entry with the same version and timestamp and concise English
  and Traditional Chinese summaries. Keep existing entries and timestamps intact.

The website formats these instants as `YYYY-MM-DD HH:mm:ss HKT`. Historical
analysis entries with only a date remain date-only. If local generated data no
longer matches the recorded publication, the local preview labels it unpublished.

Review the diff and the redaction boundary, then run `bun install
--frozen-lockfile`, `bun run check` and `bun run build` in the separate checkout.
Check both language pages and the directory in a browser when content or rendering
changes. Keep failure logs and do not bypass a failed check.

Stage only `src/data/report.json`, `src/data/publication.json`, and the reviewed
files in `public/evidence/`. An allowlist or schema change needs a separate review;
never stage raw archives, private analysis, credentials, local receipts, or
unrelated edits. Push normally to `main`; never force-push.

## Confirm publication

The GitHub connection deploys `main` to the `pingcap-hk-assessment` Vercel project
in the `chocockc` team. Confirm the exact commit reaches production `READY`, then
check the public English and Traditional Chinese pages and compare evidence
downloads with the committed checksums. Record the commit, deployment ID, receipt
ID and actual confirmation time privately.

If a push or deployment is interrupted, inspect the remote commit and deployment
before retrying; do not create a duplicate release. Preserve the last working site
on failure. Notify only for a published update, meaningful failure or required
user action. The hourly schedule is managed in Codex and runs while the local
computer and app are available.
