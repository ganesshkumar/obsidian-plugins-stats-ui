import Head from 'next/head'
import React from 'react';

const Header = () => {
  return (
    <Head>
      <title>Obsidian Clipper</title>
      <link rel="icon" href="/images/favicon.png" />
      <meta name="description" content="Make Obsidian Clipper or Bookmark"></meta>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "amjl4g2jpl");
        `,
        }}
      />
    </Head>
  )
}

export default Header;
