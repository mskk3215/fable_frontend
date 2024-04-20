"use client";

import React, { memo } from "react";
import { useRecoilValue } from "recoil";
import { destinationLocationState } from "../../../store/atoms/searchWordState";
import { TextField } from "@mui/material";

type Props = {
  destinationRef: React.RefObject<HTMLInputElement>;
};

export const DestinationBox = memo((props: Props) => {
  const { destinationRef } = props;
  const destinationLocation = useRecoilValue(destinationLocationState);

  return (
    <TextField
      id="DestinationBox in map"
      value={destinationLocation}
      sx={{ width: 350, height: 50 }}
      inputRef={destinationRef}
    />
  );
});
DestinationBox.displayName = "DestinationBox";
