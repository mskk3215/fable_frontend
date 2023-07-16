import { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { DirectionDrawer } from "../organisms/DirectionDrawer";
import { MapView } from "../organisms/MapView";
import {
  destinationLocationState,
  originLocationState,
  saveOriginLocation,
} from "../../store/atoms/searchWordState";

export const Direction = () => {
  const [originLocation, setOriginLocation] =
    useRecoilState(originLocationState);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [anchor, setAnchor] = useState("left");
  const destinationLocation = useRecoilValue(destinationLocationState);
  const originRef = useRef(null);
  const destinationRef = useRef(null);
  const [travelMode, setTravelMode] = useState("BICYCLING");

  const drawerWidth = anchor === "bottom" || anchor === "top" ? "100%" : 400;
  const drawerHeight =
    anchor === "bottom" ? 250 : anchor === "top" ? 310 : "100%";

  //directionsの計算
  const calculateRoute = async () => {
    if (originRef.current.value === "") {
      alert("出発地を入力してください。");
      return;
    }
    setDirections(null);
    setOriginLocation(originRef.current.value);
    const directionsService = new window.google.maps.DirectionsService();
    try {
      const results = await directionsService.route({
        origin: originLocation,
        destination: destinationLocation,
        travelMode: window.google.maps.TravelMode[travelMode],
        avoidHighways: true,
      });
      setDirections(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    } catch (error) {
      alert("他の交通手段に変えてください。");
    }
  };

  //directionsの削除
  const clearRoute = () => {
    setDirections(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  };
  //map上でクリックした地点の住所を取得する
  const handleMapClick = (e) => {
    const latLng = e.latLng;
    const lat = latLng.lat();
    const lng = latLng.lng();

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK") {
        setOriginLocation(results[0].formatted_address);
      } else {
        alert("住所が取得できませんでした。");
      }
    });
  };
  useEffect(() => {
    saveOriginLocation(originLocation);
  }, [originLocation]);

  //初期load時二重呼び出しを防ぐ
  // https://tagomoris.hatenablog.com/entry/2022/06/10/144540s
  const lines = [];
  const onLoadHook = (line) => {
    lines.push(line);
  };
  //クリーンアップ関数
  useEffect(() => {
    return () => {
      lines.forEach((line) => {
        line.setMap(null);
      });
    };
  });

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
      />
      <MapView
        directions={directions}
        handleMapClick={handleMapClick}
        onLoadHook={onLoadHook}
      />
    </>
  );
};
