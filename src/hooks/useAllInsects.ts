//全昆虫データを取得するカスタムフック
import { useEffect, useState } from "react";
import { getInsects } from "../urls";
import { useGetRequestErrorAction } from "./error/useGetRequestErrorAction";
import { Insect, InsectOption, UseAllInsects } from "../types/insects";

export const useAllInsects = (): UseAllInsects => {
  const [insects, setInsects] = useState<Insect[]>([]);
  const [insectOptions, setInsectOptions] = useState<InsectOption[]>([]);

  // エラーハンドリング呼び出し
  useGetRequestErrorAction();

  const handleGetInsects = async () => {
    const { data } = await getInsects();
    setInsects(data);

    //EditFormの選択肢用
    const insectData = data.map((insect: Insect) => ({
      label: insect.insectName,
      value: insect.insectName,
    }));
    setInsectOptions(insectData);
  };

  useEffect(() => {
    handleGetInsects();
  }, []);

  return { insects, insectOptions };
};
