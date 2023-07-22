import { atom } from "recoil";
import { Post } from "../../types/images";

export type PaginatedPosts = Post[];

export const paginatedPostsState = atom<PaginatedPosts>({
  key: "paginatedPostsState",
  default: [],
});
