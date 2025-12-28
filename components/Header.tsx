import Head from 'next/head';

export interface IHeaderProps {
  title: string;
  description: string;
  canonical: string;
  image: string;
  current?: string;
  jsonLdSchema?: any;
}

const Header = ({
  title,
  description,
  canonical,
  image,
  current,
  jsonLdSchema,
}: IHeaderProps) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title key="title">{title}</title>
      <link key="icon" rel="icon" href="/favicon-64.png" />
      <meta key="description" name="description" content={description} />
      <meta
        key="robots"
        name="robots"
        content="index, follow, max-image-preview:large"
      />
      <link key="canonical" rel="canonical" href={canonical} />
      <link key="sitemap" rel="sitemap" href="/sitemap.xml" />
      <link
        key="apple-touch-icon"
        rel="apple-touch-icon"
        href="/logo-apple-touch-icon-180x180.png"
      />
      {/* Open Graph Tags */}
      <meta key="og:title" property="og:title" content={title} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      <meta key="og:image" property="og:image" content={image} />
      <meta key="og:url" property="og:url" content={canonical} />
      <meta key="og:type" property="og:type" content="website" />
      <meta
        key="og:site_name"
        property="og:site_name"
        content="Obsidian Stats"
      />
      {/* Twitter Tags */}
      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={description}
      />
      <meta key="twitter:image" name="twitter:image" content={image} />
      <meta key="twitter:site" name="twitter:site" content="@ganesshkumar" />
      {/* Yandex Verification */}
      <meta
        key="yandex-verification"
        name="yandex-verification"
        content="27ef3a93625b3d8e"
      />
      {/* JSON-LD Schema */}
      {jsonLdSchema && (
        <script
          key="jsonLdSchema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      )}
    </Head>
  );
};

export default Header;
