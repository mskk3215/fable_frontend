//全昆虫データを取得するカスタムフック
import { useEffect, useState } from "react";
import { getInsects } from "../urls";
import { useGetRequestErrorAction } from "./error/useGetRequestErrorAction";
import { Insect, UseAllInsects } from "../types/insects";

export const useAllInsects = (): UseAllInsects => {
  const [insects, setInsects] = useState<Insect[]>([]);
  const [insectOptions, setInsectOptions] = useState<string[]>([]);
  const [queryWord, setQueryWord] = useState<string>("");

  // エラーハンドリング呼び出し
  useGetRequestErrorAction();

  const handleGetInsects = async () => {
    if (
      queryWord === "" ||
      !/^[\p{Script=Hiragana}\p{Script=Katakana}ー]*$/u.test(queryWord)
    )
      return;
    const { data } = await getInsects(queryWord);
    setInsects(data);

    const insectData = data.map((insect: Insect) => insect.insectName);
    setInsectOptions(insectData);
  };

  useEffect(() => {
    handleGetInsects();
  }, [queryWord]);

  return { insects, insectOptions, setInsectOptions, queryWord, setQueryWord };
};
