import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { renderToString } from "react-dom/server";
import { App } from "../src/App";
import { copyFor } from "../src/content";
import { languages, outputPath, pageHref, pages, rootPrefix } from "../src/site";

const dist = new URL("../dist/", import.meta.url);
const template = await Bun.file(new URL("index.html", dist)).text();
if (!template.includes("<!--report-html-->")) throw new Error("Missing prerender placeholder");

const escape = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

let count = 0;
for (const language of languages) {
  const copy = copyFor(language);
  for (const page of pages) {
    const markup = renderToString(<App language={language} page={page} />);
    const { title, description } = copy.meta[page];
    const alternates = languages
      .map((target) => {
        const href = pageHref(language, page, target);
        return `    <link rel="alternate" hreflang="${target}" href="${href}" />`;
      })
      .join("\n");
    const html = template
      .replace('<html lang="en">', `<html lang="${language}">`)
      .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
      .replace(
        /<meta name="description" content="[^"]*" \/>/,
        `<meta name="description" content="${escape(description)}" />\n    <meta property="og:title" content="${escape(title)}" />\n    <meta property="og:description" content="${escape(description)}" />\n    <meta property="og:type" content="website" />\n${alternates}`,
      )
      .replace(
        '<div id="root"><!--report-html--></div>',
        `<div id="root" data-language="${language}" data-page="${page}">${markup}</div>`,
      )
      .replaceAll('"./assets/', `"${rootPrefix(language)}assets/`);
    const file = new URL(outputPath(language, page), dist);
    await mkdir(dirname(file.pathname), { recursive: true });
    await Bun.write(file, html);
    count += 1;
  }
}
console.log(`Prerendered ${count} static pages.`);
