import { useRouter } from "next/router";
import { useEffect } from "react";

const CarbonAd = () => {
  const router = useRouter();

  useEffect(() => {
    const isCarbonExist = document.querySelector("#carbonads");

    if (isCarbonExist && typeof (window as any)._carbonads !== 'undefined' && typeof (window as any)._carbonads.refresh === 'function') {
      (window as any)._carbonads.refresh();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.carbonads.com/carbon.js?serve=CW7I6K7Y&placement=wwwobsidianstatscom&format=cover";
    script.id = "_carbonads_js";
    script.async = true;

    document.querySelectorAll("#carbon-container")[0].appendChild(script);
  }, [router.asPath]);

  return <div id="carbon-container"></div>;
};

export default CarbonAd;
