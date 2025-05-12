import Head from 'next/head';
import React from 'react';

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
      <title key="title">{title}</title>
      <link key="icon" rel="icon" href="/favicon-64.png" />
      <meta key="description" name="description" content={description} />
      <link key="canonical" rel="canonical" href={canonical} />
      <link key="sitemap" rel="sitemap" href="/sitemap.xml" />
      {/* Open Graph Tags */}
      <meta key="og:title" property="og:title" content={title} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      <meta key="og:image" property="og:image" content={image} />
      <meta key="og:url" property="og:url" content={canonical} />
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
