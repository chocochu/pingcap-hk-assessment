import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { evidenceHref } from "../report";
import type { Block, Language, Locale } from "../types";
import { BusinessDirectory } from "./BusinessDirectory";
import { ReportText } from "./ReportText";

interface Props {
  section: Locale["sections"][number];
  language: Language;
  directory: Locale["directory"];
  query: string;
  onQueryChange: (value: string) => void;
}

function EvidenceTable({ block }: { block: Extract<Block, { type: "table" }> }) {
  return (
    <div className="my-5 overflow-hidden rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            {block.headers.map((heading) => (
              <TableHead key={heading} scope="col">
                {heading}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {block.rows.map((row, index) => (
            <TableRow key={index}>
              {row.map((value, column) =>
                column === 0 ? (
                  <TableHead
                    key={column}
                    scope="row"
                    className="max-w-sm whitespace-normal align-top py-3"
                  >
                    {value}
                  </TableHead>
                ) : (
                  <TableCell key={column} className="max-w-lg whitespace-normal align-top py-3">
                    {value}
                  </TableCell>
                ),
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function CompanyFindings({ block }: { block: Extract<Block, { type: "findings" }> }) {
  return (
    <div className="findings">
      {block.items.map((finding) => (
        <article key={finding.label}>
          <Badge variant="secondary">{finding.tag}</Badge>
          <h3>{finding.label}</h3>
          {finding.paragraphs.map((paragraph, index) => (
            <p key={index}>
              <ReportText content={paragraph} />
            </p>
          ))}
          <p className="sources">
            <ReportText content={finding.sources} />
          </p>
        </article>
      ))}
    </div>
  );
}

export function ReportSection({ section, language, directory, query, onQueryChange }: Props) {
  return (
    <section className="report-section" aria-labelledby={section.id}>
      <h2 id={section.id}>{section.title}</h2>
      {section.blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index}>
                <ReportText content={block.content} />
              </p>
            );
          case "table":
            return <EvidenceTable key={index} block={block} />;
          case "findings":
            return <CompanyFindings key={index} block={block} />;
          case "directory":
            return (
              <BusinessDirectory
                key={index}
                language={language}
                copy={directory}
                query={query}
                onQueryChange={onQueryChange}
              />
            );
          case "downloads":
            return (
              <ul className="downloads" key={index}>
                {block.items.map((item) => (
                  <li key={item.href}>
                    <a href={evidenceHref(item.href)}>{item.label}</a>
                  </li>
                ))}
              </ul>
            );
        }
      })}
      <a className="back-to-contents" href="#report-contents">
        <span aria-hidden="true">↑ </span>
        {language === "zh-Hant" ? "返回章節目錄" : "Back to contents"}
      </a>
    </section>
  );
}
