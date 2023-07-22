import { atom } from "recoil";

type SelectedItem = number | null;
type SelectedCenter = {
  lat: number;
  lng: number;
};
type MapApiLoad = {
  isLoaded: boolean;
  loadError: boolean;
};

export const selectedItemState = atom<SelectedItem>({
  key: "selectedItemState",
  default: null,
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
