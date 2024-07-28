import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  isGeocoderLoadedState,
  selectedCityState,
  selectedPrefectureState,
} from "../../store/atoms/statisticsState";
import { originLocationState } from "../../store/atoms/searchWordState";
import { getInsectsAndParksInfo } from "../../urls";
import { InsectAndParks, TableData } from "../../types/statistics";

export const useUncollectedInsectsAndParksInfo = () => {
  const selectedPrefecture = useRecoilValue(selectedPrefectureState);
  const selectedCity = useRecoilValue(selectedCityState);
  const isGeocoderLoaded = useRecoilValue(isGeocoderLoadedState);
  const originLocation = useRecoilValue(originLocationState);

  const [currentLat, setCurrentLat] = useState<number | undefined>(undefined);
  const [currentLng, setCurrentLng] = useState<number | undefined>(undefined);
  const [uncollectedInsectParkItems, setUncollectedInsectParkItems] = useState<
    TableData[]
  >([]);

  const handleGetUncollectedInsectsAndParksInfo = async (
    selectedPrefecture: string | null,
    selectedCity: string | null,
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
          insectId: uncollectedInsectsAndParks.insectId,
          insectName: uncollectedInsectsAndParks.insectName,
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
    if (originLocation && !isGeocoderLoaded) return;
    handleGetUncollectedInsectsAndParksInfo(
      selectedPrefecture,
      selectedCity,
      currentLat,
      currentLng
    );
  }, [selectedPrefecture, selectedCity, currentLat, currentLng]);

  return { uncollectedInsectParkItems, setCurrentLat, setCurrentLng };
};
