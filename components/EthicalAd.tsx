import { useRef, useEffect } from "react";

const EthicalAd = ({ type }: {type: 'text' | 'image'}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the ethical ads script
    const script = document.createElement("script");
    script.src = "https://media.ethicalads.io/media/client/ethicalads.min.js";
    script.async = true;
    document.head.appendChild(script);

    // Re-render the ad when script is ready
    script.onload = () => {
      if (window && (window as any).ethicalads && adRef.current) {
        (window as any).ethicalads.load();
      }
    };
  }, []);

  if (type === 'text') {
    return <div ref={adRef} data-ea-publisher="obsidianstatscom" data-ea-type="text" />;
  }

  return (
    <div
      ref={adRef}
      className="horizontal bordered"
      data-ea-publisher="obsidianstatscom"
      data-ea-type="image"
      style={{ minHeight: "150px" }}
    />
  );
};

export default EthicalAd;