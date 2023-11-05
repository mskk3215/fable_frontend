import "../../../src/App.css";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { center, area } from "@turf/turf";
import {
  selectedCityState,
  selectedPrefectureState,
} from "../../store/atoms/statisticsState";
import { useStatisticMap } from "../../hooks/useStatisticsMap";
import { Box, Autocomplete, TextField } from "@mui/material";
import { GeoJSONFeature } from "../../types/statistics";

export const StatisticsMap = () => {
  const {
    prefectureData,
    cityData,
    allPrefectures,
    allCities,
    setAllCities,
    prefectureCoordinates,
  } = useStatisticMap();

  const [selectedPref, setSelectedPref] = useRecoilState(
    selectedPrefectureState
  );
  const [selectedCity, setSelectedCity] = useRecoilState(selectedCityState);

  const defaultCenter = [35.3628, 138.7307];
  const DEFAULT_ZOOM = 3;

  const [inputValue, setInputValue] = useState("");
  const [mapCenter, setMapCenter] = useState<number[]>(defaultCenter);
  const [zoomSize, setZoomSize] = useState(DEFAULT_ZOOM);

  const calculateZoomSize = (prefectureName: string) =>
    ["北海道", "沖縄", "東京都"].includes(prefectureName) ? 5 : 7;

  // 都道府県入力欄の変更時の処理
  const handlePrefectureChange = (
    e: React.SyntheticEvent,
    newValue: string | null
  ) => {
    setSelectedPref(newValue || undefined);
    setInputValue("");
    setAllCities([]);
    setSelectedCity(undefined);

    if (newValue) {
      const newCenter = prefectureCoordinates[newValue] || defaultCenter;
      setMapCenter(newCenter);
      setZoomSize(calculateZoomSize(newValue));

      if (!cityData) return;
      const cityNamesForSelectedPref = cityData.features
        .filter(
          (feature: GeoJSONFeature) => feature.properties.N03_001 === newValue
        )
        .map((feature: GeoJSONFeature) => {
          const city = feature.properties.N03_003 || "";
          const district = feature.properties.N03_004 || "";
          return `${city}${district}`.trim();
        });
      setAllCities(cityNamesForSelectedPref);
    } else {
      setMapCenter(defaultCenter);
      setZoomSize(3);
    }
  };

  // 市町村入力欄の変更時の処理
  const handleCityChange = (
    e: React.SyntheticEvent,
    newValue: string | null
  ) => {
    setSelectedCity(newValue || undefined);
  };

  // 境界線データを取得
  const displayData = useMemo(() => {
    if (selectedCity) {
      return {
        features: cityData
          ? cityData.features.filter(
              (feature) =>
                `${feature.properties.N03_003 || ""}${
                  feature.properties.N03_004 || ""
                }`.trim() === selectedCity
            )
          : [],
      };
    } else if (selectedPref) {
      return {
        ...prefectureData,
        features: prefectureData
          ? prefectureData.features.filter(
              (feature) => feature.properties.name === selectedPref
            )
          : [],
      };
    } else {
      return prefectureData;
    }
  }, [selectedCity, selectedPref, prefectureData]);

  // 市町村の中心座標、ズームサイズを計算
  useEffect(() => {
    if (!selectedPref) return;
    const feature = displayData.features[0];
    // 中心座標を計算
    const centroid = center(feature.geometry);
    const [averageLng, averageLat] = centroid.geometry.coordinates;
    if (averageLng && averageLat) {
      setMapCenter([averageLat, averageLng]);
    }
    // zoomサイズを計算
    if (selectedCity === undefined) {
      setZoomSize(calculateZoomSize(selectedPref));
      setMapCenter(prefectureCoordinates[selectedPref]);
      return;
    }
    const squareMeters = area(feature.geometry);
    let zoomSize;
    if (squareMeters < 100000000) {
      zoomSize = 11;
    } else if (squareMeters < 300000000) {
      zoomSize = 10;
    } else {
      zoomSize = 7;
    }

    setZoomSize(zoomSize);
  }, [selectedCity]);

  return (
    <Box
      sx={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Autocomplete
          sx={{ width: 200, pl: 1 }}
          options={allPrefectures}
          onChange={handlePrefectureChange}
          renderInput={(params) => (
            <TextField {...params} label="都道府県を選択" variant="standard" />
          )}
        />
        <Autocomplete
          sx={{ width: 200, pl: 1 }}
          options={allCities}
          onChange={handleCityChange}
          value={inputValue}
          onInputChange={(e, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="市町村を選択" variant="standard" />
          )}
        />
      </Box>
      <Box
        sx={{
          width: "30vw",
          height: "20vw",
        }}
      >
        <MapContainer
          key={mapCenter.toString()}
          center={mapCenter}
          zoom={zoomSize}
          zoomControl={false}
          id="map"
        >
          <TileLayer
            attribution='© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {displayData && (
            <GeoJSON
              key={selectedCity || selectedPref || "alls"}
              data={displayData}
              style={() => ({
                color: "red",
                weight: 3,
                fillColor: "#ffcccc",
                fillOpacity: 0.5,
              })}
            />
          )}
        </MapContainer>
      </Box>
    </Box>
  );
};
