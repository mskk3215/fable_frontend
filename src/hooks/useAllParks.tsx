//全公園データを取得するカスタムフック
import { useEffect, useState } from "react";
import { getParks } from "../urls";
import { ParkOption, Park, UseAllParks } from "../types/parks";

export const useAllParks = (): UseAllParks => {
  const [parks, setParks] = useState<Park[]>([]);
  const [parkOptions, setParkOptions] = useState<ParkOption[]>([]);

  const handleGetParks = async () => {
    const { data } = await getParks();
    setParks(data);

    //EditFormの選択肢用
    const parkData = data.map((park: Park) => ({
      label: park.name,
      prefecture: park.prefecture_name,
      city: park.city_name,
      id: park.id,
    }));
    setParkOptions(parkData);
  };
  useEffect(() => {
    handleGetParks();
  }, []);

  return { parks, parkOptions, handleGetParks };
};
