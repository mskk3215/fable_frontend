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

export const isFollowedState = atom<boolean>({
  key: "isFollowedState",
export const authCheckedState = atom<boolean>({
  key: "authCheckedState",
  default: false,
});
