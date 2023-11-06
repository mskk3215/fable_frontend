import { useEffect, useState } from "react";
import { getUserStatistics } from "../../urls";
import {
  selectedCityState,
  selectedPrefectureState,
} from "../../store/atoms/statisticsState";
import { useRecoilValue } from "recoil";

export const useUserInsectCollectionStats = () => {
  const selectedPrefecture = useRecoilValue(selectedPrefectureState);
  const selectedCity = useRecoilValue(selectedCityState);

  // ユーザーの特定地域の統計データを取得する
  const [collectionRate, setCollectionRate] = useState<number>(0);
  const [collectionCount, setCollectionCount] = useState<number>(0);
  const [unCollectedCount, setUnCollectedCount] = useState<number>(0);

  const handleGetUserStatistics = async (
    selectedPrefecture?: string,
    selectedCity?: string
  ) => {
    const { data } = await getUserStatistics(selectedPrefecture, selectedCity);
    setCollectionRate(data.statistics.collectionRate);
    setCollectionCount(data.statistics.collectedInsectCount);
    setUnCollectedCount(data.statistics.uncollectedInsectCount);
  };
  useEffect(() => {
    handleGetUserStatistics(selectedPrefecture, selectedCity);
  }, [selectedPrefecture, selectedCity]);
  return { collectionRate, collectionCount, unCollectedCount };
};
