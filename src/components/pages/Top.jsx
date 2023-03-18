import React, { useCallback, useMemo, useState } from "react";
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
import { useAllParks } from "../../hooks/useAllParks";

export const Top = (props) => {
  const { insectOptions } = useAllInsects();
  const { parkOptions } = useAllParks();

  const [searchWord, setSearchWord] = useState("");

  const insectParkOptions = useMemo(
    () => [...insectOptions, ...parkOptions],
    [insectOptions, parkOptions]
  );

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
            options={insectParkOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="昆虫名か公園名を入力して下さい"
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
        </Container>
      </SConteiner>
    </>
  );
};
