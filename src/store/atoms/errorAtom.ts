import { atom } from "recoil";

export const getRequestErrorStatusState = atom<number>({
  key: "getRequestErrorStatusState",
  default: 0,
});

export const messageState = atom<{ message: string; type: string }>({
  key: "messageState",
  default: { message: "", type: "info" },
});
