import * as React from "react";
import { useContext, useEffect, memo } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  saveSearchWord,
  searchWordState,
} from "../../store/atoms/searchWordState";
import { useAllInsects } from "../../hooks/useAllInsects";
import { SearchParkContext } from "../../providers/SearchParkProvider";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Close from "@mui/icons-material/Close";
import DirectionsIcon from "@mui/icons-material/Directions";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";

export const InsectSearchBox = memo((props) => {
  const { setOpen, selectedItemId, setSelectedItemId } = props;
  const { handleGetParkSearchResults } = useContext(SearchParkContext);
  const [searchWord, setSearchWord] = useRecoilState(searchWordState);
  const { insectOptions } = useAllInsects();

  const handleSearch = () => {
    handleGetParkSearchResults(searchWord);
  };

  const handleSearchButtonClick = () => {
    setOpen(true);
    handleSearch();
  };

  const handleCancelButtonClick = () => {
    setOpen(false);
    setSelectedItemId(false);
  };

  const navigate = useNavigate();
  const handleDirectionButtonClick = () => {
    navigate("/direction");
  };

  // searchWordの値が更新されたらローカルストレージに保存する
  useEffect(() => {
    saveSearchWord(searchWord);
  }, [searchWord]);

  return (
    <Autocomplete
      sx={{
        height: 100,
        width: 350,
        marginTop: -1,
        marginLeft: 1,
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
                    disabled={!searchWord}
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
                  {selectedItemId >= 1 ? (
                    <IconButton onClick={handleDirectionButtonClick}>
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
});
