import { PopUpArgs } from './store/usePopupStore';

declare global {
    interface CustomEventMap {
        'reset-display': CustomEvent;
        'open-popup': CustomEvent<PopUpArgs>;
    }
    interface WindowEventMap extends CustomEventMap {}
}
