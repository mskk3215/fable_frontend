import { Image } from "./images";

export type Post = {
  id: number;
  createdAt: number;
  avatar: string;
  userId: number;
  username: string;
  collectedInsectImages: Image[];
};
