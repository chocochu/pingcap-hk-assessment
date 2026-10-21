# PingCAP incident: Hong Kong exposure assessment

An independent, bilingual assessment of Hong Kong-related business records in material attributed to the PingCAP incident. The site presents evidence, coverage limits and a searchable directory in English and Traditional Chinese.

This repository contains the website and reviewed, redacted evidence downloads. A business label appearing in the material does not establish that the business's own systems were breached. Source-release claims, archive observations and public business context are distinguished in the report; the material's authenticity and completeness are not independently established. This project is not affiliated with PingCAP.

A static React + TypeScript site built with Vite, Tailwind CSS 4 and shadcn/ui (Base UI). TanStack Table 9 handles the company directory. Bun manages packages, scripts and tests; Oxlint checks code and Oxfmt formats it.

## Develop

Install [Bun](https://bun.sh/) (the project pins its package-manager version in `package.json`), then run:

```sh
git clone https://github.com/chocochu/pingcap-hk-assessment.git
cd pingcap-hk-assessment
bun install --frozen-lockfile
bun run dev
```

The development server runs at `http://localhost:5173`. The production preview runs at `http://localhost:4173`. Both bind to the local machine and require no TLS certificate.

## Check and build

```sh
bun run fmt
bun run check
bun run build
bun run preview
```

Deploy only `dist/` to a static host. It contains pre-rendered `index.html` and `zh-Hant.html`, bundled assets and redacted evidence downloads. Asset and evidence paths are relative, so the site can also live under a subdirectory. Language links work without JavaScript. Search, sorting and pagination require JavaScript; the initial HTML includes 50 directory labels and links to the complete CSV.

## Deploy to Vercel

Import this GitHub repository into Vercel with the repository root as the project root. `vercel.json` selects Vite, installs the locked Bun dependencies, runs all checks, and builds `dist/`. No environment variables or private source archives are needed.

The connected production branch is `main`. Pushing a reviewed commit to `main` triggers a production deployment; other branches receive preview deployments. Local content updates do not publish until committed and pushed.

## Directory

Search matches names, both category languages, countries and domains, including full-width text. Column headers toggle sorting; observation counts sort numerically. Pagination defaults to 50 rows, with 25, 100 and All options. Search, sorting and page-size changes return to the first page. Switching language preserves the active search and table state.

The table model is in `src/lib/business-table.ts`; UI is in `src/components/BusinessDirectory.tsx`. Generated shadcn primitives live in `src/components/ui/`, configured by `components.json`. Semantic colors in `src/styles.css` retain the report palette from `src/tokens.css`.

## Content and evidence

- `src/data/report.json` contains structured English and Traditional Chinese content and the shared company directory.
- `src/components/` renders prose, company findings, tables and search with React. It does not inject raw report HTML.
- `public/evidence/` contains the reviewed download files. `scripts/evidence-files.json` is the explicit allowlist.
- `bun run sync:report` imports the reviewed HTML from `../analysis/output/report/` and copies checksum-verified evidence. This optional migration/update command needs Python 3 for the existing report importer. Development, tests and production builds use Bun and do not need Python or the original archives.
- After changing the analysis, finish its redaction/validation process before syncing. Run `bun run check` and `bun run build` after syncing.

The source material, private analysis and original archives remain outside this app. The Vite development server is restricted to the repository directory; the deployable output contains only the site and allowlisted redacted downloads.

Version 0.2 retains the two previously reviewed archives and adds a scoped local review of `04_bigquery.tar.gz`. The bilingual progress section and `bq_coverage.json` distinguish inventory, scan progress and candidate rows. Completion refers to the declared scope; candidate rows are not confirmed organisations. The existing 421 labels and nine company findings remain unchanged.

The separate local analysis workflow may refresh these files as more material is reviewed. Its scheduling and private processing scripts are not part of this repository. Each content update must pass analysis validation and site checks before publication.

## Commands

| Command             | Purpose                                                   |
| ------------------- | --------------------------------------------------------- |
| `bun run dev`       | Local Vite development server                             |
| `bun run build`     | Typecheck, production build and pre-render both languages |
| `bun run preview`   | Preview the built site on port 4173                       |
| `bun run lint`      | Oxlint, with warnings treated as failures                 |
| `bun run lint:fix`  | Apply available Oxlint fixes                              |
| `bun run fmt`       | Format with Oxfmt                                         |
| `bun run fmt:check` | Check formatting without edits                            |
| `bun test`          | Content, search, links, rendering and evidence checks     |
| `bun run check`     | Formatting, lint, TypeScript and tests                    |

References: [Vite](https://vite.dev/guide/), [Bun with Vite](https://bun.sh/guides/ecosystem/vite), [Oxlint](https://oxc.rs/docs/guide/usage/linter.html), [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html).
