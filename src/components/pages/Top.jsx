import {
  Autocomplete,
  Container,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useAllInsects } from "../../hooks/useAllInsects";

export const Top = (props) => {
  const [searchTerm, setSearchTerm] = useState();
  const { insectOptions } = useAllInsects();

  const handleSearchChange = (value) => {
    setSearchTerm(value);
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
            freeSolo
            onChange={(e, value) => {
              handleSearchChange(value.id);
            }}
            options={insectOptions}
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
