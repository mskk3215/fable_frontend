import { atom } from "recoil";

export const getRequestErrorStatusState = atom<number>({
  key: "getRequestErrorStatusState",
  default: 0,
});

export const messageState = atom<string>({
  key: "messageState",
  default: "",
});
