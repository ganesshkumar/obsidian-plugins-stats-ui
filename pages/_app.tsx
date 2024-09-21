import App from 'next/app';
import { withApplicationInsights } from '../telemetry/next-applicationInsights';
import '../styles/globals.css'

class ObsidianPluginStatsApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default withApplicationInsights({ 
  instrumentationKey: 'f34222fa-b4e2-4961-be30-1bfd720292bb',
  isEnabled: true //process.env.NODE_ENV === 'production'
})(ObsidianPluginStatsApp);
