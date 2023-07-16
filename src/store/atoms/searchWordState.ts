import { atom } from "recoil";

// searchWordをlocalStorageに保存し状態を管理する
const savedSearchWord = localStorage.getItem("searchWord") || "";

export const searchWordState = atom({
  key: "searchWordState",
  default: savedSearchWord,
});
export const saveSearchWord = (newSearchWord) => {
  localStorage.setItem("searchWord", newSearchWord);
};

//OriginをlocalStorageに保存し状態を管理する
const savedOriginLocation = localStorage.getItem("originLocation") || "";

export const originLocationState = atom({
  key: "originLocationState",
  default: savedOriginLocation,
});
export const saveOriginLocation = (newSearchWord) => {
  localStorage.setItem("originLocation", newSearchWord);
};

//DestinationをlocalStorageに保存し状態を管理する
const savedDestinationLocation =
  localStorage.getItem("destinationLocation") || "";

export const destinationLocationState = atom({
  key: "destinationLocationState",
  default: savedDestinationLocation,
});
export const saveDestinationLocation = (newSearchWord) => {
  localStorage.setItem("destinationLocation", newSearchWord);
};
