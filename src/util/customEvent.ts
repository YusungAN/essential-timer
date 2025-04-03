type UsedCustomEvents = "reset-display" | "open-popup" | "share-record";

export function emitCustomEvent<T>(eventName: UsedCustomEvents, data?: T) {
  const event = new CustomEvent(eventName, { detail: data });
  window.dispatchEvent(event);
}

export function subscribeCustomEvent(
  eventName: UsedCustomEvents,
  listener: (...args: any[]) => any
) {
  window.addEventListener(eventName, listener);
}

export function unsubscribeCustomEvent(
  eventName: UsedCustomEvents,
  listener: (...args: any[]) => any
) {
  window.removeEventListener(eventName, listener);
}
