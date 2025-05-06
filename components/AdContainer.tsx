import { useEffect, useRef } from "react";

interface IAdContainerProps {
  type: "text" | "image" | "fixed-footer";
  id?: string;
}


const AdContainer = ({ type, id }: IAdContainerProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the EthicalAds script
    const ethicalAdScript = document.createElement("script");
    ethicalAdScript.src = "https://media.ethicalads.io/media/client/ethicalads.min.js";
    ethicalAdScript.async = true;
    document.head.appendChild(ethicalAdScript);

    ethicalAdScript.onload = () => {
      if (window && (window as any).ethicalads) {
        (window as any).ethicalads.wait.then((placements: any[]) => {
          // Check if EthicalAd is unavailable or not a paid campaign
          if (!placements.length || placements[0].response.campaign_type !== "paid") {
            // Load CarbonAd as a fallback
            const carbonAdScript = document.createElement("script");
            carbonAdScript.src = "https://cdn.carbonads.com/carbon.js?serve=CW7I6K7Y&placement=wwwobsidianstatscom&format=cover";
            carbonAdScript.type = "text/javascript";
            carbonAdScript.async = true;
            carbonAdScript.id = "_carbonads_js";
            adRef.current?.appendChild(carbonAdScript);
          }
        });
      }
    };
  }, []);

  let ethicalAdContainer = null;
  if (type === 'fixed-footer') {
    ethicalAdContainer = <div data-ea-publisher="obsidianstatscom" data-ea-type="text" data-ea-style="fixedfooter" />;
  } else if (type === 'text') {
    ethicalAdContainer = <div ref={adRef} data-ea-publisher="obsidianstatscom" data-ea-type="text" id={id} />;
  } else {
    return (
      <div
        ref={adRef}
        className="horizontal bordered"
        data-ea-publisher="obsidianstatscom"
        data-ea-type="image"
        style={{ minHeight: "150px" }}
      />
    );
  }

  return (
    <>
      {ethicalAdContainer}
      <div id="carbon-container"></div>
    </>
  );
};

export default AdContainer;