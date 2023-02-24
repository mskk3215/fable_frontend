//全昆虫データを取得するカスタムフック
import { useEffect, useState } from "react";
import { getInsects } from "../urls";

export const useAllInsects = () => {
  const [insects, setInsects] = useState([]);

  const handleGetInsects = async () => {
    const { data } = await getInsects();
    setInsects(data);
  };

  useEffect(() => {
    handleGetInsects();
  }, []);

  return { insects };
};
