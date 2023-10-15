export type Image = {
  id: number;
  userId: number;
  insectId?: number;
  image: string;
  takenAt?: Date;
  createdAt: Date;
  parkId?: number;
  parkName?: string;
  insectName?: string;
  insectSex?: string;
  cityName?: string;
  likesCount: number;
  likedUserIds?: number[];
};
export type HandleGetImages = (
  pageSize: number,
  userId?: number,
  context?: "addToImages"
) => Promise<void>;

export type UseImages = {
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
  handleGetImages: HandleGetImages;
  handleGetMoreImages: HandleGetImages;
  updateLikedImage: (allImageData?: Image[]) => void;
  updatedLikedCount: (allImageData?: Image[]) => void;
  createdTime?: (image: Image) => string;
  isImagesLoading: boolean;
  isImagesInitialLoading: boolean;
  imagePage: number;
  setImagePage: React.Dispatch<React.SetStateAction<number>>;
  totalImagesCount: number;
  sortOption: number;
  setSortOption: React.Dispatch<React.SetStateAction<number>>;
};

export type GetImages = {
  userId?: number;
  page: number;
  pageSize: number;
  sortOption: number;
};
