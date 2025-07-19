import React, { useEffect, useRef, useId } from "react";

const EA_PUBLISHER_ID   = "obsidianstatscom"; // e.g. "example-com"
const CARBON_SERVE_CODE = "CW7I6K7Y"; // e.g. "CEAI42J7"
const CARBON_PLACEMENT  = "wwwobsidianstatscom"; // usually your domain without dots

/**
 * Props for the EthicalAd component.
 * @property placementId - Unique identifier for this placement (helps with analytics)
 * @property type - Ad type: 'image' or 'text' (EthicalAds default is image)
 * @property style - Optional EthicalAds style helpers (stickybox, fixedfooter, etc.)
 * @property className - Optional extra CSS classes
 * @property keywords - Optional pipe-separated keywords for targeting (e.g., kubernetes|devops)
 */
export interface EthicalAdProps {
  placementId?: string;
  type?: "image" | "text";
  style?: string;
  className?: string;
  keywords?: string;
}

/**
 * EthicalAd – single-slot EthicalAds component.
 * Loads EthicalAds and displays an ad if available. No fallback.
 *
 * @param placementId - Unique identifier for this placement
 * @param type - Ad type: 'image' or 'text'
 * @param style - Optional EthicalAds style helpers
 * @param className - Optional extra CSS classes
 * @param keywords - Optional pipe-separated keywords for targeting
 */
export const EthicalAd: React.FC<EthicalAdProps> = ({
  placementId,
  type = "image",
  style,
  className,
  keywords,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const autoId       = useId();                      // React 18+ unique id

  /**
   * Inject EthicalAds script once and memoize the promise.
   * @returns Promise that resolves when the script is loaded.
   */
  function loadEthicalAdsClient(): Promise<void> {
    if ((window as any).__ethicalAdsLoaded) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      const s = document.createElement("script");
      s.src = "https://media.ethicalads.io/media/client/ethicalads.min.js";
      s.async = true;
      s.onload = () => {
        (window as any).__ethicalAdsLoaded = true;
        resolve();
      };
      document.head.appendChild(s);
    });
  }

  /**
   * Helper: render Carbon ad inside this container
   */
  function injectCarbon() {
    if (!containerRef.current) return;
    
    if ((window as any).__carbonShown) return;
    (window as any).__carbonShown = true;
    // clear any previous children (e.g. empty EthicalAds div)
    containerRef.current.innerHTML = "";
    const carbon = document.createElement("script");
    carbon.src   = `//cdn.carbonads.com/carbon.js?serve=${CARBON_SERVE_CODE}&placement=${CARBON_PLACEMENT}&format=responsive`;
    carbon.id    = `_carbonads_js`;
    carbon.async = true;
    containerRef.current.appendChild(carbon);
  }

  /**
   * Effect: load ads + fallback logic
   */
  useEffect(() => {
    if (!containerRef.current) return;

    loadEthicalAdsClient().then(() => {
      // Ask EthicalAds to (re)scan for new placements on SPA pages
      if (typeof (window as any).ethicalads?.load === "function") {
        (window as any).ethicalads.load();
      }

      // Wait for placements to resolve, then decide about fallback
      (window as any).ethicalads?.wait?.then((placements: any[] = []) => {
        // find the placement for **this** container
        const here = placements.find((p) => {
          return (
            p.container === containerRef.current ||   // pre-v1.20
            p.element   === containerRef.current      // v1.21+
          );
        });

        // [TODO] Removing the carbonjs in phases
        // if (!here || here.response?.campaign_type !== "paid") {
        //   injectCarbon(); // fallback → Carbon
        // }
      });
    });
  }, [autoId, placementId, type, style, keywords]);

  /**
   * Render the EthicalAds placeholder <div>.
   */
  return (
    <div
      ref={containerRef}
      id={placementId || autoId}
      data-ea-publisher={EA_PUBLISHER_ID}
      data-ea-type={type}
      data-ea-style={style}
      data-ea-keywords={keywords}
      className={className}
      /* Minimal inline size to avoid CLS jump before ad loads */
      style={{ minHeight: type === "image" ? "140" : "75" }}
    />
  );
};

export default EthicalAd;
