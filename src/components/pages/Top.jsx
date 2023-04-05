import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Autocomplete,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { useAllInsects } from "../../hooks/useAllInsects";
import { useContext } from "react";
import { SearchParkContext } from "../../providers/SearchParkProvider";

export const Top = () => {
  const { insectOptions } = useAllInsects();
  const { handleGetParkSearchResults, searchResults } =
    useContext(SearchParkContext);
  const [searchWord, setSearchWord] = useState("");

  const handleSearch = () => {
    handleGetParkSearchResults(searchWord);
  };

  const SConteiner = styled.div`
    text-align: center;
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
            {searchWord !== null && searchWord !== "" ? (
              <Link to="map">
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
                >
                  検索
                </Button>
              </Link>
            ) : (
              <Button
                variant="outlined"
                disabled
                onClick={handleSearch}
                sx={{
                  height: 40,
                  width: 100,
                  bgcolor: "grey.200",
                  color: "black",
                  borderColor: "grey.400",
                }}
              >
                検索
              </Button>
            )}
          </Grid>
        </Container>
      </SConteiner>
    </>
  );
};
