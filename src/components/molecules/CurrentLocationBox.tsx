import * as React from "react";
import { useRecoilState } from "recoil";
import { Autocomplete, LoadScriptNext } from "@react-google-maps/api";
import { originLocationState } from "../../store/atoms/searchWordState";
import TextField from "@mui/material/TextField";
import { Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

type Props = {
  setCurrentLat?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setCurrentLng?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const CurrentLocationBox = (props: Props) => {
  const { setCurrentLat, setCurrentLng } = props;
  const [originLocation, setOriginLocation] =
    useRecoilState(originLocationState);

  // 現在の住所が入力されたら、緯度経度を取得する
  const handleChangeCurrentLocation = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOriginLocation(e.target.value);
    getLatLng(e.target.value);
  };

  // Geocoding APIを使用して、住所から緯度経度を取得する
  const getLatLng = (address: string) => {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          setCurrentLat?.(lat);
          setCurrentLng?.(lng);
          resolve({ lat, lng });
        } else {
          reject(new Error("Geocoding failed with status: " + status));
        }
      });
    });
  };

  const handleDeleteClick = () => {
    setOriginLocation("");
  };

  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY as string}
      libraries={["places"]}
    >
      <Box sx={{ minWidth: 300 }}>
        <Autocomplete>
          <TextField
            id="currentLocationBox"
            placeholder="現在位置"
            value={originLocation ?? undefined}
            onChange={(e) => handleChangeCurrentLocation(e)}
            variant="standard"
            label="現在位置を入力"
            InputProps={{
              endAdornment: (
                <React.Fragment>
                  {originLocation && (
                    <IconButton
                      onClick={() => {
                        handleDeleteClick();
                      }}
                    >
                      <Close />
                    </IconButton>
                  )}
                </React.Fragment>
              ),
            }}
          />
        </Autocomplete>
      </Box>
    </LoadScriptNext>
  );
};
