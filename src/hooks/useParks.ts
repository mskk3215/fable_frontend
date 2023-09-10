//全公園データを取得するカスタムフック
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { searchWordState } from "../store/atoms/searchWordState";
import { getParks, getSearchParkResults } from "../urls";
import { ParkOption, Park, UseParks } from "../types/parks";
import { useGetRequestErrorAction } from "./error/useGetRequestErrorAction";

export const useParks = (): UseParks => {
  const [parks, setParks] = useState<Park[]>([]);
  const [parkOptions, setParkOptions] = useState<ParkOption[]>([]);
  const [isParksLoading, setIsParksLoading] = useState(true);

  // エラーハンドリング呼び出し
  useGetRequestErrorAction();

  // 全公園データを取得する
  const handleGetParks = async () => {
    setIsParksLoading(true);
    const { data } = await getParks();
    setParks(data);
    setIsParksLoading(false);
    //EditFormの選択肢用
    const parkData = data.map((park: Park) => ({
      label: park.name,
      prefecture: park.prefecture_name,
      city: park.city_name,
      id: park.id,
    }));
    setParkOptions(parkData);
  };
  useEffect(() => {
    handleGetParks();
  }, []);

  // 公園データから特定の昆虫名に合致した公園データを取得する
  const searchWord = useRecoilValue(searchWordState);
  const [searchResults, setSearchResults] = useState<Park[]>([]);

  const handleGetParkSearchResults = async (word: string) => {
    setIsParksLoading(true);
    const { data } = await getSearchParkResults(word);
    setSearchResults(data);
    setIsParksLoading(false);
  };
  useEffect(() => {
    handleGetParkSearchResults(searchWord);
  }, []);

  return {
    parks,
    parkOptions,
    handleGetParks,
    handleGetParkSearchResults,
    searchResults,
    isParksLoading,
  };
};
