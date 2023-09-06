//全昆虫データを取得するカスタムフック
import { useEffect, useState } from "react";
import { getPrefectures } from "../urls";
import {
  Prefecture,
  PrefectureOption,
  UseAllPrefectures,
} from "../types/prefectures";
import { useGetRequestErrorHandler } from "./error/useGetRequestErrorHandler";

export const useAllPrefectures = (): UseAllPrefectures => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [prefectureOptions, setPrefectureOptions] = useState<
    PrefectureOption[]
  >([]);

  // エラーハンドリング呼び出し
  useGetRequestErrorHandler();

  const handleGetPrefectures = async () => {
    const { data } = await getPrefectures();
    setPrefectures(data);

    //EditFormの選択肢用
    const prefectureData = data.map((prefecture: Prefecture) => ({
      label: prefecture.name,
      value: prefecture.name,
    }));
    setPrefectureOptions(prefectureData);
  };

  useEffect(() => {
    handleGetPrefectures();
  }, []);

  return { prefectures, prefectureOptions };
};
