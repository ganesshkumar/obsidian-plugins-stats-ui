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
          rel="stylesheet" />
        {/* Amplitude Analytics*/}
        {/* <script src="https://cdn.amplitude.com/script/735a8d5ec1484df631c8b341167604f5.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1}));window.amplitude.init('735a8d5ec1484df631c8b341167604f5', {"fetchRemoteConfig":true,"autocapture":true});`,
          }}
        ></script> */}
        {/* Google Tag Manager */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M52TKF4M"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager */}
        {/* Google Ads */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3836620974568941" crossOrigin="anonymous"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
