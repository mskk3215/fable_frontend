"use client";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { Park } from "../../types/parks";

type SearchWord = string;
type OriginLocation = string;
type DestinationLocation = string;

// searchWordをlocalStorageに保存し状態を管理する
const initializeSearchWord = () => {
  // build時に発生するエラーを回避するための処理
  if (typeof window === "undefined") {
    return "";
  }
  const savedSearchWord = localStorage.getItem("searchWord");
  return savedSearchWord ? savedSearchWord : "";
};
export const searchWordState = atom<SearchWord>({
  key: "searchWordState",
  default: initializeSearchWord(),
});

export const useSearchWord = () => {
  const [searchWord, setSearchWord] = useRecoilState(searchWordState);

  useEffect(() => {
    const savedSearchWord = localStorage.getItem("searchWord") || "";
    setSearchWord(savedSearchWord);
  }, []);

  const saveSearchWord = (newSearchWord: SearchWord) => {
    localStorage.setItem("searchWord", newSearchWord);
    setSearchWord(newSearchWord);
  };

  return { searchWord, saveSearchWord };
};

//OriginをlocalStorageに保存し状態を管理する
const initializeOriginLocation = () => {
  if (typeof window === "undefined") {
    return "";
  }
  const savedOriginLocation = localStorage.getItem("originLocation");
  return savedOriginLocation ? savedOriginLocation : "";
};
export const originLocationState = atom<OriginLocation>({
  key: "originLocationState",
  default: initializeOriginLocation(),
});

export const useOriginLocation = () => {
  const [originLocation, setOriginLocation] =
    useRecoilState(originLocationState);

  useEffect(() => {
    const savedOriginLocation = localStorage.getItem("originLocation") || "";
    setOriginLocation(savedOriginLocation);
  }, []);

  const saveOriginLocation = (newSearchWord: OriginLocation) => {
    localStorage.setItem("originLocation", newSearchWord);
    setOriginLocation(newSearchWord);
  };

  return { originLocation, saveOriginLocation };
};

//DestinationをlocalStorageに保存し状態を管理する
const initializeDestinationLocation = () => {
  if (typeof window === "undefined") {
    return "";
  }
  const savedDestinationLocation = localStorage.getItem("destinationLocation");
  return savedDestinationLocation ? savedDestinationLocation : "";
};
export const destinationLocationState = atom<DestinationLocation>({
  key: "destinationLocationState",
  default: initializeDestinationLocation(),
});
export const useDestinationLocation = () => {
  const [destinationLocation, setDestinationLocation] = useRecoilState(
    destinationLocationState
  );

  useEffect(() => {
    const savedDestinationLocation =
      localStorage.getItem("destinationLocation") || "";
    setDestinationLocation(savedDestinationLocation);
  }, []);

  const saveDestinationLocation = (newSearchWord: DestinationLocation) => {
    localStorage.setItem("destinationLocation", newSearchWord);
    setDestinationLocation(newSearchWord);
  };

  return { destinationLocation, saveDestinationLocation };
};

// searchResultsをlocalStorageに保存し状態を管理する
export const searchResultsState = atom<Park[]>({
  key: "searchResultsState",
  default: [],
});

export const useSearchResults = () => {
  const [searchResults, setSearchResults] = useRecoilState(searchResultsState);

  useEffect(() => {
    const savedSearchResults = localStorage.getItem("searchResults");
    if (savedSearchResults) {
      setSearchResults(JSON.parse(savedSearchResults));
    } else {
      setSearchResults([]);
    }
  }, []);

  const saveSearchResults = (newSearchResults: Park[]) => {
    localStorage.setItem("searchResults", JSON.stringify(newSearchResults));
    setSearchResults(newSearchResults);
  };

  return { searchResults, saveSearchResults };
};
