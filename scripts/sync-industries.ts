import { buildIndustries } from "./industries";

const source = new URL(
  "../public/classification/business_industry_categories.csv",
  import.meta.url,
);
const destination = new URL("../src/data/industries.json", import.meta.url);
const data = buildIndustries(await Bun.file(source).text());
await Bun.write(destination, JSON.stringify(data, null, 2) + "\n");
console.log(
  `Wrote ${Object.keys(data.labels).length} labels, ${data.industries.length} categories.`,
);
