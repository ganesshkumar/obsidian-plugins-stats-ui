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

  // Initialize Telemetry SDK

  initialized = true;
  flushEventQueue();
}

/**
 * Track an event, queuing if not initialized yet.
 *
 * @param eventName string - The name of the event
 * @param eventProps Record<string, any> - Event properties
 */
export function trackEvent(eventName: string, eventProps?: Record<string, any>) {
  if (!initialized) {
    eventQueue.push({ eventName, eventProps });
    return;
  }

  // Track event directly
}

/**
 * Flush queued events after telemetry is initialized
 */
function flushEventQueue() {
  while (eventQueue.length > 0) {
    const { eventName, eventProps } = eventQueue.shift()!;
    // Call track event directly to avoid re-queuing
  }
}