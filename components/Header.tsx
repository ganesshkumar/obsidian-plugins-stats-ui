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
      <title>{title}</title>
      <link rel="icon" href="/favicon-64.png" />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="sitemap" href="/sitemap.xml" />
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />
      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@ganesshkumar" />
      {/* Yandex Verification */}
      <meta name="yandex-verification" content="27ef3a93625b3d8e" />
      {/* JSON-LD Schema */}
      {jsonLdSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      )}
      {/* Google Tag Manager */}
      {/* <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M52TKF4M');
          `,
        }}
      /> */}
    </Head>
  );
};

export default Header;
