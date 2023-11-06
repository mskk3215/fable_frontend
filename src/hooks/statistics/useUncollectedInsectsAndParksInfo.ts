import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  selectedCityState,
  selectedPrefectureState,
} from "../../store/atoms/statisticsState";
import { originLocationState } from "../../store/atoms/searchWordState";
import { getInsectsAndParksInfo } from "../../urls";
import { InsectAndParks } from "../../types/statistics";

export const useUncollectedInsectsAndParksInfo = () => {
  const selectedPrefecture = useRecoilValue(selectedPrefectureState);
  const selectedCity = useRecoilValue(selectedCityState);
  const originLocation = useRecoilValue(originLocationState);
  const [currentLat, setCurrentLat] = useState<number | undefined>(undefined);
  const [currentLng, setCurrentLng] = useState<number | undefined>(undefined);

  const [uncollectedInsectParkItems, setUncollectedInsectParkItems] = useState<
    InsectAndParks[]
  >([]);

  const handleGetUncollectedInsectsAndParksInfo = async (
    selectedPrefecture?: string,
    selectedCity?: string,
    currentLat?: number,
    currentLng?: number
  ) => {
    const { data } = await getInsectsAndParksInfo(
      "uncollected",
      selectedPrefecture,
      selectedCity,
      currentLat,
      currentLng
    );

    if (data.length > 0) {
      const uncollectedInsectParkData = data.map(
        (uncollectedInsectsAndParks: InsectAndParks) => ({
          id: uncollectedInsectsAndParks.id,
          insectName: `${uncollectedInsectsAndParks.insectName}(${uncollectedInsectsAndParks.insectSex})`,
          biologicalFamily: uncollectedInsectsAndParks.biologicalFamily,
          parkName: uncollectedInsectsAndParks.parkName,
        })
      );
      setUncollectedInsectParkItems(uncollectedInsectParkData);
    } else {
      setUncollectedInsectParkItems([]);
    }
  };

  useEffect(() => {
    handleGetUncollectedInsectsAndParksInfo(
      selectedPrefecture,
      selectedCity,
      currentLat,
      currentLng
    );
  }, [selectedPrefecture, selectedCity, originLocation]);

  return { uncollectedInsectParkItems, setCurrentLat, setCurrentLng };
};
