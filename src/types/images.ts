export type Image = {
  id: number;
  user_id: number;
  insect_id: number | null;
  image: string;
  taken_at: Date | null;
  created_at: Date;
  park_id: number | null;
  park_name: string | null;
  insect_name: string | null;
  insect_sex: string | null;
  city_name: string | null;
  likes_count: number;
  liked_user_ids: number[] | null;
};
export type HandleGetImages = (userId: number | undefined) => Promise<void>;
export type UseImages = {
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
  handleGetImages: HandleGetImages;
  updateLikedImage: (allImageData: Image[] | undefined) => void;
  updatedLikedCount: (allImageData: Image[] | undefined) => void;
  createdTime: (image: Image) => string | null;
  isImagesLoading: boolean;
};

export type ImageSortOption = "likes" | "posted" | "taken";
