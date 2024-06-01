import { atom } from "recoil";

type SelectedItemId = number | undefined;
type SelectedItemName = string | undefined;
type SelectedCenter = {
  lat: number;
  lng: number;
};
export type MapApiLoad = {
  isLoaded: boolean;
  loadError: boolean;
};

export const selectedItemIdState = atom<SelectedItemId>({
  key: "selectedItemIdState",
  default: undefined,
});
export const selectedItemNameState = atom<SelectedItemName>({
  key: "selectedItemNameState",
  default: undefined,
});

export const selectedCenterState = atom<SelectedCenter>({
  key: "selectedCenterState",
  default: {
    lat: 35.69575,
    lng: 139.77521,
  },
});

export const mapApiLoadState = atom<MapApiLoad>({
  key: "mapApiLoadState",
  default: {
    isLoaded: false,
    loadError: false,
  },
});
