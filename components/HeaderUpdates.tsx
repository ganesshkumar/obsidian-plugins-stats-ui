import Head from 'next/head'
import React from 'react';

const Header = (props) => {
  const ldJsonSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Obsidian Plugins Updates from Last 10 Days",
    "description": "Discover the latest updates to Obsidian plugins in the past 10 days. Take your note-taking to the next level with enhanced features and functionalities.",
    "url": "https://obsidian-plugin-stats.ganesshkumar.com/updates",
    "image": "https://obsidian-plugin-stats.ganesshkumar.com/logo-512.png"
  };

  return (
    <Head>
      <title>Obsidian Plugins Updates from Last 10 Days</title>
      <link rel="icon" href="/images/favicon.png" />
      <meta name="description" content="Discover the latest updates to Obsidian plugins in the past 10 days. Take your note-taking to the next level with enhanced features and functionalities." />
      <link rel="canonical" href="https://obsidian-plugin-stats.ganesshkumar.com/updates" />
      <link rel="sitemap" href="/sitemap.xml" />
      {/* Open Graph Tags */}
      <meta property="og:title" content="Obsidian Plugins Updates from Last 10 Days" />
      <meta property="og:description" content="Discover the latest updates to Obsidian plugins in the past 10 days. Take your note-taking to the next level with enhanced features and functionalities." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://obsidian-plugin-stats.ganesshkumar.com/updates" />
      <meta property="og:image" content="https://obsidian-plugin-stats.ganesshkumar.com/logo-512.png" />
      {/* Twitter Tags */}
      <meta name="twitter:card" content="Discover the latest updates to Obsidian plugins in the past 10 days. Take your note-taking to the next level with enhanced features and functionalities." />
      <meta name="twitter:title" content="Obsidian Plugins Updates from Last 10 Days" />
      <meta name="twitter:description" content="Discover the latest updates to Obsidian plugins in the past 10 days. Take your note-taking to the next level with enhanced features and functionalities." />
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
