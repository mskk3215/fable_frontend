import * as React from "react";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Autocomplete } from "@react-google-maps/api";
import { originLocationState } from "../../store/atoms/searchWordState";
import { mapApiLoadState } from "../../store/atoms/MapDirectionState";
import { IconButton, TextField } from "@mui/material";
import Close from "@mui/icons-material/Close";

export const OriginBox = memo((props) => {
  const { originRef, clearRoute } = props;
  const [originLocation, setOriginLocation] =
    useRecoilState(originLocationState);
  const mapLoadState = useRecoilValue(mapApiLoadState);

  const handleDeleteClick = () => {
    setOriginLocation("");
    clearRoute();
  };

  //Google Maps APIの読み込み状態を管理する
  if (mapLoadState.loadError) return "Error loading maps";
  if (!mapLoadState.isLoaded) return "Loading Maps";

  return (
    <Autocomplete>
      <TextField
        id="originBox"
        placeholder="出発地を入力 or 地図上でクリック"
        value={originLocation === "" ? undefined : originLocation}
        sx={{ width: 320, height: 50 }}
        inputRef={originRef}
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
