import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Link, useLocation } from "react-router-dom";
import { useAllInsects } from "../../hooks/useAllInsects";
import { useParks } from "../../hooks/useParks";
import {
  saveSearchWord,
  searchWordState,
} from "../../store/atoms/searchWordState";
import { convertHiraganaToKatakana } from "../../hooks/useConvertHiraganaToKatakana";
import styled from "styled-components";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const Top = () => {
  const { insectOptions, setQueryWord } = useAllInsects();
  const { handleGetParkSearchResults } = useParks();
  const [searchWord, setSearchWord] = useRecoilState(searchWordState);
  const location = useLocation();

  const handleSearch = () => {
    handleGetParkSearchResults(searchWord);
  };

  // searchWordの値が更新されたらローカルストレージに保存する
  useEffect(() => {
    saveSearchWord(searchWord);
  }, [searchWord]);

  // ページ遷移時にsearchWordの値を初期化する
  useEffect(() => {
    setSearchWord("");
  }, [location.pathname]);

  return (
    <>
      <SConteiner>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Autocomplete
            data-testid="autocomplete"
            onChange={(e, newValue) => {
              setSearchWord(newValue || "");
            }}
            onInputChange={(e, newInputValue) => {
              let convertedInputValue =
                convertHiraganaToKatakana(newInputValue);
              setQueryWord(convertedInputValue);
            }}
            options={insectOptions}
            sx={{ width: { xs: "80vw", md: "50vw" }, backgroundColor: "white" }}
            noOptionsText="昆虫名を入力してください"
            filterOptions={(options, params) => {
              const filtered = options.filter((option) => {
                let inputValue = convertHiraganaToKatakana(params.inputValue);
                return option.includes(inputValue);
              });
              return filtered;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="昆虫名を入力して下さい"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      {params.InputProps.startAdornment}
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    </>
                  ),
                }}
              />
            )}
          ></Autocomplete>
          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <Link to={searchWord !== null && searchWord !== "" ? "map" : ""}>
              <Button
                variant="outlined"
                onClick={handleSearch}
                sx={{
                  height: 40,
                  width: 100,
                  bgcolor: "grey.200",
                  color: "black",
                  borderColor: "grey.400",
                  "&:hover": {
                    backgroundColor: "grey.300",
                  },
                }}
                disabled={searchWord == null || searchWord === ""}
              >
                検索
              </Button>
            </Link>
          </Grid>
        </Box>
      </SConteiner>
    </>
  );
};

const toppage = process.env.PUBLIC_URL + "/images/toppage.png";

const SConteiner = styled.div`
  text-align: center;
  width: 100%;
  height: 100vh;
  background-image: url(${toppage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 0;
  margin: 0;
`;
