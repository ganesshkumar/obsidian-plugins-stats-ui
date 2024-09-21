import * as React from 'react';
import { AppProps, AppContext } from 'next/app';

import { ApplicationInsights, IConfiguration, IConfig } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { ClickAnalyticsPlugin } from '@microsoft/applicationinsights-clickanalytics-js';
import { createBrowserHistory } from "history";

const IS_BROWSER = typeof window !== "undefined";

interface WithApplicationInsightsProps {
  pageName: string;
}

declare global {
  interface Window {
    appInsights?: ApplicationInsights;
  }
}

let appInsights: ApplicationInsights;

export interface ICustomConfig {
  isEnabled: boolean;
}

export const withApplicationInsights = (config: IConfiguration & IConfig & ICustomConfig) => {
  return (App: any) => {
    return class WithApplicationInsights extends React.Component<WithApplicationInsightsProps & AppProps> {
      private reactPlugin: ReactPlugin;
      private clickPluginInstance: ClickAnalyticsPlugin;

      public constructor(props) {
        super(props);
        this.reactPlugin = new ReactPlugin();
        this.clickPluginInstance = new ClickAnalyticsPlugin();
      }

      public static getInitialProps = async (appCtx: AppContext) => {
        let appProps = { pageProps: {} };
        if (App.getInitialProps) {
          appProps = {...appProps, ...await App.getInitialProps(appCtx) };
        }
        return { 
          ...appProps
        };
      }

      public componentDidMount() {
        this.initializeAppInsights();
        this.trackPageView();
      }

      public componentDidCatch(error: Error) {
        if (appInsights) {
          appInsights.trackException({ exception: error });
        }
      }

      public initializeAppInsights() {
        if (IS_BROWSER && config.isEnabled && !appInsights) {
          const browserHistory = createBrowserHistory({ window });

          if (!config.extensionConfig) config.extensionConfig = {};

          // config.extensions.push(this.reactPlugin);
          // config.extensions.push(this.clickPluginInstance);

          config.extensionConfig[this.reactPlugin.identifier] = { history: browserHistory };
          config.extensionConfig[this.clickPluginInstance.identifier] = { 
            autoCapture: true, 
            dataTags: {
              useDefaultContentNameOrId: true
            } 
          };

          appInsights = new ApplicationInsights({ config });
          appInsights.loadAppInsights();
          window.appInsights = appInsights;
        }
      }

      public trackPageView() {
        if (appInsights) {
          const name = location.pathname;
          const properties = {
            route: this.props.router.route,
          }
          if (this.props.router.query) {
            for (const key in this.props.router.query) {
              properties[`query.${key}`] = this.props.router.query[key];
            }
          }
          appInsights.trackPageView({ name, properties });
        }
      }

      public render() {
        this.trackPageView();
        return React.createElement(App, this.props);
      }
    }
  };
};
