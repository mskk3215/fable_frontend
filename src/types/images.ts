export type Post = {
  id: number;
  user_id: number;
  insect_id: number | null;
  park_id: number | null;
  taken_at: Date | null;
  image: string;
  insect_name: string | null;
  insect_sex: string | null;
  city_name: string | null;
};
export type HandleGetPosts = () => Promise<void>;
export type UseAllImages = {
  posts: Post[];
  handleGetPosts: HandleGetPosts;
};
