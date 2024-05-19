"use client";

import React, { memo, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  DirectionsRenderer,
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import parser from "html-react-parser";
import {
  mapApiLoadState,
  selectedCenterState,
  selectedItemState,
} from "../../../store/atoms/MapDirectionState";
import {
  destinationLocationState,
  originLocationState,
  useDestinationLocation,
} from "../../../store/atoms/searchWordState";
import { useGeocodeLatLng } from "../../../hooks/useGeocoddeLatLng";
import { mapStyles } from "../../../styles/mapStyles";
import { Location } from "../../../types/map";
import { Park } from "../../../types/parks";

type Props = {
  directions?: google.maps.DirectionsResult;
  handleMapClick?: (e: google.maps.MapMouseEvent) => void;
  onLoadHook?: (line: google.maps.DirectionsRenderer) => void;
  searchResults: Park[];
  isMapPage?: boolean;
  isDirectionPage?: boolean;
  infoWindowLocation?: {
    instruction: string;
    latLng: { lat: number; lng: number };
  };
  isDirectionLoading?: boolean;
  infoWindowLocationZoomSize?: number;
  mapRef?: React.MutableRefObject<google.maps.Map | null>;
};

const mapOptions = {
  fullscreenControl: false,
  mapTypeControl: false,
  styles: mapStyles,
};

//Iconの設定
const renderIcon = (id?: number, selectedItemId?: number, place?: string) => {
  const destinationIconUrl = "/images/destinationIcon.png";
  const parkIconUrl = "/images/parkIcon.png";
  const currentLocationIconUrl = "/images/currentLocationIcon.png";
  return {
    url:
      id !== undefined
        ? id === selectedItemId
          ? destinationIconUrl
          : parkIconUrl
        : place === "start"
        ? currentLocationIconUrl
        : destinationIconUrl,
    size: new window.google.maps.Size(50, 50),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(25, 25),
  };
};

//label option
const markerLabel = (title: string) => ({
  text: title,
  color: "blue",
  fontFamily: "sans-serif",
  fontSize: "15px",
  fontWeight: "bold",
  labelOrigin: new window.google.maps.Point(0, -30),
});

export const MapView = memo((props: Props) => {
  const {
    directions,
    handleMapClick,
    onLoadHook,
    searchResults,
    isMapPage,
    isDirectionPage,
    infoWindowLocation,
    isDirectionLoading,
    infoWindowLocationZoomSize,
    mapRef,
  } = props;

  const [selectedCenter, setSelectedCenter] =
    useRecoilState(selectedCenterState);
  const [selectedItemId, setSelectedItemId] = useRecoilState(selectedItemState);
  const [mapLoadState, setMapLoadState] = useRecoilState(mapApiLoadState);
  const originLocation = useRecoilValue(originLocationState);
  const destinationLocation = useRecoilValue(destinationLocationState);
  const { saveDestinationLocation } = useDestinationLocation();

  const locations = searchResults.map((result) => {
    const id = result.id;
    const title = result.name;
    const latLng = { lat: result.latitude, lng: result.longitude };
    return { id, title, latLng };
  });

  //出発地、目的地の緯度経度を取得する
  const startLatLng = useGeocodeLatLng(originLocation, mapLoadState);
  const endLatLng = useGeocodeLatLng(destinationLocation, mapLoadState);

  //Google Maps APIの読み込み状態を管理する
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: String(process.env.NEXT_PUBLIC_GOOGLE_MAP_API),
    libraries: ["places"],
  });
  useEffect(() => {
    setMapLoadState({ isLoaded, loadError: Boolean(loadError) });
    if (loadError) {
      console.error("Google Maps API load error:", loadError.message);
    }
  }, [isLoaded, loadError, setMapLoadState]);

  const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;
  console.log("Google Map API Key:", googleMapApiKey);

  if (mapLoadState.loadError) return "Error loading maps";
  if (!mapLoadState.isLoaded) return "Loading Maps";

  return (
    <GoogleMap
      mapContainerStyle={{
        width: window.innerWidth + "px",
        height: window.innerHeight + "px",
      }}
      zoom={infoWindowLocationZoomSize || 10}
      center={selectedCenter}
      options={mapOptions}
      onClick={(e) => handleMapClick?.(e)}
      onLoad={(map) => {
        if (mapRef) {
          mapRef.current = map;
        }
      }}
    >
      {locations?.map(
        ({ id, title, latLng }: Location) =>
          isMapPage && (
            <MarkerF
              key={id}
              position={latLng}
              options={{
                icon: renderIcon(id, selectedItemId, undefined),
                animation:
                  id === selectedItemId
                    ? window.google.maps.Animation.BOUNCE
                    : undefined,
              }}
              title="公園検索結果"
              label={markerLabel(title)}
              onClick={() => {
                setSelectedItemId(id);
                saveDestinationLocation(title);
                setSelectedCenter(latLng);
              }}
            />
          )
      )}
      {originLocation && startLatLng.lat && startLatLng.lng && (
        <MarkerF
          position={startLatLng}
          options={{
            icon: renderIcon(undefined, undefined, "start"),
            animation: window.google.maps.Animation.DROP,
          }}
          title="出発地点"
        ></MarkerF>
      )}
      {isDirectionPage && endLatLng.lat && endLatLng.lng && (
        <MarkerF
          position={endLatLng}
          options={{
            icon: renderIcon(undefined, undefined, "end"),
            animation: window.google.maps.Animation.BOUNCE,
          }}
          title="目的地点"
        />
      )}
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
      {!isDirectionLoading && infoWindowLocation && (
        <InfoWindowF
          position={infoWindowLocation.latLng}
          options={{ pixelOffset: new window.google.maps.Size(0, 0) }}
        >
          <>{parser(infoWindowLocation.instruction)}</>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
});
MapView.displayName = "MapView";
