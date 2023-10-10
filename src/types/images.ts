export type Image = {
  id: number;
  userId: number;
  insectId: number | null;
  image: string;
  takenAt: Date | null;
  createdAt: Date;
  parkId: number | null;
  parkName: string | null;
  insectName: string | null;
  insectSex: string | null;
  cityName: string | null;
  likesCount: number;
  likedUserIds: number[] | null;
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
