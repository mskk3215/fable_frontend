import { atom } from "recoil";

export const getRequestErrorStatusState = atom<number>({
  key: "getRequestErrorStatusState",
  default: 0,
});

export const getRequestErrorMessageState = atom<string>({
  key: "getRequestErrorMessageState",
  default: "",
});
