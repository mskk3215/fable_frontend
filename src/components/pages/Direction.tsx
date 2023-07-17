import { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
// @ts-expect-error TS(6142): Module '../organisms/DirectionDrawer' was resolved... Remove this comment to see the full error message
import { DirectionDrawer } from "../organisms/DirectionDrawer";
// @ts-expect-error TS(6142): Module '../organisms/MapView' was resolved to '/Us... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    if (originRef.current.value === "") {
      alert("出発地を入力してください。");
      return;
    }
    setDirections(null);
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    setOriginLocation(originRef.current.value);
    const directionsService = new window.google.maps.DirectionsService();
    try {
      const results = await directionsService.route({
        origin: originLocation,
        destination: destinationLocation,
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        travelMode: window.google.maps.TravelMode[travelMode],
        avoidHighways: true,
      });
      // @ts-expect-error TS(2345): Argument of type 'DirectionsResult' is not assigna... Remove this comment to see the full error message
      setDirections(results);
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      setDistance(results.routes[0].legs[0].distance.text);
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
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
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    originRef.current.value = "";
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    destinationRef.current.value = "";
  };
  //map上でクリックした地点の住所を取得する
  const handleMapClick = (e: any) => {
    const latLng = e.latLng;
    const lat = latLng.lat();
    const lng = latLng.lng();

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK") {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
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
  const lines: any = [];
  const onLoadHook = (line: any) => {
    lines.push(line);
  };
  //クリーンアップ関数
  useEffect(() => {
    return () => {
      // @ts-expect-error TS(7006): Parameter 'line' implicitly has an 'any' type.
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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <DirectionDrawer
        // @ts-expect-error TS(2322): Type '{ originRef: MutableRefObject<null>; destina... Remove this comment to see the full error message
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
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <MapView
        // @ts-expect-error TS(2322): Type '{ directions: null; handleMapClick: (e: any)... Remove this comment to see the full error message
        directions={directions}
        handleMapClick={handleMapClick}
        onLoadHook={onLoadHook}
      />
    </>
  );
};
