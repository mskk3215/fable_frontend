import React, { useEffect, useState, useContext, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  DirectionsRenderer,
  MarkerF,
} from "@react-google-maps/api";
import { MapDrawer } from "../organisms/MapDrawer";
import { SearchParkContext } from "../../providers/SearchParkProvider";
import { DirectionDrawer } from "../organisms/DirectionDrawer";

export const Map = () => {
  const { searchResults } = useContext(SearchParkContext);
  const [mapStyle, setMapStyle] = useState({});
  const [selectedItemId, setSelectedItemId] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState({
    lat: 35.69575,
    lng: 139.77521,
  });
  const [open, setOpen] = useState(true);
  const [switchDrawer, setSwitchDrawer] = useState(true);
  const [listItem, setListItem] = useState([]);

  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const originRef = useRef(null);
  const destinationRef = useRef(null);
  const [address, setAddress] = useState(undefined);
  const [travelMode, setTravelMode] = useState("BICYCLING");
  const locations = searchResults.map((result) => {
    const id = result.id;
    const title = result.name;
    const latLng = { lat: result.latitude, lng: result.longitude };
    return { id, title, latLng };
  });

  const mapOptions = {
    fullscreenControl: false,
    mapTypeControl: false,
  };

  //map上でクリックした地点の住所を取得する
  const handleMapClick = (e) => {
    const latLng = e.latLng;
    const lat = latLng.lat();
    const lng = latLng.lng();

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK") {
        setAddress(results[0].formatted_address);
      } else {
        alert("住所が取得できませんでした。");
      }
    });
  };

  //mapのサイズを動的に合わせる
  useEffect(() => {
    const handleResize = () => {
      setMapStyle({
        width: window.innerWidth + "px",
        height: window.innerHeight + "px",
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  //Google Maps APIの読み込み状態を管理する
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: ["places"],
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  //Iconの設定
  const renderIcon = (id) => {
    return id === selectedItemId
      ? undefined
      : {
          url: process.env.PUBLIC_URL + "/images/park_icon.png",
          size: new window.google.maps.Size(50, 50),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(25, 25),
        };
  };

  //label option
  const markerLabel = (title) => ({
    text: title,
    color: "blue",
    fontFamily: "sans-serif",
    fontSize: "15px",
    fontWeight: "bold",
    labelOrigin: new window.google.maps.Point(0, -30),
  });

  //directionsの計算
  const calculateRoute = async () => {
    if (originRef.current.value === "") {
      alert("出発地を入力してください。");
      return;
    }
    setDirections(null);
    setAddress(originRef.current.value);
    const directionsService = new window.google.maps.DirectionsService();

    try {
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: `${listItem.latitude},${listItem.longitude}`,
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

  return (
    <>
      {switchDrawer ? (
        <MapDrawer
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
          setSelectedCenter={setSelectedCenter}
          setSwitchDrawer={setSwitchDrawer}
          setListItem={setListItem}
          open={open}
          setOpen={setOpen}
        />
      ) : (
        <>
          <DirectionDrawer
            open={open}
            listItem={listItem}
            originRef={originRef}
            destinationRef={destinationRef}
            calculateRoute={calculateRoute}
            clearRoute={clearRoute}
            address={address}
            setAddress={setAddress}
            travelMode={travelMode}
            setTravelMode={setTravelMode}
            distance={distance}
            duration={duration}
            setSwitchDrawer={setSwitchDrawer}
          />
        </>
      )}
      <GoogleMap
        mapContainerStyle={mapStyle}
        zoom={10}
        center={selectedCenter}
        options={mapOptions}
        onClick={(e) => handleMapClick(e)}
      >
        {locations?.map(({ id, title, latLng }) => (
          <MarkerF
            key={id}
            position={latLng}
            icon={renderIcon(id)}
            animation={
              id === selectedItemId
                ? window.google.maps.Animation.DROP
                : undefined
            }
            label={markerLabel(title)}
          />
        ))}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: "#F87171",
                strokeOpacity: 1,
                strokeWeight: 6,
              },
              suppressMarkers: true,
            }}
            onLoad={onLoadHook}
          />
        )}
        {directions?.routes[0]?.legs[0]?.start_location && (
          <MarkerF
            position={directions.routes[0].legs[0].start_location}
            title="出発地点"
          ></MarkerF>
        )}
      </GoogleMap>
    </>
  );
};
