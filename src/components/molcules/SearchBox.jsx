import * as React from "react";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Close from "@mui/icons-material/Close";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useRecoilState } from "recoil";
import { searchWordState } from "../../store/searchWordState";
import { useAllInsects } from "../../hooks/useAllInsects";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { useContext } from "react";
import { SearchParkContext } from "../../providers/SearchParkProvider";

export const SearchBox = (props) => {
  const {
    handleDrawerOpen,
    handleDrawerClose,
    selectedItemId,
    setSelectedItemId,
  } = props;
  const { handleGetParkSearchResults } = useContext(SearchParkContext);
  const [searchWord, setSearchWord] = useRecoilState(searchWordState);
  const { insectOptions } = useAllInsects();

  const handleSearch = () => {
    handleGetParkSearchResults(searchWord);
  };

  const handleSearchButtonClick = () => {
    handleDrawerOpen();
    handleSearch();
  };

  const handleCancelButtonClick = () => {
    handleDrawerClose();
    setSelectedItemId(false);
  };

  return (
    <Autocomplete
      sx={{
        p: "2px 4px",
        height: 100,
        width: 380,
      }}
      id="searchbox in map"
      value={searchWord}
      onChange={(e, newValue) => {
        setSearchWord(newValue?.label || "");
      }}
      options={insectOptions}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="昆虫名を入力して下さい"
          sx={{ width: "100%", bgcolor: "white" }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                <InputAdornment position="end">
                  <IconButton
                    type="button"
                    aria-label="search"
                    onClick={handleSearchButtonClick}
                  >
                    <SearchIcon />
                  </IconButton>
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  {searchWord ? (
                    <IconButton
                      type="button"
                      aria-label="cancel"
                      onClick={handleCancelButtonClick}
                    >
                      <Close />
                    </IconButton>
                  ) : (
                    ""
                  )}
                  {selectedItemId ? (
                    <IconButton>
                      <DirectionsIcon color="primary" />
                    </IconButton>
                  ) : (
                    ""
                  )}
                </InputAdornment>
              </>
            ),
          }}
        />
      )}
    />
  );
};
