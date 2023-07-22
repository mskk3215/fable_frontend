import * as React from "react";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import { destinationLocationState } from "../../store/atoms/searchWordState";
import { TextField } from "@mui/material";

export const DestinationBox = memo((props) => {
  const { destinationRef } = props;
  const destinationLocation = useRecoilValue(destinationLocationState);
  if (!destinationLocation) {
    return null;
  }

  return (
    <TextField
      id="DestinationBox in map"
      value={destinationLocation}
      sx={{ width: 320, height: 50 }}
      inputRef={destinationRef}
    />
  );
});
