import { atom } from "recoil";
import { User } from "../../types/user";

export const loginUserState = atom<User | null>({
  key: "loginUserState",
  default: null,
});

export const viewedUserState = atom<User | null>({
  key: "viewedUserState",
  default: null,
});

export const loggedInStatusState = atom<boolean>({
  key: "loggedInStatusState",
  default: false,
});
export const authCheckedState = atom<boolean>({
  key: "authCheckedState",
  default: false,
});

export const followUserState = atom<{ [key: number]: boolean }>({
  key: "followUserState",
  default: {},
});
