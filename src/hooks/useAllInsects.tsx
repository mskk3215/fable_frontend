//全昆虫データを取得するカスタムフック
import { useEffect, useState } from "react";
import { getInsects } from "../urls";

export const useAllInsects = () => {
  const [insects, setInsects] = useState([]);
  const [insectOptions, setInsectOptions] = useState([]);

  const handleGetInsects = async () => {
    const { data } = await getInsects();
    setInsects(data);

    //EditFormの選択肢用
    const insectData = data.map((insect: any) => ({
      label: insect.name,
      value: insect.name
    }));
    setInsectOptions(insectData);
  };

  useEffect(() => {
    handleGetInsects();
  }, []);

  return { insects, insectOptions };
};
