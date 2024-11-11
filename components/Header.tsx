import Head from 'next/head'
import React from 'react';

const homeLdJsonSchema =   {
  "@context": "https://schema.org",
  "@graph":[
    {
      "@type": "WebSite",
      "@id": "https://obsidian-plugin-stats.ganesshkumar.com/#website",
      "url": "https://obsidian-plugin-stats.ganesshkumar.com/",
      "name": "Obsidian Plugin Stats",
      "publisher": {
        "@id": "https://www.codebuss.com/#organization"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "Organization",
      "@id": "https://www.codebuss.com/#organization",
      "name": "Codebuss",
      "url": "https://www.codebuss.com",
      "sameAs": [
        "https://www.facebook.com/61565685916740",
        "https://www.instagram.com/codebuss/"
      ],
      "email": "contact.codebuss@gmail.com",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://www.codebuss.com/#logo",
        "url": "https://www.codebuss.com/images/codebuss.png",
        "contentUrl": "https://www.codebuss.com/images/codebuss.png",
        "caption": "Codebuss",
        "inLanguage": "en-US",
        "width": "500",
        "height": "120"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "email": "contact.codebuss@gmail.com",
          "contactType": "customer support"
        }
      ]
    },
    {
      "@type": "Person",
      "@id": "https://obsidian-plugin-stats.ganesshkumar.com/#author",
      "name": "admin",
      "image": {
        "@type": "ImageObject",
        "@id": "https://gravatar.com/ganesshkumar",
        "url": "https://gravatar.com/ganesshkumar",
        "caption": "admin",
        "inLanguage": "en-US"
      },
      "sameAs": [
        "https://www.ganesshkumar.com"
      ],
      "worksFor": {
        "@id": "https://obsidian-plugin-stats.ganesshkumar.com/#organization"
      }
    }
  ]
}

const Header = (props) => {
  const { current } = props;
  let ldJsonSchema: any = undefined;
  switch (current) {
    case 'home':
      ldJsonSchema = homeLdJsonSchema;
      break;
    default:
      ldJsonSchema = undefined;
  }

  return (
    <Head>
      <title>Obsidian Plugin Stats - Explore New, Updated, Trending and Most Downloaded Obsidian Plugins</title>
      <link rel="icon" href="/images/favicon.png" />
      <meta name="description" content="Discover all Obsidian plugins with the latest updates, trending plugins, and the most downloaded ones. Stay informed about the best plugins to enhance your Obsidian experience." />
      <link rel="canonical" href="https://obsidian-plugin-stats.ganesshkumar.com/" />
      <link rel="sitemap" href="/sitemap.xml" />
      {/* Open Graph Tags */}
      <meta property="og:title" content="Obsidian Plugin Stats - Explore New, Updated, Trending and Most Downloaded Obsidian Plugins" />
      <meta property="og:description" content="Discover all Obsidian plugins with the latest updates, trending plugins, and the most downloaded ones. Stay informed about the best plugins to enhance your Obsidian experience." />
      <meta property="og:image" content="https://obsidian-plugin-stats.ganesshkumar.com/logo-512.png" />
      <meta property="og:url" content="https://obsidian-plugin-stats.ganesshkumar.com" />
      {/* Twitter Tags */}
      <meta name="twitter:title" content="Obsidian Plugin Stats - Explore New, Updated, Trending and Most Downloaded Obsidian Plugins" />
      <meta name="twitter:description" content="Discover all Obsidian plugins with the latest updates, trending plugins, and the most downloaded ones. Stay informed about the best plugins to enhance your Obsidian experience." />
      <meta name="twitter:url" content="https://obsidian-plugin-stats.ganesshkumar.com/logo-512.png" />
      <meta name="twitter:card" content="Discover all Obsidian plugins with the latest updates, trending plugins, and the most downloaded ones. Stay informed about the best plugins to enhance your Obsidian experience." />
      {/* JSON-LD Schema */}
      {current && current === 'home' && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJsonSchema) }} />}
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
