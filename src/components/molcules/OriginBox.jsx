import * as React from "react";
import { Autocomplete } from "@react-google-maps/api";
import { TextField } from "@mui/material";

export const OriginBox = (props) => {
  const { originRef } = props;

  return (
    <Autocomplete>
      <TextField
        id="originBox"
        sx={{ width: 300, height: 50 }}
        inputRef={originRef}
      />
    </Autocomplete>
  );
};
