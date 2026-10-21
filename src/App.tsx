import { useEffect } from "react";
import { SiteContext } from "./components/site-context";
import { copyFor } from "./content";
import { CompaniesPage } from "./pages/Companies";
import { CoveragePage } from "./pages/Coverage";
import { Home } from "./pages/Home";
import { SearchPage } from "./pages/Search";
import { TechnicalPage } from "./pages/Technical";
import type { Language, PageId } from "./types";

const views: Record<PageId, () => React.JSX.Element> = {
  home: Home,
  search: SearchPage,
  companies: CompaniesPage,
  coverage: CoveragePage,
  technical: TechnicalPage,
};

export function App({ language, page }: { language: Language; page: PageId }) {
  const copy = copyFor(language);
  const View = views[page];

  // Static pages already carry the right title and language; this keeps the dev server honest.
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = copy.meta[page].title;
  }, [language, page, copy]);

  return (
    <SiteContext.Provider value={{ language, copy }}>
      <View />
    </SiteContext.Provider>
  );
}
