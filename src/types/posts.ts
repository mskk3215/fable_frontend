import { Image } from "./images";

export type Post = {
  id: number;
  crated_at: number;
  avatar: string;
  user_id: number;
  username: string;
  images: Image[];
};
