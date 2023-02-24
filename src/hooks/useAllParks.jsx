//全公園データを取得するカスタムフック
import { useEffect, useState } from "react";
import { getParks } from "../urls";

export const useAllParks = () => {
  const [parks, setParks] = useState([]);

  const handleGetParks = async () => {
    const { data } = await getParks();
    setParks(data);
  };

  useEffect(() => {
    handleGetParks();
  }, []);

  return { parks };
};
