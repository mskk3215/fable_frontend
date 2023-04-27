import * as React from "react";
import { Autocomplete } from "@react-google-maps/api";
import { TextField } from "@mui/material";

export const OriginBox = (props) => {
  const { originRef, address } = props;

  return (
    <Autocomplete>
      <TextField
        id="originBox"
        value={address === null ? undefined : address}
        sx={{ width: 300, height: 50 }}
        inputRef={originRef}
      />
    </Autocomplete>
  );
};
