export type Prefecture = {
  name: string;
  cities: string[];
};
export type PrefectureOption = {
  label: string;
  value: string;
};
export type UseAllPrefectures = {
  prefectures: Prefecture[];
  prefectureOptions: PrefectureOption[];
};
