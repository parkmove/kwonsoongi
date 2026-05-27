import {
  buildTitle,
  canonicalUrl,
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  type SeoMeta,
} from "../lib/seo";

/**
 * React 19 native metadata: <title>/<meta>/<link>를 컴포넌트 안에서 렌더하면
 * React가 자동으로 document <head>로 호이스트한다.
 */
export default function Seo({
  title,
  description,
  path,
  image,
  noindex,
}: SeoMeta) {
  const fullTitle = buildTitle(title);
  const desc = description ?? SITE_DESCRIPTION;
  const url = canonicalUrl(path);
  const og = image ?? DEFAULT_OG_IMAGE;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={og} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={og} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
    </>
  );
}
