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
  instrumentationKey: '2be98941-c606-4873-919f-76230001fe3c',
  isEnabled: true //process.env.NODE_ENV === 'production'
})(ObsidianPluginStatsApp);
