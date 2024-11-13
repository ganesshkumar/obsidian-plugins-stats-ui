import Head from 'next/head'
import React from 'react';

const Header = (props) => {
  const { current } = props;
  const ldJsonSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "All posts about Obsidian",
    "description": "A webpage displaying a list of all blog posts related to the Obsidian note-taking app.",
    "url": "https://obsidian-plugin-stats.ganesshkumar.com/posts",
    "image": "https://obsidian-plugin-stats.ganesshkumar.com/logo-512.png"
  };

  return (
    <Head>
      <title>All posts about Obsidian</title>
      <link rel="icon" href="/images/logo-512.png" />
      <meta name="description" content="A webpage displaying a list of all blog posts related to the Obsidian note-taking app." />
      <link rel="canonical" href="https://obsidian-plugin-stats.ganesshkumar.com/posts" />
      <link rel="sitemap" href="/sitemap.xml" />
      {/* Open Graph Tags */}
      <meta property="og:title" content="All Obsidian Plugins Released to Date" />
      <meta property="og:description" content="A webpage displaying a list of all blog posts related to the Obsidian note-taking app." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://obsidian-plugin-stats.ganesshkumar.com/posts" />
      <meta property="og:image" content="https://obsidian-plugin-stats.ganesshkumar.com/logo-512.png" />
      {/* Twitter Tags */}
      <meta name="twitter:card" content="A webpage displaying a list of all blog posts related to the Obsidian note-taking app." />
      <meta name="twitter:title" content="All Obsidian Plugins Released to Date" />
      <meta name="twitter:description" content="A webpage displaying a list of all blog posts related to the Obsidian note-taking app." />
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
