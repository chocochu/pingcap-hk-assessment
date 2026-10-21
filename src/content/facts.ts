/**
 * Every headline figure the site quotes, in one place. Update these when the
 * analysis moves on; tests cross-check them against the evidence downloads.
 */
export const facts = {
  /** Companies described one by one on the company findings page. */
  examinedCompanies: 9,
  /** Business labels screened and listed in business_labels.csv. */
  namesScreened: 421,
  /** Of those, labels that appear only in marketing, lead or campaign lists. */
  marketingOnly: 339,
  /** Valid records read from the gateway logs. */
  gatewayRecords: 103_789_392,
  gatewayFiles: 23_651,
  /** Technical support material linked to company names. */
  supportRecords: 286,
  supportCompanies: 7,
  supportSqlRecords: 96,
  /** BigQuery export. */
  bqTables: 6_458,
  bqDatasets: 83,
  bqTablesReviewed: 117,
  bqRowsReviewed: 18_154_882,
  /** Archives. */
  archivesClaimed: 5,
  archivesAvailable: 4,
  /** Source-code repository archive (10_repos). */
  repoDirectories: 413,
  repoMembers: 496_784,
  repoTextFiles: 271_551,
  repoGitRepositories: 13,
  /** Individuals, reported only as totals. */
  hkProfileRows: 416,
  hkEmailContacts: 255,
  hkEmailDomains: 116,
  /** Credential-related fields. */
  apiRecordsWithKeys: 115_132,
} as const;

export const n = (value: number): string => value.toLocaleString("en-US");
