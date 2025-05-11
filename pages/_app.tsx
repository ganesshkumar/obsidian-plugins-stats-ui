import '../styles/globals.css';
import 'dotenv/config'
import PlausibleProvider from 'next-plausible'

const ObsidianPluginStatsApp = ({ Component, pageProps }) => {
  return (
    <PlausibleProvider
      domain="obsidianstats.com"
      customDomain="https://plausible.obsidianstats.com"
      selfHosted
      trackLocalhost
      enabled
    >
      <Component {...pageProps} />
    </PlausibleProvider>
  );
}

export default ObsidianPluginStatsApp;
