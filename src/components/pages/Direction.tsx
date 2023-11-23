import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { messageState } from "../../store/atoms/errorAtom";
import { DirectionDrawer } from "../organisms/DirectionDrawer";
import { MapView } from "../organisms/MapView";
import {
  destinationLocationState,
  originLocationState,
  saveOriginLocation,
} from "../../store/atoms/searchWordState";
import { useParks } from "../../hooks/useParks";
import { Box } from "@mui/material";
import { Anchor, TravelMode } from "../../types/map";

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
  const [anchor, setAnchor] = useState<Anchor>("left");
  const destinationLocation = useRecoilValue(destinationLocationState);
  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);
  const [travelMode, setTravelMode] = useState<TravelMode>("BICYCLING");
  const [isDirectionsLoading, setIsDirectionsLoading] = useState(false);
  const [shouldCleanup, setShouldCleanup] = useState(false);

  const drawerWidth = anchor === "bottom" || anchor === "top" ? "100%" : 400;
  const drawerHeight =
    anchor === "bottom" ? 250 : anchor === "top" ? 310 : "100%";

  //directionsの計算
  const calculateRoute = async () => {
    setIsDirectionsLoading(true);
    if (originRef.current?.value === "") {
      setMessage({
        message: "出発地を入力してください。",
        type: "error",
      });
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
          anchor={anchor}
          drawerWidth={drawerWidth}
          drawerHeight={drawerHeight}
          isDirectionsLoading={isDirectionsLoading}
        />
        <MapView
          directions={directions}
          handleMapClick={handleMapClick}
          onLoadHook={onLoadHook}
          searchResults={searchResults}
        />
      </Box>
    </>
  );
};
