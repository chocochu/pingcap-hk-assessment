import type { PageId, Rich, Strength, Verdict } from "../types";

export interface Card {
  title: string;
  body: Rich;
}

export interface LinkCard extends Card {
  page: PageId;
  hash?: string;
}

export interface Tile {
  value: string;
  label: string;
  note: Rich;
}

export interface Status {
  done: string;
  partial: string;
  none: string;
}

export interface Copy {
  siteName: string;
  skip: string;
  navLabel: string;
  switchTo: string;
  nav: Record<PageId, string>;
  meta: Record<PageId, { title: string; description: string }>;
  common: {
    updated: (date: string) => string;
    newTab: string;
    strength: {
      title: string;
      intro: string;
      levels: Record<Strength, { label: string; text: string }>;
    };
    source: string;
  };
  footer: {
    lines: Rich[];
    version: (version: string, time: string) => string;
    links: { label: string; href: string }[];
  };
  home: {
    eyebrow: (date: string) => string;
    title: string;
    deck: string;
    ctaSearch: string;
    ctaAction: string;
    brief: { title: string; items: Card[] };
    numbers: { title: string; tiles: Tile[]; caveat: Rich };
    found: {
      title: string;
      intro: string;
      cards: (LinkCard & {
        icon: "receipt" | "support" | "logs" | "key" | "people";
        cta: string;
      })[];
    };
    notMean: { title: string; items: Rich[] };
    action: {
      title: string;
      intro: string;
      groups: { title: string; steps: Rich[] }[];
      note: Rich;
    };
    background: { title: string; paragraphs: Rich[] };
    next: { title: string; cards: LinkCard[] };
  };
  search: {
    title: string;
    intro: (total: number) => string;
    inputLabel: string;
    placeholder: string;
    clear: string;
    filterLabel: string;
    filters: Record<"all" | Verdict, string>;
    legendTitle: string;
    verdicts: Record<Verdict, { label: string; text: string }>;
    household: { title: string; body: Rich };
    count: (matched: number, total: number, shown: number) => string;
    more: (n: number) => string;
    none: { title: string; body: Rich };
    details: {
      toggle: string;
      seen: (n: number) => string;
      countries: string;
      domains: string;
      domainsNote: string;
      category: string;
      noneRecorded: string;
    };
    later: string;
    readFinding: string;
    noscript: Rich;
  };
  companies: {
    title: string;
    intro: Rich[];
    caution: Rich;
    cardLabels: {
      records: string;
      hk: string;
      found: string;
      careful: string;
      sure: string;
      how: string;
      refs: string;
    };
    tags: { billing: string; support: string; logs: string };
    related: {
      title: string;
      intro: string;
      items: { name: string; body: Rich }[];
    };
  };
  coverage: {
    title: string;
    intro: string;
    picture: { title: string; tiles: Tile[]; barLabel: string; barNote: Rich };
    looked: {
      title: string;
      intro: string;
      status: Status;
      limitLabel: string;
      items: { title: string; status: keyof Status; body: Rich; limit: Rich }[];
    };
    sure: { title: string; intro: Rich };
    add: { title: string; body: Rich[] };
    didNot: { title: string; items: Rich[] };
    glossary: { title: string; terms: { term: string; meaning: Rich }[] };
  };
  technical: {
    title: string;
    intro: string;
    groups: {
      id: string;
      title: string;
      summary: Rich;
      points: Rich[];
      /** Evidence files that back this group up. */
      files: string[];
    }[];
    support: {
      title: string;
      body: Rich;
      headers: string[];
      rows: string[][];
    };
    linkage: {
      title: string;
      body: Rich;
      headers: string[];
      rows: string[][];
      note: Rich;
    };
    updates: {
      title: string;
      intro: Rich;
      earlier: { title: string; body: Rich };
    };
    downloads: {
      title: string;
      intro: Rich;
      groups: { title: string; files: { file: string; label: string }[] }[];
    };
  };
}
