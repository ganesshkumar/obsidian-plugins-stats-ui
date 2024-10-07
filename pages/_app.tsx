import App from 'next/app';
import '../styles/globals.css'

class ObsidianPluginStatsApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        {/* Google Tag Manager */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M52TKF4M" height="0" width="0" style={{display:"none",visibility:"hidden"}}></iframe>
        </noscript>
        {/* End Google Tag Manager */}
        <Component {...pageProps} />
      </>
    )
  }
}

// export default withApplicationInsights({ 
//   instrumentationKey: 'f34222fa-b4e2-4961-be30-1bfd720292bb',
//   isEnabled: true //process.env.NODE_ENV === 'production'
// })(ObsidianPluginStatsApp);

export default ObsidianPluginStatsApp;