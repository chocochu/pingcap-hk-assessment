/**
 * Every headline figure the site quotes, in one place. Update these when the
 * analysis moves on; tests cross-check them against the evidence downloads.
 */
export const facts = {
  /** Companies with a profile: every account matched to billing records by exact ID. */
  examinedCompanies: 18,
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
  /** Tables where we counted specific fields (cumulative selected scope), counted once. */
  bqTablesReviewed: 1_904,
  bqRowsReviewed: 40_771_064,
  /** Tables outside that scope. */
  bqNonEmptyTablesRemaining: 3_949,
  bqEmptyTablesRemaining: 605,
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
  /** Analytics user export (BigQuery users_*): row observations, not people. */
  analyticsExportSources: 875,
  analyticsExportRows: 3_068_700,
  analyticsExportHkCountryRows: 38_546,
  /** Pseudonymised analytics export (BigQuery): row observations, not people. */
  pseudonymousExportSources: 878,
  pseudonymousExportRows: 15_296_605,
  pseudonymousExportHkCountryRows: 944_248,
  pseudonymousExportHkCityRows: 827_674,
  /** Marketplace structural references. */
  marketplaceSources: 6,
  marketplaceRows: 53_803,
  hkEmailContacts: 255,
  hkEmailDomains: 116,
  /** User-account links (BigQuery): row observations, not people. */
  userLinkSources: 15,
  userLinkNewSources: 13,
  userLinkRowsPerPass: 2_461_646,
  userLinkNewRows: 1_897_095,
  cloudUserRows: 290_458,
  cloudUserHkTenantRows: 7_239,
  cloudUserHkTenantEmailRows: 7_107,
  cloudUserOtherCountryRows: 212_495,
  cloudUserNoCountryRows: 70_724,
  userEmailShapedRows: 199_405,
  userEmailNonEmptyRows: 290_457,
  oauthRows: 10_380,
  oauthUsers: 4_233,
  suspendedTickets: 13,
  suspendedAttachments: 8,
  salesforceUserRows: 320,
  /** Sales-conversation records (Chorus, BigQuery): row observations, not people. */
  chorusSources: 15,
  chorusRows: 2_299_979,
  chorusRowsPerPass: 2_468_707,
  chorusParticipantRows: 219_945,
  chorusParticipantEmailRows: 219_942,
  chorusEngagementRows: 168_728,
  /** Credential-related fields. */
  apiRecordsWithKeys: 115_132,
} as const;

export const n = (value: number): string => value.toLocaleString("en-US");
