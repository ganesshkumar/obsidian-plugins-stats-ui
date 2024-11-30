import Head from 'next/head'
import React from 'react';

const Header = (props) => {
  const { current, title, description, publishedDate, modifiedDate, slug } = props;
  const ldJsonSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "author": {
        name: "Ganessh Kumar R P",
        "@type": "Person",
        url: "https://ganesshkumar.com",
    },
    "name": title,
    "description": description,
    "url": `https://obsidian-plugin-stats.ganesshkumar.com/posts/${slug}`,
    "image": "https://obsidian-plugin-stats.ganesshkumar.com/logo-512.png",
    "datePublished": publishedDate,
    "dateModified": modifiedDate,
  };

  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon-64.png" />
      <meta name="description" content={description} />
      <link rel="canonical" href={`https://obsidian-plugin-stats.ganesshkumar.com/posts/${slug}`} />
      <link rel="sitemap" href="/sitemap.xml" />
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://obsidian-plugin-stats.ganesshkumar.com/posts/${slug}`} />
      <meta property="og:image" content="https://obsidian-plugin-stats.ganesshkumar.com/logo-512.png" />
      {/* Twitter Tags */}
      <meta name="twitter:card" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://obsidian-plugin-stats.ganesshkumar.com/logo-512.png" />
      {/* JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJsonSchema) }} />
      {/* Google Tag Manager */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M52TKF4M');
          `,
        }}
      />
    </Head>
  )
}

export default Header;
