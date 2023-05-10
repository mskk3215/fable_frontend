import * as React from "react";
import { TextField } from "@mui/material";

export const DestinationBox = (props) => {
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
};
