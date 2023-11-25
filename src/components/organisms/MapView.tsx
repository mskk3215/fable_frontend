import React, { memo, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  DirectionsRenderer,
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import ReactHtmlParser from "react-html-parser";
import {
  mapApiLoadState,
  selectedCenterState,
  selectedItemState,
} from "../../store/atoms/MapDirectionState";
import {
  destinationLocationState,
  originLocationState,
} from "../../store/atoms/searchWordState";
import { LatLng, Location } from "../../types/map";
import { Park } from "../../types/parks";

type Props = {
  directions?: google.maps.DirectionsResult;
  handleMapClick?: (e: google.maps.MapMouseEvent) => void;
  onLoadHook?: (line: google.maps.DirectionsRenderer) => void;
  searchResults: Park[];
  isMapPage?: boolean;
  infoWindowLocation?: {
    instruction: string;
    latLng: { lat: number; lng: number };
  };
  isDirectionLoading: boolean;
  infoWindowLocationZoomSize?: number;
  mapRef?: React.MutableRefObject<google.maps.Map | null>;
};

export const MapView = memo((props: Props) => {
  const { directions, handleMapClick, onLoadHook, searchResults, isMapPage } =
    props;
    infoWindowLocation,
    isDirectionLoading,
    infoWindowLocationZoomSize,
    mapRef,
  const [selectedCenter, setSelectedCenter] =
    useRecoilState(selectedCenterState);
  const [selectedItemId, setSelectedItemId] = useRecoilState(selectedItemState);
  const [mapLoadState, setMapLoadState] = useRecoilState(mapApiLoadState);
  const originLocation = useRecoilValue(originLocationState);
  const destinationLocation = useRecoilValue(destinationLocationState);

  const [startLatLng, setStartLatLng] = useState<LatLng>({
    lat: 0,
    lng: 0,
  });
  const mapOptions = {
    fullscreenControl: false,
    mapTypeControl: false,
  };

  const locations = searchResults.map((result) => {
    const id = result.id;
    const title = result.name;
    const latLng = { lat: result.latitude, lng: result.longitude };
    return { id, title, latLng };
  });

  //出発地点の緯度経度を取得する
  useEffect(() => {
    if (!mapLoadState.isLoaded || mapLoadState.loadError || !originLocation)
      return;
    getGeocode({ address: originLocation })
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setStartLatLng(latLng))
      .catch((error) => console.error("Error: ", error));
  }, [originLocation, mapLoadState]);

  //Google Maps APIの読み込み状態を管理する
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: String(process.env.REACT_APP_GOOGLE_MAP_API_KEY),
    libraries: ["places"],
  });
  useEffect(() => {
    setMapLoadState({ isLoaded, loadError: Boolean(loadError) });
  }, [isLoaded, loadError, setMapLoadState]);

  if (mapLoadState.loadError) return "Error loading maps";
  if (!mapLoadState.isLoaded) return "Loading Maps";

  //Iconの設定
  const renderIcon = (id?: number) => {
    const selectedIconUrl = process.env.PUBLIC_URL + "/images/selectedIcon.png";
    const parkIconUrl = process.env.PUBLIC_URL + "/images/parkIcon.png";
    const currentLocationIconUrl =
      process.env.PUBLIC_URL + "/images/currentLocationIcon.png";
    return {
      url:
        id !== undefined
          ? id === selectedItemId
            ? selectedIconUrl
            : parkIconUrl
          : currentLocationIconUrl,
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
          (isMapPage || title === destinationLocation) && (
            <MarkerF
              key={id}
              position={latLng}
              options={{
                icon: renderIcon(id),
                animation:
                  id === selectedItemId
                    ? window.google.maps.Animation.BOUNCE
                    : undefined,
              }}
              label={markerLabel(title)}
              onClick={() => {
                setSelectedItemId(id);
                setSelectedCenter(latLng);
              }}
            />
          )
      )}
      {isDirectionPage &&
        originLocation &&
        startLatLng.lat &&
        startLatLng.lng && (
          <MarkerF
            position={startLatLng}
            options={{
              icon: renderIcon(),
              animation: window.google.maps.Animation.DROP,
            }}
            title="出発地点"
          ></MarkerF>
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
          <>{ReactHtmlParser(infoWindowLocation.instruction)}</>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
});
