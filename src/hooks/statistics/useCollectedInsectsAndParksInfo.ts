import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  selectedCityState,
  selectedPrefectureState,
} from "../../store/atoms/statisticsState";
import { getInsectsAndParksInfo } from "../../urls";
import { InsectAndParks } from "../../types/statistics";

export const useCollectedInsectsAndParksInfo = () => {
  const selectedPrefecture = useRecoilValue(selectedPrefectureState);
  const selectedCity = useRecoilValue(selectedCityState);

  const [collectedInsectParkItems, setCollectedInsectParkItems] = useState<
    InsectAndParks[]
  >([]);

  const handleGetCollectedInsectsAndParksInfo = async (
    selectedPrefecture?: string,
    selectedCity?: string
  ) => {
    const { data } = await getInsectsAndParksInfo(
      "collected",
      selectedPrefecture,
      selectedCity
    );
    if (data.length > 0) {
      const collectedInsectParkData = data.map(
        (collectedInsectsAndParks: InsectAndParks) => ({
          id: collectedInsectsAndParks.id,
          insectName: collectedInsectsAndParks.insectName,
          insectSex: collectedInsectsAndParks.insectSex,
          biologicalFamily: collectedInsectsAndParks.biologicalFamily,
          parkName: collectedInsectsAndParks.parkName,
        })
      );
      setCollectedInsectParkItems(collectedInsectParkData);
    } else {
      setCollectedInsectParkItems([]);
    }
  };

  useEffect(() => {
    handleGetCollectedInsectsAndParksInfo(selectedPrefecture, selectedCity);
  }, [selectedPrefecture, selectedCity]);

  return { collectedInsectParkItems };
};
