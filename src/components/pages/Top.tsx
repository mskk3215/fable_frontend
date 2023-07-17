import React, { useEffect, useContext } from "react";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
// @ts-expect-error TS(6142): Module '../../hooks/useAllInsects' was resolved to... Remove this comment to see the full error message
import { useAllInsects } from "../../hooks/useAllInsects";
// @ts-expect-error TS(6142): Module '../../providers/SearchParkProvider' was re... Remove this comment to see the full error message
import { SearchParkContext } from "../../providers/SearchParkProvider";
import {
  saveSearchWord,
  searchWordState,
} from "../../store/atoms/searchWordState";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'styl... Remove this comment to see the full error message
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
  // @ts-expect-error TS(2339): Property 'handleGetParkSearchResults' does not exi... Remove this comment to see the full error message
  const { handleGetParkSearchResults } = useContext(SearchParkContext);
  const [searchWord, setSearchWord] = useRecoilState(searchWordState);

  const handleSearch = () => {
    handleGetParkSearchResults(searchWord);
  };

  // searchWordの値が更新されたらローカルストレージに保存する
  useEffect(() => {
    saveSearchWord(searchWord);
  }, [searchWord]);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <SConteiner>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <h1>Top</h1>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Container maxWidth="md" sx={{ mt: 20 }}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Autocomplete
            data-testid="autocomplete"
            value={searchWord}
            onChange={(e, newValue) => {
              // @ts-expect-error TS(2339): Property 'label' does not exist on type 'string'.
              setSearchWord(newValue?.label || "");
            }}
            options={insectOptions}
            renderInput={(params) => (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <TextField
                {...params}
                placeholder="昆虫名を入力して下さい"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <>
                      {params.InputProps.startAdornment}
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <InputAdornment position="start">
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <SearchIcon />
                      </InputAdornment>
                    </>
                  ),
                }}
              />
            )}
          ></Autocomplete>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Link to={searchWord !== null && searchWord !== "" ? "map" : ""}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
