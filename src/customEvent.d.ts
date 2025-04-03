import { PopUpArgs } from './store/usePopupStore';
import { SolvedRecord } from './util/record.util';

declare global {
    interface CustomEventMap {
        'reset-display': CustomEvent;
        'open-popup': CustomEvent<PopUpArgs>;
        'share-record': CustomEvent<{avg: string; recordList: SolvedRecord[]}>
    }
    interface WindowEventMap extends CustomEventMap {}
}
