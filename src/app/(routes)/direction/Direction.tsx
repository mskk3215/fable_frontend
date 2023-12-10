import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { messageState } from "../../../store/atoms/errorAtom";
import { DirectionDrawer } from "../../_components/direction/DirectionDrawer";
import { MapView } from "../../_components/map/MapView";
import {
  destinationLocationState,
  originLocationState,
  saveOriginLocation,
} from "../../../store/atoms/searchWordState";
import { useParks } from "../../../hooks/useParks";
import { Box } from "@mui/material";
import { Anchor, Steps, TravelMode } from "../../../types/map";
import { usePageSize } from "../../../hooks/usePageSize";

export const Direction = () => {
  const setMessage = useSetRecoilState(messageState);

  const [originLocation, setOriginLocation] =
    useRecoilState(originLocationState);
  const { searchResults } = useParks();
  const [directions, setDirections] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);
  const [lines, setLines] = useState<google.maps.DirectionsRenderer[]>([]);
  const [distance, setDistance] = useState<string | undefined>(undefined);
  const [duration, setDuration] = useState<string | undefined>(undefined);
  const [steps, setSteps] = useState<Steps[]>([]);
  const [anchor, setAnchor] = useState<Anchor>("left");
  const destinationLocation = useRecoilValue(destinationLocationState);
  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [travelMode, setTravelMode] = useState<TravelMode>("BICYCLING");
  const [isDirectionsLoading, setIsDirectionsLoading] = useState(false);
  const [infoWindowLocation, setInfoWindowLocation] = useState<
    { instruction: string; latLng: { lat: number; lng: number } } | undefined
  >(undefined);
  const [infoWindowLocationZoomSize, setInfoWindowLocationZoomSize] =
    useState<number>(10);
  const [isCalculateRouteClicked, setIsCalculateRouteClicked] = useState(false);
  const [shouldCleanup, setShouldCleanup] = useState(false);
  const pageSize = usePageSize();

  const drawerWidth = anchor === "bottom" || anchor === "top" ? "100%" : 400;
  const drawerHeight =
    anchor === "bottom" ? 250 : anchor === "top" ? 310 : "100%";

  //directionsの計算
  const calculateRoute = async () => {
    setIsDirectionsLoading(true);
    setIsCalculateRouteClicked(true);
    setSteps([]);
    if (originRef.current?.value === "") {
      setMessage({
        message: "出発地を入力してください。",
        type: "error",
      });
      setIsDirectionsLoading(false);
      return;
    }
    setShouldCleanup(true);
    setDirections(undefined);
    setOriginLocation(originRef.current?.value || "");
    const directionsService = new window.google.maps.DirectionsService();
    directionsService
      .route(
        {
          origin: originLocation,
          destination: destinationLocation,
          travelMode: window.google.maps.TravelMode[travelMode],
          avoidHighways: true,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result || undefined);
            const distanceText = result?.routes[0]?.legs[0]?.distance?.text;
            const durationText = result?.routes[0]?.legs[0]?.duration?.text;
            if (distanceText && durationText) {
              setDistance(distanceText);
              setDuration(durationText);
            }
            const stepsText = result?.routes[0]?.legs[0]?.steps.map((step) => ({
              instruction: step.instructions,
              distance: step?.distance?.text || "",
              duration: step?.duration?.text || "",
              latLng: {
                lat: step?.end_location?.lat(),
                lng: step?.end_location?.lng(),
              },
            }));
            if (stepsText) {
              setSteps(stepsText);
            }
          } else {
            switch (status) {
              case "NOT_FOUND":
                setMessage({
                  message: "出発地が見つかりませんでした。",
                  type: "error",
                });
                break;
              case "ZERO_RESULTS":
                setMessage({
                  message:
                    "ルートが見つかりませんでした。他の交通手段に変えてください。",
                  type: "error",
                });
                break;
              default:
                setMessage({
                  message: "ルートの計算中にエラーが発生しました。",
                  type: "error",
                });
            }
          }
        }
      )
      .finally(() => {
        setIsDirectionsLoading(false);
      });
  };

  //directionsの削除
  const clearRoute = () => {
    setShouldCleanup(true);
    setDirections(undefined);
    setDistance(undefined);
    setDuration(undefined);
    if (originRef.current) {
      originRef.current.value = "";
    }
    setSteps([]);
    setIsCalculateRouteClicked(false);
  };
  //map上でクリックした地点の住所を取得する
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results) {
          setOriginLocation(results[0].formatted_address);
        } else {
          setMessage({
            message: "住所が取得できませんでした。",
            type: "error",
          });
        }
      });
    }
  };
  // マウスオーバー時にInfoWindowを表示する
  const handleMouseOver = (step: Steps) => {
    const position = {
      instruction: step.instruction,
      latLng: { lat: step.latLng.lat, lng: step.latLng.lng },
    };
    setInfoWindowLocation(position);
  };
  const handleMouseOut = () => {
    setInfoWindowLocation(undefined);
  };

  useEffect(() => {
    saveOriginLocation(originLocation);
  }, [originLocation]);

  //開発環境で発生する初期load時二重呼び出しを防ぐ
  // https://tagomoris.hatenablog.com/entry/2022/06/10/144540s
  const onLoadHook = (line: google.maps.DirectionsRenderer) => {
    setLines((prev) => [...prev, line]);
  };
  useEffect(() => {
    lines.forEach((line) => {
      line.setMap(null);
    });
    setLines([]);
    setShouldCleanup(false);
  }, [shouldCleanup]);

  //画面サイズによってdrawerの位置を変更する
  useEffect(() => {
    const screenSize = window.innerWidth;
    if (screenSize >= 576) {
      setAnchor("left");
    } else {
      setAnchor("top");
    }
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
        <DirectionDrawer
          originRef={originRef}
          destinationRef={destinationRef}
          calculateRoute={calculateRoute}
          clearRoute={clearRoute}
          travelMode={travelMode}
          setTravelMode={setTravelMode}
          distance={distance}
          duration={duration}
          steps={steps}
          anchor={anchor}
          drawerWidth={drawerWidth}
          drawerHeight={drawerHeight}
          isDirectionsLoading={isDirectionsLoading}
          handleMouseOver={handleMouseOver}
          handleMouseOut={handleMouseOut}
          isCalculateRouteClicked={isCalculateRouteClicked}
          setInfoWindowLocationZoomSize={setInfoWindowLocationZoomSize}
          mapRef={mapRef}
          pageSize={pageSize}
        />
        <MapView
          directions={directions}
          handleMapClick={handleMapClick}
          onLoadHook={onLoadHook}
          searchResults={searchResults}
          isDirectionPage={true}
          isDirectionLoading={isDirectionsLoading}
          infoWindowLocation={infoWindowLocation}
          infoWindowLocationZoomSize={infoWindowLocationZoomSize}
          mapRef={mapRef}
        />
      </Box>
    </>
  );
};
