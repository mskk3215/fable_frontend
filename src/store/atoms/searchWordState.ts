import { atom } from "recoil";

type SearchWord = string;
type OriginLocation = string;
type DestinationLocation = string;

// searchWordをlocalStorageに保存し状態を管理する
const savedSearchWord = localStorage.getItem("searchWord") || "";

export const searchWordState = atom<SearchWord>({
  key: "searchWordState",
  default: savedSearchWord,
});
export const saveSearchWord = (newSearchWord: SearchWord) => {
  localStorage.setItem("searchWord", newSearchWord);
};

//OriginをlocalStorageに保存し状態を管理する
const savedOriginLocation = localStorage.getItem("originLocation") || "";

export const originLocationState = atom<OriginLocation>({
  key: "originLocationState",
  default: savedOriginLocation,
});
export const saveOriginLocation = (newSearchWord: OriginLocation) => {
  localStorage.setItem("originLocation", newSearchWord);
};

//DestinationをlocalStorageに保存し状態を管理する
const savedDestinationLocation =
  localStorage.getItem("destinationLocation") || "";

export const destinationLocationState = atom<DestinationLocation>({
  key: "destinationLocationState",
  default: savedDestinationLocation,
});
export const saveDestinationLocation = (newSearchWord: DestinationLocation) => {
  localStorage.setItem("destinationLocation", newSearchWord);
};
