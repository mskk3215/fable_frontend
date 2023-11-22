//全昆虫データを取得するカスタムフック
import { useEffect, useState } from "react";
import { getInsects } from "../urls";
import { useGetRequestErrorAction } from "./error/useGetRequestErrorAction";
import { Insect, UseAllInsects } from "../types/insects";

export const useAllInsects = (): UseAllInsects => {
  const [insects, setInsects] = useState<Insect[]>([]);
  const [insectOptions, setInsectOptions] = useState<string[]>([]);

  // エラーハンドリング呼び出し
  useGetRequestErrorAction();

  const handleGetInsects = async () => {
    const { data } = await getInsects();
    setInsects(data);

    const insectData = data.map((insect: Insect) => insect.insectName);
    setInsectOptions(insectData);
  };

  useEffect(() => {
    handleGetInsects();
  }, []);

  return { insects, insectOptions, setInsectOptions };
};
