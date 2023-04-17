import { atom } from "recoil";

// localStorageからsearchWordを読み込む
const savedSearchWord = localStorage.getItem("searchWord") || "";

export const searchWordState = atom({
  key: "searchWordState",
  default: savedSearchWord,
});

// searchWordの変更をlocalStorageに保存する
export const saveSearchWord = (newSearchWord) => {
  localStorage.setItem("searchWord", newSearchWord);
};
