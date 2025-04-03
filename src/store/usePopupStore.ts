import { create } from "zustand";
import { emitCustomEvent } from "../util/customEvent";
import { SolvedRecord } from "../util/record.util";

export interface PopUpArgs {
  description: string;
  popupType: "alert" | "confirm" | "prompt";
  yesButtonText: string;
  noButtonText?: string;
  actionOnYes?: (...args: any[]) => any;
  actionOnNo?: (...args: any[]) => any;
}

type State = {
  isOpen: boolean;
  prompt: string | undefined;
  isShareTabOpen: boolean;
};

type Action = {
  openPopUp: (args: PopUpArgs) => void;
  closePopUp: () => void;
  setPropmt: (str: string) => void;
  openRecordSharePopUp: (avg: string, recordList: SolvedRecord[]) => void;
  closeRecordSharePopUp: () => void;
};

export const usePopupStore = create<State & Action>((set) => ({
  isOpen: false,
  prompt: '',
  isShareTabOpen: false,
  openPopUp: (args: PopUpArgs) => {
    const {
      description,
      popupType,
      yesButtonText,
      noButtonText,
      actionOnYes,
      actionOnNo,
    } = args;
    set({ isOpen: true });
    emitCustomEvent<PopUpArgs>("open-popup", {
      description: description,
      popupType: popupType,
      yesButtonText: yesButtonText,
      noButtonText: noButtonText,
      actionOnYes: actionOnYes,
      actionOnNo: actionOnNo,
    });
  },
  closePopUp: () => set({ isOpen: false }),
  setPropmt: (str) => {
    set({prompt: str});
  },
  openRecordSharePopUp: (avg: string, recordList: SolvedRecord[]) => {
    set({isShareTabOpen: true});
    emitCustomEvent<{avg: string; recordList: SolvedRecord[]}>("share-record", {
      avg: avg,
      recordList: recordList
    });
  },
  closeRecordSharePopUp: () => {
    set({isShareTabOpen: false});
  }
}));
