import { renderToString } from "react-dom/server";
import { App } from "../src/App";
import { languages } from "../src/report";

const template = await Bun.file(new URL("../dist/index.html", import.meta.url)).text();
if (!template.includes("<!--report-html-->")) throw new Error("Missing prerender placeholder");

for (const language of languages) {
  const markup = renderToString(<App initialLanguage={language} />);
  const page = template
    .replace("<!--report-html-->", markup)
    .replace('<html lang="en">', `<html lang="${language}">`);
  const filename = language === "en" ? "index.html" : "zh-Hant.html";
  const localized =
    language === "zh-Hant"
      ? page.replace(
          "<title>PingCAP incident · Hong Kong exposure assessment</title>",
          "<title>PingCAP 事件：香港相關資料外洩評估</title>",
        )
      : page;
  await Bun.write(new URL(`../dist/${filename}`, import.meta.url), localized);
}
console.log("Prerendered English and Traditional Chinese static pages.");
