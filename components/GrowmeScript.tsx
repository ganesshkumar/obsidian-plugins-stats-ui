import Script from 'next/script';

declare global {
  interface Window {
    growMe: ((event: any) => void) & { _: any[] };
  }
}

export default function GrowMeScript() {
  return (
    <Script
      id="grow-me-initializer-script" // Unique ID for the script tag
      strategy="afterInteractive" // Loads after the page becomes interactive
      data-grow-initializer="" // The attribute from your original script tag
      dangerouslySetInnerHTML={{
        __html: `
          !(function(){
            window.growMe || ((window.growMe = function(e){ window.growMe._.push(e); }), (window.growMe._ = []));
            var e = document.createElement("script");
            e.type = "text/javascript";
            e.src = "https://faves.grow.me/main.js";
            e.defer = true;
            e.setAttribute("data-grow-faves-site-id", "U2l0ZTpmNzZiY2MyZi04ODlhLTQxYzQtOWQzZC02NzI3MGVjNWRiYjU=");
            var t = document.getElementsByTagName("script")[0];
            if (t && t.parentNode) {
              t.parentNode.insertBefore(e, t);
            } else {
              // Fallback if no script tags are found or t.parentNode is null
              (document.head || document.body || document.documentElement).appendChild(e);
            }
          })();
        `,
      }}
    />
  );
}
