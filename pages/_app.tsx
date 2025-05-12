import { AnalyticsProvider } from '../lib/analytics/analytics';
import '../styles/globals.css';
import 'dotenv/config'

const ObsidianPluginStatsApp = ({ Component, pageProps }) => {
  return (
    <AnalyticsProvider>
      <Component {...pageProps} />
    </AnalyticsProvider>
  );
}

export default ObsidianPluginStatsApp;
