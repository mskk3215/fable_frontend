export type Park = {
  id: number;
  name: string;
  postCode: string;
  address: string;
  latitude: number;
  longitude: number;
  prefectureName: string;
  cityName: string;
  images: string;
  imageCount: number;
  insectCount: number;
};
export type ParkOption = {
  label: string;
  prefecture: string;
  city: string;
  id: number;
};

export type UseParks = {
  parks: Park[];
  parkOptions: ParkOption[];
  handleGetParks: () => Promise<void>;
  handleGetParkSearchResults: (word: string) => Promise<void>;
  isParksLoading: boolean;
};
