export type PictureBookInfo = {
  name: string;
  biologicalFamily: string;
  size: string;
  lifespan: string;
  habitatPlace: string;
  foods: string[];
  tools: string[];
  takenAmountPerMonth: { month: number; count: number }[];
  takenAmountPerHour: { timeSlot: string; count: number }[];
  images: { url: string; likesCount: number }[];
  imageCount: number;
  isCollected: boolean;
};
