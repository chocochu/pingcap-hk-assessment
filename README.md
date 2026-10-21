# PingCAP leak · Hong Kong impact

**Live site:** [English](https://pingcap-hk-assessment.vercel.app/) · [繁體中文](https://pingcap-hk-assessment.vercel.app/zh-Hant/index.html)

An independent, plain-language guide to what the PingCAP data leak means for Hong Kong businesses, in English and Traditional Chinese. It is written for people with no technical background: what was found, what it doesn't mean, what you can do, and how much has actually been checked.

This project is not affiliated with PingCAP. A company's name appearing in the leaked material does not establish that its own systems were breached. The authenticity and completeness of the material are not independently established.

## The site

| Page             | File             | What it's for                                                   |
| ---------------- | ---------------- | --------------------------------------------------------------- |
| Overview         | `index.html`     | Short answers, key numbers in context, "what you can do"        |
| Find a company   | `search.html`    | Search 436 names; each result has a plain label                 |
| Company findings | `companies.html` | The nine companies examined closely, one card each              |
| What we checked  | `coverage.html`  | Coverage, confidence levels, what we didn't do, glossary        |
| Technical notes  | `technical.html` | Key figures per review, two tables, updates, redacted downloads |

Traditional Chinese pages live in `zh-Hant/` with the same file names. The old `/zh-Hant.html` URL redirects there (see `vercel.json`).

## Where the content lives

The site is the source of truth: there is no importer and no generated report file.

- `src/content/en.ts` and `src/content/zh-Hant.ts`: all page copy. Both implement the `Copy` type in `src/content/types.ts`, so a missing string is a type error.
- `src/content/facts.ts`: every headline figure quoted in more than one place. Tests check these against the evidence downloads.
- `src/content/companies.ts`: the nine company findings (both languages, billing evidence references, public sources).
- `src/content/later-names.ts`: names from the later BigQuery reviews, with notes in both languages.
- `src/data/businesses.json`: the 421 screened business labels.
- `src/data/publication.json`: version, release time and update history. Bump it for each content release.
- `public/evidence/`: redacted downloads. `scripts/evidence-files.json` is the allowlist.

Copy strings may use `**bold**` and `[label](href)`. Hrefs are `https://…`, `#anchor`, `page:<id>[#anchor]` or `evidence:<file>`; anything else fails the build. No raw HTML is ever injected.

### Writing guidelines

Write for someone who has never heard of a CRM. Lead with what it means, then the number. Say what a finding does _not_ show, but keep that separate from what it does show. Never merge two counts, and explain overlaps rather than hiding them.

## Develop

Install [Bun](https://bun.sh/) (the version is pinned in `package.json`), then:

```sh
bun install --frozen-lockfile
bun run dev        # http://localhost:5173
bun run check      # format, lint, types, tests
bun run build      # typecheck, build, pre-render 10 static pages into dist/
bun run preview    # http://localhost:4173
```

A static React + TypeScript site built with Vite and Tailwind CSS 4. `scripts/prerender.tsx` renders every page in both languages to plain HTML, so it reads without JavaScript. Only search (and the filter buttons) need JavaScript; without it, the page links to the full CSV. Links are relative, so the site can live under a subpath.

## Evidence downloads

`bun run sync:evidence` copies the reviewed files from `../analysis/output/report/` into `public/evidence/` after checking their SHA-256 sums against the analysis manifest. Files must be on the allowlist first. After syncing, update the figures in `src/content/facts.ts` and any text that changed, then run `bun run check`. See [docs/publishing.md](docs/publishing.md).

## Deploy

Vercel builds from `main` using `vercel.json` (format check, lint, typecheck, tests, build) and serves `dist/`. Other branches get preview deployments. Local edits don't publish until committed and pushed.
