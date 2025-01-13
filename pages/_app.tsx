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

// export default withApplicationInsights({
//   instrumentationKey: 'f34222fa-b4e2-4961-be30-1bfd720292bb',
//   isEnabled: true //process.env.NODE_ENV === 'production'
// })(ObsidianPluginStatsApp);

export default ObsidianPluginStatsApp;
