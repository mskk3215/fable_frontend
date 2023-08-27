import { Image } from "./images";

export type Post = {
  id: number;
  created_at: number;
  avatar: string;
  user_id: number;
  username: string;
  images: Image[];
};
