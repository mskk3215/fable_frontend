import { atom } from "recoil";
import { User } from "../../types/user";

export const userState = atom<User | null>({
  key: "userState",
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
  default: false,
});
