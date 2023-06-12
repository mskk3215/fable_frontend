import React, { useEffect, useContext } from "react";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { useAllInsects } from "../../hooks/useAllInsects";
import { SearchParkContext } from "../../providers/SearchParkProvider";
import {
  saveSearchWord,
  searchWordState,
} from "../../store/atoms/searchWordState";
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
  const { insectOptions } = useAllInsects();
  const { handleGetParkSearchResults } = useContext(SearchParkContext);
  const [searchWord, setSearchWord] = useRecoilState(searchWordState);

  const handleSearch = () => {
    handleGetParkSearchResults(searchWord);
  };

  // searchWordの値が更新されたらローカルストレージに保存する
  useEffect(() => {
    saveSearchWord(searchWord);
  }, [searchWord]);

  const SConteiner = styled.div`
    text-align: center;
    margin-top: 100px;
  `;

  return (
    <>
      <SConteiner>
        <h1>Top</h1>
        <Container maxWidth="md" sx={{ mt: 20 }}>
          <Autocomplete
            id="demo"
            value={searchWord}
            onChange={(e, newValue) => {
              setSearchWord(newValue?.label || "");
            }}
            options={insectOptions}
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
