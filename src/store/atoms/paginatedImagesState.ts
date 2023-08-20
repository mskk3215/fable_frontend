import { atom } from "recoil";
import { Image } from "../../types/images";

export type PaginatedImages = Image[];

export const paginatedImagesState = atom<PaginatedImages>({
  key: "paginatedImagesState",
  default: [],
});
