type UsedCustomEvents = 'reset-display';

// used for sc-viewer-display, rc-list-display
export interface ViewerDisplayStatus {
    opened: boolean
}

export function emitCustomEvent<T>(eventName: UsedCustomEvents, data?: T) {
    const event = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(event);
}

export function subscribeCustomEvent(eventName: UsedCustomEvents, listener: (...args: any[]) => any) {
    window.addEventListener(eventName, listener);
}

export function unsubscribeCustomEvent(eventName: UsedCustomEvents, listener: (...args: any[]) => any) {
    window.removeEventListener(eventName, listener);
}