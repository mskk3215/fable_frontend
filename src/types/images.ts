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
export type HandleGetImages = (
  pageSize: number,
  userId?: number | undefined,
  context?: "addToImages" | undefined
) => Promise<void>;

export type UseImages = {
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
  handleGetImages: HandleGetImages;
  handleGetMoreImages: HandleGetImages;
  updateLikedImage: (allImageData: Image[] | undefined) => void;
  updatedLikedCount: (allImageData: Image[] | undefined) => void;
  createdTime: (image: Image) => string | null;
  isImagesLoading: boolean;
  isImagesInitialLoading: boolean;
  imagePage: number;
  setImagePage: React.Dispatch<React.SetStateAction<number>>;
  totalImagesCount: number;
  sortOption: number;
  setSortOption: React.Dispatch<React.SetStateAction<number>>;
};

export type GetImages = {
  userId?: number | undefined;
  page: number;
  pageSize: number;
  sortOption: number;
};
