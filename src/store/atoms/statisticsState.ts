import { atom } from "recoil";

export const selectedPrefectureState = atom<string | null>({
  key: "selectedPrefectureState",
  default: "",
});

export const selectedCityState = atom<string | null>({
  key: "selectedCityState",
  default: "",
});
