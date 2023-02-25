//全公園データを取得するカスタムフック
import { useEffect, useState } from "react";
import { getParks } from "../urls";

export const useAllParks = () => {
  const [parks, setParks] = useState([]);
  const [parkOptions, setParkOptions] = useState([]);

  const handleGetParks = async () => {
    const { data } = await getParks();
    setParks(data);

    //EditFormの選択肢用
    const parkData = data.map((park) => ({
      label: park.name,
      id: park.id,
    }));
    setParkOptions(parkData);
  };

  useEffect(() => {
    handleGetParks();
  }, []);

  return { parks, parkOptions };
};
