//全昆虫データを取得するカスタムフック
import { useEffect, useState } from "react";
import { getPrefectures } from "../urls";

export const useAllPrefectures = () => {
  const [prefectures, setPrefectures] = useState([]);
  const [prefectureOptions, setPrefectureOptions] = useState([]);

  const handleGetPrefectures = async () => {
    const { data } = await getPrefectures();
    setPrefectures(data);

    //EditFormの選択肢用
    const prefectureData = data.map((prefecture) => ({
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
