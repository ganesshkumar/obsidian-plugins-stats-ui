import React from 'react';
import GrowMeScript from '@/components/GrowmeScript';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Font: Google Nato Sans and Lato */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
          media='print'
          onLoad={(e) => (e.currentTarget.media = 'all')}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <GrowMeScript />
      </body>
    </Html>
  );
}
