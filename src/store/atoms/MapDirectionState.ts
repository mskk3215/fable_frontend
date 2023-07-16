import { atom } from "recoil";

export const selectedItemState = atom({
  key: "selectedItemState",
  default: [],
});

export const selectedCenterState = atom({
  key: "selectedCenterState",
  default: {
    lat: 35.69575,
    lng: 139.77521,
  },
});

export const mapApiLoadState = atom({
  key: "mapApiLoadState",
  default: {
    isLoaded: false,
    loadError: false,
  },
});
