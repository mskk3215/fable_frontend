"use client";

import React, { memo, useRef } from "react";
import { useRecoilValue } from "recoil";
import { Autocomplete } from "@react-google-maps/api";
import {
  originLocationState,
  useOriginLocation,
} from "../../../store/atoms/searchWordState";
import { mapApiLoadState } from "../../../store/atoms/MapDirectionState";
import { IconButton, TextField } from "@mui/material";
import Close from "@mui/icons-material/Close";

type Props = {
  originRef: React.RefObject<HTMLInputElement>;
  clearRoute: () => void;
};

export const OriginBox = memo((props: Props) => {
  const { originRef, clearRoute } = props;
  const originLocation = useRecoilValue(originLocationState);
  const { saveOriginLocation } = useOriginLocation();
  const mapLoadState = useRecoilValue(mapApiLoadState);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceSelected = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.formatted_address) {
        saveOriginLocation(place.formatted_address);
      } else {
        console.error("選択された場所に住所情報がありません。");
        saveOriginLocation("");
      }
    }
  };

  const handleDeleteClick = () => {
    saveOriginLocation("");
    clearRoute();
  };

  //Google Maps APIの読み込み状態を管理する
  if (mapLoadState.loadError) return "Error loading maps";
  if (!mapLoadState.isLoaded) return "Loading Maps";

  return (
    <Autocomplete
      onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
      onPlaceChanged={handlePlaceSelected}
    >
      <TextField
        id="originBox"
        placeholder="出発地を入力 or 地図上でクリック"
        value={originLocation}
        sx={{ width: 350, height: 50 }}
        inputRef={originRef}
        onChange={(e) => saveOriginLocation(e.target.value)}
        InputProps={{
          endAdornment: (
            <React.Fragment>
              {originLocation !== undefined && (
                <IconButton onClick={handleDeleteClick}>
                  <Close />
                </IconButton>
              )}
            </React.Fragment>
          ),
        }}
      />
    </Autocomplete>
  );
});
OriginBox.displayName = "OriginBox";
