import { atom } from "recoil";

export const messageState = atom<{ message: string; type: string }>({
  key: "messageState",
  default: { message: "", type: "info" },
});
