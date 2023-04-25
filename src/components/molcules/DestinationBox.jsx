import * as React from "react";
import { Autocomplete } from "@react-google-maps/api";
import { TextField } from "@mui/material";

export const DestinationBox = (props) => {
  const { listItem, destinationRef } = props;

  if (!listItem) {
    return null;
  }

  return (
    <Autocomplete>
      <TextField
        id="DestinationBox in map"
        value={listItem.name}
        sx={{ width: 300, height: 50 }}
        inputRef={destinationRef}
      />
    </Autocomplete>
  );
};
