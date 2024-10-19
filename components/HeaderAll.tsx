import Head from 'next/head'
import React from 'react';

const Header = (props) => {
  const { current } = props;
  const ldJsonSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "All Obsidian Plugins Released to Date",
    "description": "Discover all the Obsidian plugins that have ever been released. Enhance your note-taking experience with a comprehensive list of features and functionalities.",
    "url": "https://obsidian-plugin-stats.ganesshkumar.com/all",
    "image": "https://obsidian-plugin-stats.ganesshkumar.com/favicon.png"
  };

  return (
    <Head>
      <title>All Obsidian Plugins Released to Date</title>
      <link rel="icon" href="/images/favicon.png" />
      <meta name="description" content="Discover all the Obsidian plugins that have ever been released. Enhance your note-taking experience with a comprehensive list of features and functionalities." />
      <link rel="canonical" href="https://obsidian-plugin-stats.ganesshkumar.com/all" />
      <link rel="sitemap" href="/sitemap.xml" />
      {/* Open Graph Tags */}
      <meta property="og:title" content="All Obsidian Plugins Released to Date" />
      <meta property="og:description" content="Discover all the Obsidian plugins that have ever been released. Enhance your note-taking experience with a comprehensive list of features and functionalities." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://obsidian-plugin-stats.ganesshkumar.com/all" />
      <meta property="og:image" content="https://obsidian-plugin-stats.ganesshkumar.com/favicon.png" />
      {/* Twitter Tags */}
      <meta name="twitter:card" content="Discover all the Obsidian plugins that have ever been released. Enhance your note-taking experience with a comprehensive list of features and functionalities." />
      <meta name="twitter:title" content="All Obsidian Plugins Released to Date" />
      <meta name="twitter:description" content="Discover all the Obsidian plugins that have ever been released. Enhance your note-taking experience with a comprehensive list of features and functionalities." />
      <meta name="twitter:image" content="https://obsidian-plugin-stats.ganesshkumar.com/favicon.png" />

      {/* JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJsonSchema) }} />
      {/* Font: Google Nato Sans and Lato */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com"  />
      <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
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
