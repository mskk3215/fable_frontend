import { atom } from "recoil";

export const selectedPrefectureState = atom<string | undefined>({
  key: "selectedPrefectureState",
  default: undefined,
});

export const selectedCityState = atom<string | undefined>({
  key: "selectedCityState",
  default: undefined,
});
