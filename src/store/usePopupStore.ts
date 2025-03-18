import { create } from "zustand";
import { emitCustomEvent } from "../util/customEvent";

export interface PopUpArgs {
  description: string;
  popupType: "alert" | "confirm";
  yesButtonText: string;
  noButtonText?: string;
  actionOnYes?: (...args: any[]) => any;
  actionOnNo?: (...args: any[]) => any;
}

type State = {
  isOpen: boolean;
};

type Action = {
  openPopUp: (args: PopUpArgs) => void;
  closePopUp: () => void;
};

export const usePopupStore = create<State & Action>((set) => ({
  isOpen: false,
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
}));
