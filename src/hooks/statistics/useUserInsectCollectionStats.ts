import { useEffect, useState } from "react";
import { getUserStatistics } from "../../urls";
import {
  selectedCityState,
  selectedPrefectureState,
} from "../../store/atoms/statisticsState";
import { useRecoilValue } from "recoil";
import { loginUserState } from "../../store/atoms/userAtom";

export const useUserInsectCollectionStats = () => {
  const selectedPrefecture = useRecoilValue(selectedPrefectureState);
  const selectedCity = useRecoilValue(selectedCityState);
  const loginUser = useRecoilValue(loginUserState);

  // ユーザーの特定地域の統計データを取得する
  const [collectionRate, setCollectionRate] = useState<number>(0);
  const [collectionCount, setCollectionCount] = useState<number>(0);
  const [unCollectedCount, setUnCollectedCount] = useState<number>(0);

  const handleGetUserStatistics = async (
    selectedPrefecture: string | null,
    selectedCity: string | null,
    userId?: number
  ) => {
    const { data } = await getUserStatistics(
      selectedPrefecture,
      selectedCity,
      userId
    );
    setCollectionRate(data.statistics.collectionRate);
    setCollectionCount(data.statistics.collectedInsectCount);
    setUnCollectedCount(data.statistics.uncollectedInsectCount);
  };
  useEffect(() => {
    handleGetUserStatistics(selectedPrefecture, selectedCity, loginUser?.id);
  }, [selectedPrefecture, selectedCity]);
  return { collectionRate, collectionCount, unCollectedCount };
};
