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
  Button,
  Container,
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
        <h1>Top</h1>
        <Container maxWidth="md" sx={{ mt: 20 }}>
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
                }}
                disabled={searchWord == null || searchWord === ""}
              >
                検索
              </Button>
            </Link>
          </Grid>
        </Container>
      </SConteiner>
    </>
  );
};

const SConteiner = styled.div`
  text-align: center;
  margin-top: 100px;
`;
