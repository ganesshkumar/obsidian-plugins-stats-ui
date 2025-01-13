import * as amplitude from '@amplitude/analytics-browser';

interface QueuedEvent {
  eventName: string;
  eventProps?: Record<string, any>;
}

let initialized = false;
const eventQueue: QueuedEvent[] = [];

/**
 * Initialize Amplitude in the browser only once
 */
export function initAmplitude() {
  if (typeof window === 'undefined' || initialized) {
    return;
  }

  amplitude.init('735a8d5ec1484df631c8b341167604f5', {
    fetchRemoteConfig: true,
    autocapture: true,
  });

  console.log('initialized Amplitude');
  console.log('eventQueue', eventQueue.length);
  console.log(eventQueue[0]);

  initialized = true;
  flushEventQueue();
}

/**
 * Track an event in Amplitude, queuing if not initialized yet.
 *
 * @param eventName string - The name of the event
 * @param eventProps Record<string, any> - Event properties
 */
export function trackEvent(eventName: string, eventProps?: Record<string, any>) {
  if (!initialized) {
    eventQueue.push({ eventName, eventProps });
    return;
  }

  amplitude.track(eventName, eventProps);
}

/**
 * Flush queued events after Amplitude is initialized
 */
function flushEventQueue() {
  while (eventQueue.length > 0) {
    const { eventName, eventProps } = eventQueue.shift()!;
    amplitude.track(eventName, eventProps);
  }
}