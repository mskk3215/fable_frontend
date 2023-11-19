import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  selectedCityState,
  selectedPrefectureState,
} from "../../store/atoms/statisticsState";
import { getUserRankings } from "../../urls";
import { Ranking } from "../../types/statistics";

export const useUserRankings = () => {
  const selectedPrefecture = useRecoilValue(selectedPrefectureState);
  const selectedCity = useRecoilValue(selectedCityState);

  const [rankingItems, setRankingItems] = useState<Ranking[]>([]);

  const handleGetUserRankings = async (
    selectedPrefecture: string | null,
    selectedCity: string | null
  ) => {
    const { data } = await getUserRankings(selectedPrefecture, selectedCity);

    const rankingData = data.rankings.map((rankings: Ranking) => ({
      userName: rankings.userName,
      collectionRate: rankings.collectionRate,
    }));
    setRankingItems(rankingData);
  };
  useEffect(() => {
    handleGetUserRankings(selectedPrefecture, selectedCity);
  }, [selectedPrefecture, selectedCity]);

  return { rankingItems };
};
