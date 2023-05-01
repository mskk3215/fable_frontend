import * as React from "react";
import { Autocomplete } from "@react-google-maps/api";
import { IconButton, TextField } from "@mui/material";
import Close from "@mui/icons-material/Close";

export const OriginBox = (props) => {
  const { originRef, address, setAddress, clearRoute } = props;

  const handleDeleteClick = () => {
    setAddress("");
    clearRoute();
  };

  return (
    <Autocomplete>
      <TextField
        id="originBox"
        placeholder="出発地を入力 or 地図上でクリック"
        value={address === "" ? undefined : address}
        sx={{ width: 300, height: 50 }}
        inputRef={originRef}
        InputProps={{
          endAdornment: (
            <React.Fragment>
              {address !== undefined && (
                <IconButton onClick={handleDeleteClick}>
                  <Close />
                </IconButton>
              )}
            </React.Fragment>
          ),
        }}
      />
    </Autocomplete>
  );
};
