import Head from 'next/head'
import React from 'react';

const Header = () => {
  return (
    <Head>
      <title>Obsidian Plugin Stats</title>
      <link rel="icon" href="/images/favicon.png" />
      <meta name="description" content="Statistics about Obsidian Plugins. New, trending, favorite Obsidian Plugins."></meta>
       {/* Font: Google Nato Sans and Lato */}
       <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "anhkq42smv");
        `,
        }}
      />
    </Head>
  )
}

export default Header;
