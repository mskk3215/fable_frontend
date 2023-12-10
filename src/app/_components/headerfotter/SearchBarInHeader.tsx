"use client";

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { usePathname, useRouter } from "next/navigation";
import { useAllInsects } from "../../../hooks/useAllInsects";
import { useParks } from "../../../hooks/useParks";
import {
  saveSearchWord,
  searchWordState,
} from "../../../store/atoms/searchWordState";
import { convertHiraganaToKatakana } from "../../../hooks/useConvertHiraganaToKatakana";
import { Autocomplete, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled as muiStyled, alpha } from "@mui/material/styles";

export const SearchBarInHeader = () => {
  const { insectOptions, setQueryWord } = useAllInsects();
  const { handleGetParkSearchResults } = useParks();
  const [searchWord, setSearchWord] = useRecoilState(searchWordState);
  const pathname = usePathname();

  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchWord) {
      router.push("/map");
      handleGetParkSearchResults(searchWord);
    }
  };

  // searchWordの値が更新されたらローカルストレージに保存する
  useEffect(() => {
    saveSearchWord(searchWord);
  }, [searchWord]);

  // ページ遷移時にsearchWordの値を初期化する
  useEffect(() => {
    setSearchWord("");
  }, [pathname]);

  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <Autocomplete
          id="search-bar-autocomplete"
          style={{ width: 250 }}
          onChange={(e, newValue) => {
            setSearchWord(newValue || "");
          }}
          onInputChange={(e, newInputValue) => {
            let convertedInputValue = convertHiraganaToKatakana(newInputValue);
            setQueryWord(convertedInputValue);
          }}
          options={insectOptions}
          noOptionsText="昆虫名を入力してください"
          filterOptions={(options, params) => {
            const filtered = options.filter((option) => {
              let inputValue = convertHiraganaToKatakana(params.inputValue);
              return option.includes(inputValue);
            });
            return filtered;
          }}
          renderInput={(params) => {
            const { InputLabelProps, InputProps, ...rest } = params;
            return (
              <StyledInputBase
                {...params.InputProps}
                {...rest}
                placeholder="昆虫名を入力"
              />
            );
          }}
          onKeyDown={(e) => {
            handleSearch(e);
          }}
        />
      </Search>
    </>
  );
};

const Search = muiStyled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  height: "40px",
  margin: "0 10px",
}));

const SearchIconWrapper = muiStyled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = muiStyled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
