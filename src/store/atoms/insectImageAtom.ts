import { atom } from "recoil";

export const likedImageState = atom<{ [key: number]: boolean }>({
  key: "likedImageState",
  default: {},
});

export const likedCountState = atom<{ [key: number]: number }>({
  key: "likedCountState",
  default: {},
});
