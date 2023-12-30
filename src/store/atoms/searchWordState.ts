"use client";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

type SearchWord = string;
type OriginLocation = string;
type DestinationLocation = string;

// searchWordをlocalStorageに保存し状態を管理する
export const searchWordState = atom<SearchWord>({
  key: "searchWordState",
  default: "",
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
export const originLocationState = atom<OriginLocation>({
  key: "originLocationState",
  default: "",
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
export const destinationLocationState = atom<DestinationLocation>({
  key: "destinationLocationState",
  default: "",
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
