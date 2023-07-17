import * as React from "react";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Autocomplete } from "@react-google-maps/api";
import { originLocationState } from "../../store/atoms/searchWordState";
import { mapApiLoadState } from "../../store/atoms/MapDirectionState";
import { IconButton, TextField } from "@mui/material";
import Close from "@mui/icons-material/Close";

// @ts-expect-error TS(2769): No overload matches this call.
export const OriginBox = memo((props) => {
  // @ts-expect-error TS(2339): Property 'originRef' does not exist on type '{}'.
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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Autocomplete>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <TextField
        id="originBox"
        placeholder="出発地を入力 or 地図上でクリック"
        value={originLocation === "" ? undefined : originLocation}
        sx={{ width: 320, height: 50 }}
        inputRef={originRef}
        InputProps={{
          endAdornment: (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <React.Fragment>
              {originLocation !== undefined && (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <IconButton onClick={handleDeleteClick}>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
