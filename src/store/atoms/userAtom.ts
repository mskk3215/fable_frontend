import { atom } from "recoil";
import { User } from "../../types/user";

export const loginUserState = atom<User | undefined>({
  key: "loginUserState",
  default: undefined,
});

export const authCheckedState = atom<boolean>({
  key: "authCheckedState",
  default: false,
});

export const followUserState = atom<{ [key: number]: boolean }>({
  key: "followUserState",
  default: {},
});
