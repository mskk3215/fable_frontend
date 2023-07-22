//全昆虫データを取得するカスタムフック
import { useEffect, useState } from "react";
import { getInsects } from "../urls";
import { Insect, InsectOption, UseAllInsects } from "../types/insects";

export const useAllInsects = (): UseAllInsects => {
  const [insects, setInsects] = useState<Insect[]>([]);
  const [insectOptions, setInsectOptions] = useState<InsectOption[]>([]);

  const handleGetInsects = async () => {
    const { data } = await getInsects();
    setInsects(data);

    //EditFormの選択肢用
    const insectData = data.map((insect: Insect) => ({
      label: insect.name,
      value: insect.name,
    }));
    setInsectOptions(insectData);
  };

  useEffect(() => {
    handleGetInsects();
  }, []);

  return { insects, insectOptions };
};
