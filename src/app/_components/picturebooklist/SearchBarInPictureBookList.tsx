"use client";

import { useEffect, useState } from "react";
import { convertHiraganaToKatakana } from "../../../hooks/useConvertHiraganaToKatakana";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled as muiStyled, alpha } from "@mui/material/styles";

type Props = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  handleSearch: () => void;
};

export const SearchBarInPictureBookList = (props: Props) => {
  const { searchTerm, setSearchTerm, handleSearch } = props;
  const [searchWord, setSearchWord] = useState<string>("");

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  return (
    <>
      <TextField
        fullWidth
        placeholder="昆虫名で絞りこみ"
        value={searchWord}
        onChange={(e) => {
          const newValue = e.target.value;
          setSearchWord(newValue);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const convertedInputValue = convertHiraganaToKatakana(searchWord);
            setSearchTerm(convertedInputValue);
          }
        }}
        InputProps={{
          startAdornment: (
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          ),
        }}
      />
    </>
  );
};

const SearchIconWrapper = muiStyled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: alpha(theme.palette.common.black, 0.54),
}));
