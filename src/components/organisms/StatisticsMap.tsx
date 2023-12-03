import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import "../../../src/App.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { GeoJsonObject } from "geojson";
import { area } from "@turf/turf";
import {
  selectedCityState,
  selectedPrefectureState,
} from "../../store/atoms/statisticsState";
import { useStatisticMap } from "../../hooks/useStatisticsMap";
import {
  Box,
  Autocomplete,
  TextField,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import {
  GeoJSONFeature,
  GeoJSONFeatureCollection,
} from "../../types/statistics";

type Props = {
  pageSize: number;
};
export const StatisticsMap = (props: Props) => {
  const { pageSize } = props;
  const {
    prefectureData,
    cityData,
    allPrefectures,
    allCities,
    setAllCities,
    prefectureCoordinates,
  } = useStatisticMap();

  const defaultCenter: LatLngExpression = [35.3628, 138.7307];
  const DEFAULT_ZOOM = 3;

  const [selectedPref, setSelectedPref] = useRecoilState(
    selectedPrefectureState
  );
  const [selectedCity, setSelectedCity] = useRecoilState(selectedCityState);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>(defaultCenter);
  const [zoomSize, setZoomSize] = useState(DEFAULT_ZOOM);
  const [key, setKey] = useState("initial-key");
  const [displayData, setDisplayData] = useState<
    GeoJSONFeatureCollection | undefined
  >(undefined);
  const calculateZoomSize = (prefectureName: string) =>
    ["北海道", "沖縄", "東京都"].includes(prefectureName) ? 5 : 7;
  const theme = useTheme();

  const handlePrefectureChange = (newSelectedPref: string | null) => {
    setSelectedCity("");
    setSelectedPref(newSelectedPref || "");
  };
  const handleCityChange = (newSelectedCity: string | null) => {
    setSelectedCity(newSelectedCity || "");
  };

  // 都道府県・市町村選択時の処理
  useEffect(() => {
    if (!prefectureData || !cityData) return;
    if (selectedPref && selectedCity) {
      // 都道府県と市町村の両方が選択された場合
      setKey(`${selectedPref}-${selectedCity}`);
      const filteredData = {
        type: "FeatureCollection",
        features: cityData
          ? cityData.features.filter(
              (feature) =>
                `${feature.properties.N03_003 || ""}${
                  feature.properties.N03_004 || ""
                }`.trim() === selectedCity
            )
          : [],
      };
      const feature = filteredData.features[0];
      if (!feature) return;
      const cityCoordinates = feature.properties.N03_010;
      if (cityCoordinates) {
        setMapCenter(cityCoordinates as LatLngExpression);
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
      setDisplayData(filteredData as GeoJSONFeatureCollection);
    } else if (selectedPref && !selectedCity) {
      // 都道府県のみが選択された場合
      setKey(`${selectedPref}-${selectedCity}`);
      setMapCenter(prefectureCoordinates[selectedPref] as LatLngExpression);
      setZoomSize(calculateZoomSize(selectedPref));
      const filteredData = {
        type: "FeatureCollection",
        features: prefectureData
          ? prefectureData.features.filter(
              (feature) => feature.properties.name === selectedPref
            )
          : [],
      };
      setDisplayData(filteredData as GeoJSONFeatureCollection);

      if (!cityData) return;
      const cityNamesForSelectedPref = cityData.features
        .filter(
          (feature: GeoJSONFeature) =>
            feature.properties.N03_001 === selectedPref
        )
        .map((feature: GeoJSONFeature) => {
          const city = feature.properties.N03_003 || "";
          const district = feature.properties.N03_004 || "";
          return `${city}${district}`.trim();
        });
      setAllCities(cityNamesForSelectedPref);
    } else {
      // 都道府県も市町村も選択されていない場合
      setKey(`${selectedPref}-${selectedCity}`);
      setMapCenter(defaultCenter);
      setZoomSize(DEFAULT_ZOOM);
      setDisplayData({
        type: "FeatureCollection",
        features: prefectureData.features,
      });
    }
  }, [selectedPref, selectedCity, prefectureData, cityData]);

  // pf用
  useEffect(() => {
    setSelectedPref("東京都");
  }, []);

  return (
    <Box sx={{ marginTop: "2px", width: "100%", zIndex: 10 }}>
      <Paper sx={{ border: "1px solid lightgray" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            pt: 2,
          }}
        >
          <Typography
            variant={pageSize > 8 ? "h5" : "subtitle1"}
            style={{ color: "gray" }}
            sx={{ pl: 2 }}
          >
            地域選択
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Autocomplete
              sx={{ minWidth: 150, pl: 2 }}
              options={allPrefectures}
              value={selectedPref ?? ""}
              onChange={(e, newSelectedPref) => {
                handlePrefectureChange(newSelectedPref);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="都道府県を選択"
                  variant="standard"
                />
              )}
            />
            <Autocomplete
              sx={{ minWidth: 200, marginLeft: "10px" }}
              options={allCities}
              value={selectedCity ?? ""}
              onChange={(e, newInputCityValue) => {
                handleCityChange(newInputCityValue);
              }}
              onInputChange={(e, newInputCityValue) => {
                setSelectedCity(newInputCityValue);
              }}
              disabled={!selectedPref}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="市町村を選択"
                  variant="standard"
                />
              )}
            />
          </Box>
          <Box
            sx={{
              height: "40vh",
            }}
          >
            <MapContainer
              key={key}
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
                  data={displayData as GeoJsonObject}
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
      </Paper>
    </Box>
  );
};
