import * as React from "react";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import { destinationLocationState } from "../../store/atoms/searchWordState";
import { TextField } from "@mui/material";

export const DestinationBox = memo((props) => {
  // @ts-expect-error TS(2339): Property 'destinationRef' does not exist on type '... Remove this comment to see the full error message
  const { destinationRef } = props;
  const destinationLocation = useRecoilValue(destinationLocationState);
  if (!destinationLocation) {
    return null;
  }

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <TextField
      id="DestinationBox in map"
      value={destinationLocation}
      sx={{ width: 320, height: 50 }}
      inputRef={destinationRef}
    />
  );
});
