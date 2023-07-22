export type Park = {
  id: number;
  name: string;
  post_code: string;
  address: string;
  latitude: number;
  longitude: number;
  prefecture_name: string;
  city_name: string;
  image: string;
  image_count: number;
  insect_count: number;
};
export type ParkOption = {
  label: string;
  prefecture: string;
  city: string;
  id: number;
};
export type UseAllParks = {
  parks: Park[];
  parkOptions: ParkOption[];
  handleGetParks: () => Promise<void>;
};
