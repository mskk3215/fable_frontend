import * as React from "react";
import { memo } from "react";
import { TextField } from "@mui/material";

export const DestinationBox = memo((props) => {
  const { listItem, destinationRef } = props;

  if (!listItem) {
    return null;
  }

  return (
    <TextField
      id="DestinationBox in map"
      value={listItem.name}
      sx={{ width: 320, height: 50 }}
      inputRef={destinationRef}
    />
  );
});
