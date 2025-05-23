"use client";

import * as React from "react";
import { memo, useRef, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Autocomplete, LoadScriptNext } from "@react-google-maps/api";
import {
  originLocationState,
  useOriginLocation,
} from "../../../store/atoms/searchWordState";
import { isGeocoderLoadedState } from "../../../store/atoms/statisticsState";
import { messageState } from "../../../store/atoms/errorAtom";
import TextField from "@mui/material/TextField";
import { Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

type Props = {
  setCurrentLat?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setCurrentLng?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const CurrentLocationBox = memo((props: Props) => {
  const { setCurrentLat, setCurrentLng } = props;
  const originLocation = useRecoilValue(originLocationState);
  const { saveOriginLocation } = useOriginLocation();
  const [isGeocoderLoaded, setIsGeocoderLoaded] = useRecoilState(
    isGeocoderLoadedState
  );
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const setMessage = useSetRecoilState(messageState);

  const handlePlaceSelected = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && typeof place.formatted_address === "string") {
        saveOriginLocation(place.formatted_address);
        getLatLng(place.formatted_address);
      }
    }
  };

  // Geocoding APIを使用して、住所から緯度経度を取得する
  const getLatLng = (address: string) => {
    return new Promise<{ lat: number; lng: number }>((resolve) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          setCurrentLat?.(lat);
          setCurrentLng?.(lng);
          resolve({ lat, lng });
        } else {
          setMessage({
            message:
              "Geocode was not successful for the following reason: " + status,
            type: "error",
          });
        }
      });
    });
  };

  useEffect(() => {
    if (!isGeocoderLoaded || originLocation === "") {
      return;
    }
    getLatLng(originLocation);
  }, [isGeocoderLoaded]);

  const handleDeleteClick = () => {
    saveOriginLocation("");
    setCurrentLat?.(undefined);
    setCurrentLng?.(undefined);
    localStorage.removeItem("originLocation");
  };

  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}
      libraries={["places"]}
      onLoad={() => setIsGeocoderLoaded(true)}
    >
      <Box sx={{ minWidth: 200, display: "flex", justifyContent: "flex-end" }}>
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceSelected}
        >
          <TextField
            id="currentLocationBox"
            placeholder="現在位置を入力"
            value={originLocation}
            variant="standard"
            onChange={(e) => saveOriginLocation(e.target.value)}
            InputProps={{
              endAdornment: (
                <React.Fragment>
                  <IconButton onClick={handleDeleteClick}>
                    <Close />
                  </IconButton>
                </React.Fragment>
              ),
            }}
          />
        </Autocomplete>
      </Box>
    </LoadScriptNext>
  );
});
CurrentLocationBox.displayName = "CurrentLocationBox";
