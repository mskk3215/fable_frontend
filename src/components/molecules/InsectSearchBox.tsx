import * as React from "react";
import { useContext, useEffect, memo } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  saveSearchWord,
  searchWordState,
} from "../../store/atoms/searchWordState";
// @ts-expect-error TS(6142): Module '../../hooks/useAllInsects' was resolved to... Remove this comment to see the full error message
import { useAllInsects } from "../../hooks/useAllInsects";
// @ts-expect-error TS(6142): Module '../../providers/SearchParkProvider' was re... Remove this comment to see the full error message
import { SearchParkContext } from "../../providers/SearchParkProvider";
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

export const InsectSearchBox = memo((props) => {
  // @ts-expect-error TS(2339): Property 'setOpen' does not exist on type '{}'.
  const { setOpen, selectedItemId, setSelectedItemId } = props;

  // @ts-expect-error TS(2339): Property 'handleGetParkSearchResults' does not exi... Remove this comment to see the full error message
  const { handleGetParkSearchResults } = useContext(SearchParkContext);
  const [searchWord, setSearchWord] = useRecoilState(searchWordState);
  const { insectOptions } = useAllInsects();

  const handleSearch = () => {
    handleGetParkSearchResults(searchWord);
  };

  const handleSearchButtonClick = () => {
    setOpen(true);
    handleSearch();
  };

  const handleCancelButtonClick = () => {
    setOpen(false);
    setSelectedItemId(false);
  };

  const navigate = useNavigate();
  const handleDirectionButtonClick = () => {
    navigate("/direction");
  };

  // searchWordの値が更新されたらローカルストレージに保存する
  useEffect(() => {
    saveSearchWord(searchWord);
  }, [searchWord]);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Autocomplete
      sx={{
        height: 100,
        width: 350,
        marginTop: -1,
        marginLeft: 1,
      }}
      id="searchbox in map"
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
          sx={{ width: "100%", bgcolor: "white" }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <InputAdornment position="end">
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Tooltip title="昆虫を検索する">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <span>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <IconButton
                        type="button"
                        aria-label="search"
                        onClick={handleSearchButtonClick}
                        disabled={!searchWord}
                      >
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <SearchIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  {searchWord ? (
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Tooltip title="閉じる">
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <IconButton
                        type="button"
                        aria-label="cancel"
                        onClick={handleCancelButtonClick}
                      >
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <Close />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    ""
                  )}
                  {selectedItemId >= 1 ? (
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Tooltip title="ルートを検索する">
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <IconButton onClick={handleDirectionButtonClick}>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
