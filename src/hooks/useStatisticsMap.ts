import { useEffect, useState } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import {
  GeoJSONFeature,
  GeoJSONFeatureCollection,
  PrefectureCoordinates,
} from "../types/statistics";

export const useStatisticMap = () => {
  const [allPrefectures, setAllPrefectures] = useState<string[]>([]);
  const [allCities, setAllCities] = useState<string[]>([]);
  const [prefectureData, setPrefectureData] = useState<
    GeoJSONFeatureCollection | undefined
  >(undefined);
  const [cityData, setCityData] = useState<
    GeoJSONFeatureCollection | undefined
  >(undefined);

  const [prefectureCoordinates, setPrefectureCoordinates] =
    useState<PrefectureCoordinates>({});

  useEffect(() => {
    const load = () => {
      Promise.all([
        axios.get("./prefecture.geojson"),
        axios.get("./prefecture_coordinates.json"),
        axios.get("./city.geojson"),
      ]).then((responses) => {
        const [prefectureDataRes, prefectureCoordinateRes, cityDataRes] =
          responses;

        const prefectureNames = prefectureDataRes.data.features.map(
          (feature: GeoJSONFeature) => feature.properties.name
        );
        setAllPrefectures(prefectureNames);
        setPrefectureData(prefectureDataRes.data);
        setPrefectureCoordinates(prefectureCoordinateRes.data);
        setCityData(cityDataRes.data);
      });
    };
    load();
  }, []);

  return {
    prefectureData,
    cityData,
    allPrefectures,
    allCities,
    setAllCities,
    prefectureCoordinates,
  };
};
