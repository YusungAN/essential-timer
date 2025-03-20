import { create } from "zustand";
import { emitCustomEvent } from "../util/customEvent";

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
};

type Action = {
  openPopUp: (args: PopUpArgs) => void;
  closePopUp: () => void;
  setPropmt: (str: string) => void;
};

export const usePopupStore = create<State & Action>((set) => ({
  isOpen: false,
  prompt: '',
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
  }
}));
