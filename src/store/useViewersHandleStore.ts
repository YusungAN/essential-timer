import { create } from "zustand";
import { emitCustomEvent } from "../util/customEvent";

type State = {
  isOpenedRecordList: boolean;
  isOpenedScrambleViewer: boolean;
};

type Action = {
  changeRecordListOpenStatus: (newStatus: boolean) => void;
  changeScrambleViewerOpenStatus: (newStatus: boolean) => void;
  resetSetting: () => void;
};

export const useViewersHandlingStore = create<State & Action>((set) => ({
  isOpenedRecordList: true,
  isOpenedScrambleViewer: true,
  changeRecordListOpenStatus: (newStatus: boolean) => {
    set({ isOpenedRecordList: newStatus });
  },
  changeScrambleViewerOpenStatus: (newStatus: boolean) => {
    set({ isOpenedScrambleViewer: newStatus });
  },
  resetSetting: () => {
    set({ isOpenedRecordList: true, isOpenedScrambleViewer: true });
    emitCustomEvent("reset-display");
  },
}));
