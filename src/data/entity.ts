/**
 * Canonical entity identity for CryptoCalk.
 *
 * Every `sameAs`, `publishingPrinciples` and `correctionsPolicy` in the site's JSON-LD reads from
 * here. Before this file existed the three schema blocks that carried `sameAs` each listed a
 * DIFFERENT set of profiles (homepage: x + github + linkedin; /about/: x + linkedin + instagram +
 * zanimaem + calk.kz; /methodology/: none), which splits one entity into three for anything doing
 * entity resolution. Add a profile in one place or not at all.
 */

export const SITE_URL = 'https://cryptocalk.com';

/** Profiles that identify the SITE/brand. */
export const ORG_SAME_AS: readonly string[] = [
  'https://github.com/CryptoAgent666/cryptocalk',
  'https://play.google.com/store/apps/details?id=com.cryptocalk.calculator',
  'https://x.com/yakovlevka3',
  'https://www.linkedin.com/in/konstantin-iakovlev/',
];

/** Profiles that identify the PERSON behind it. */
export const PERSON_SAME_AS: readonly string[] = [
  'https://x.com/yakovlevka3',
  'https://www.linkedin.com/in/konstantin-iakovlev/',
  'https://www.instagram.com/iakovlevka/',
  'https://github.com/CryptoAgent666',
  'https://zanimaem.kz',
  'https://calk.kz',
];

/** Machine-readable pointers to the pages that state how this site works and how it corrects itself. */
export const PUBLISHING_PRINCIPLES = `${SITE_URL}/editorial-policy/`;
export const CORRECTIONS_POLICY = `${SITE_URL}/updates/`;

export const AUTHOR_NAME = 'Konstantin Iakovlev';
export const AUTHOR_URL = `${SITE_URL}/about/`;
export const AUTHOR_ID = `${SITE_URL}/about/#founder`;
