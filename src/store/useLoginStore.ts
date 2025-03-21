import { create } from "zustand";

type State = {
  isLogged: boolean;
  userid: string;
  email: string;
};

type Action = {
  updateLoginInfo: (isLogged: boolean, userid: string, email: string) => void;
};

export const useLoginInfo = create<State & Action>((set) => ({
  isLogged: false,
  userid: "",
  email: "",
  updateLoginInfo(isLogged: boolean, userid: string, email: string) {
    set({ isLogged: isLogged, userid: userid, email: email });
  },
}));
