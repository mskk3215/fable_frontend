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
  likes_count: number;
  liked_user_ids: number[] | null;
};
export type HandleGetPosts = (userId: number | undefined) => Promise<void>;
export type UseImages = {
  posts: Post[];
  handleGetPosts: HandleGetPosts;
};
