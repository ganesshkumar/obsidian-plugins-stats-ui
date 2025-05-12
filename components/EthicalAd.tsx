import { useRef, useEffect } from 'react';

type IEthicalAdProps = {
  type: 'text' | 'image' | 'fixed-footer';
  id?: string;
};

const EthicalAd = ({ type, id }: IEthicalAdProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the ethical ads script
    const script = document.createElement('script');
    script.src = 'https://media.ethicalads.io/media/client/ethicalads.min.js';
    script.async = true;
    document.head.appendChild(script);

    // Re-render the ad when script is ready
    script.onload = () => {
      if (window && (window as any).ethicalads && adRef.current) {
        if (id) {
          adRef.current.id = id;
        }
        (window as any).ethicalads.load();
      }
    };
  }, []);

  if (type === 'fixed-footer') {
    return (
      <div
        data-ea-publisher="obsidianstatscom"
        data-ea-type="text"
        data-ea-style="fixedfooter"
      />
    );
  }

  if (type === 'text') {
    return (
      <div
        ref={adRef}
        data-ea-publisher="obsidianstatscom"
        data-ea-type="text"
        id={id}
      />
    );
  }

  return (
    <div
      ref={adRef}
      className="horizontal bordered"
      data-ea-publisher="obsidianstatscom"
      data-ea-type="image"
      style={{ minHeight: '150px' }}
    />
  );
};

export default EthicalAd;
