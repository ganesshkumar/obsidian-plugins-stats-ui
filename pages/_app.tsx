import App from 'next/app';
import '../styles/globals.css';
import { initAmplitude } from '../lib/telemetry';
import { useEffect } from 'react';

const ObsidianPluginStatsApp = ({ Component, pageProps }) => {
  useEffect(() => {
    console.log('_app.tsx: useEffect');
    initAmplitude();
  }, []);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default ObsidianPluginStatsApp;
