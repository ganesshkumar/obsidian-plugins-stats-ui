import App from 'next/app';
import '../styles/globals.css'
import { GoogleTagManager } from '@next/third-parties/google'

class ObsidianPluginStatsApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Component {...pageProps} />
        <GoogleTagManager gtmId="GTM-WVDJN395" />
      </>
    )
  }
}

// export default withApplicationInsights({ 
//   instrumentationKey: 'f34222fa-b4e2-4961-be30-1bfd720292bb',
//   isEnabled: true //process.env.NODE_ENV === 'production'
// })(ObsidianPluginStatsApp);

export default ObsidianPluginStatsApp;