"use client";

import React, { memo } from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import {
  searchWordState,
  useDestinationLocation,
  useSearchWord,
} from "../../../store/atoms/searchWordState";
import { convertHiraganaToKatakana } from "../../../hooks/useConvertHiraganaToKatakana";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Close from "@mui/icons-material/Close";
import DirectionsIcon from "@mui/icons-material/Directions";
import {
  Autocomplete,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import { selectedItemNameState } from "../../../store/atoms/MapDirectionState";

type Props = {
  setOpen: (open: boolean) => void;
  selectedItemId?: number;
  setSelectedItemId: (id?: number) => void;
  handleGetParkSearchResults: (searchWord: string) => void;
  insectOptions: string[];
  queryWord: string;
  setQueryWord: (queryWord: string) => void;
};

export const InsectSearchBox = memo((props: Props) => {
  const {
    setOpen,
    selectedItemId,
    setSelectedItemId,
    handleGetParkSearchResults,
    insectOptions,
    setQueryWord,
  } = props;

  const searchWord = useRecoilValue(searchWordState);
  const { saveSearchWord } = useSearchWord();
  const { saveDestinationLocation } = useDestinationLocation();
  const selectedItemName = useRecoilValue(selectedItemNameState);

  const handleSearch = () => {
    setOpen(true);
    handleGetParkSearchResults(searchWord);
  };

  const handleCancelButtonClick = () => {
    setOpen(false);
    setSelectedItemId(undefined);
  };

  const router = useRouter();
  const handleDirectionButtonClick = () => {
    if (selectedItemName === undefined) return;
    saveDestinationLocation(selectedItemName);
    router.push("/direction");
  };

  return (
    <Autocomplete
      sx={{
        height: 100,
        width: 350,
        marginLeft: 1,
      }}
      id="searchbox in map"
      value={searchWord}
      onChange={(e, newValue) => {
        saveSearchWord(newValue || "");
      }}
      onInputChange={(e, newInputValue) => {
        const convertedInputValue = convertHiraganaToKatakana(newInputValue);
        setQueryWord(convertedInputValue);
      }}
      options={insectOptions}
      noOptionsText="昆虫名を入力してください"
      filterOptions={(options, params) => {
        const filtered = options.filter((option) => {
          const inputValue = convertHiraganaToKatakana(params.inputValue);
          return option.includes(inputValue);
        });
        return filtered;
      }}
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
                  <Tooltip title="昆虫を検索する">
                    <span>
                      <IconButton
                        type="button"
                        aria-label="search"
                        onClick={handleSearch}
                        disabled={!searchWord}
                      >
                        <SearchIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  {searchWord ? (
                    <Tooltip title="閉じる">
                      <IconButton
                        type="button"
                        aria-label="cancel"
                        onClick={handleCancelButtonClick}
                      >
                        <Close />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    ""
                  )}
                  {selectedItemId !== undefined && selectedItemId >= 1 ? (
                    <Tooltip title="ルートを検索する">
                      <IconButton onClick={handleDirectionButtonClick}>
                        <DirectionsIcon color="primary" />
                      </IconButton>
                    </Tooltip>
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
InsectSearchBox.displayName = "InsectSearchBox";
