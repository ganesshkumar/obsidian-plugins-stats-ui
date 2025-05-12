export interface IAnalyticsStrategy {
  trackEvent: (eventName: string, eventData?: Record<string, any>) => void;
}
