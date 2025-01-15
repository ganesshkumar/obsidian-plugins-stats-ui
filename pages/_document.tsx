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
        {/* Google Analytics Tag */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-93T3GYQH0P"></script>
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-93T3GYQH0P');`,
        }}></script>
        {/* Amplitude Analytics*/}
        {/* <script src="https://cdn.amplitude.com/script/735a8d5ec1484df631c8b341167604f5.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1}));window.amplitude.init('735a8d5ec1484df631c8b341167604f5', {"fetchRemoteConfig":true,"autocapture":true});`,
          }}
        ></script> */}
        {/* Google Tag Manager */}
        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M52TKF4M"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript> */}
        {/* End Google Tag Manager */}
        {/* Google Ads */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3836620974568941" crossOrigin="anonymous"></script>s */}
        {/* First Party Analytics */}
        <script defer data-domain="obsidianstats.com" src="https://plausible.obsidianstats.com/js/script.pageview-props.tagged-events.js"></script>
        <script dangerouslySetInnerHTML={{
          __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`
        }}>
        </script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
