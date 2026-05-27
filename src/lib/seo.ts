export const SITE_NAME = "권순기";
export const SITE_URL = "https://xn--lr4b14b6tba.kr"; // 권순기.kr (punycode)
export const SITE_DESCRIPTION =
  "엄마 연구실에서 만든 스펙, 그 끝은 서울대였습니다. 권순기 경남교육감 후보는 답해야 합니다.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export type SeoMeta = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
};

export function buildTitle(title?: string): string {
  if (!title) return SITE_NAME;
  return `${title} · ${SITE_NAME}`;
}

export function canonicalUrl(path?: string): string {
  if (!path) return SITE_URL;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
