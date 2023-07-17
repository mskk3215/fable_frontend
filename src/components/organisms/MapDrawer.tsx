import React, { useState, useContext, useEffect, useRef, memo } from "react";
import { useRecoilState } from "recoil";
// @ts-expect-error TS(6142): Module '../../providers/SearchParkProvider' was re... Remove this comment to see the full error message
import { SearchParkContext } from "../../providers/SearchParkProvider";
import {
  selectedCenterState,
  selectedItemState,
} from "../../store/atoms/MapDirectionState";
// @ts-expect-error TS(6142): Module '../atoms/layout/Header' was resolved to '/... Remove this comment to see the full error message
import { Header } from "../atoms/layout/Header";
import {
  destinationLocationState,
  saveDestinationLocation,
} from "../../store/atoms/searchWordState";
// @ts-expect-error TS(6142): Module '../molecules/InsectSearchBox' was resolved... Remove this comment to see the full error message
import { InsectSearchBox } from "../molecules/InsectSearchBox";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from "styled-components";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemAvatar, Typography } from "@mui/material";

export const MapDrawer = memo((props) => {
  // @ts-expect-error TS(2339): Property 'anchor' does not exist on type '{}'.
  const { anchor, drawerWidth, drawerHeight } = props;
  // @ts-expect-error TS(2339): Property 'searchResults' does not exist on type 'u... Remove this comment to see the full error message
  const { searchResults } = useContext(SearchParkContext);
  const [selectedCenter, setSelectedCenter] =
    useRecoilState(selectedCenterState);
  const [destinationLocation, setDestinationLocation] = useRecoilState(
    destinationLocationState
  );
  const [selectedItemId, setSelectedItemId] = useRecoilState(selectedItemState);
  const [open, setOpen] = useState(true);

  const handleListItem = (result: any) => {
    setSelectedItemId(result.id);
    setDestinationLocation(result.name);
    setSelectedCenter({ lat: result.latitude, lng: result.longitude });
  };
  useEffect(() => {
    saveDestinationLocation(destinationLocation);
  }, [destinationLocation]);

  const SearchBoxStyled = styled.div`
    position: absolute;
    top: 55px;
    left: 10px;
    z-index: 2;
  `;

  // 検索結果のリストの先頭にスクロールする
  const topListItemRef = useRef(null);

  useEffect(() => {
    if (selectedItemId && topListItemRef.current) {
      // @ts-expect-error TS(2339): Property 'scrollIntoView' does not exist on type '... Remove this comment to see the full error message
      topListItemRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedItemId]);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Box sx={{ display: "flex" }}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <CssBaseline />
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Header />
      </AppBar>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <SearchBoxStyled>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <InsectSearchBox
          // @ts-expect-error TS(2322): Type '{ setOpen: Dispatch<SetStateAction<boolean>>... Remove this comment to see the full error message
          setOpen={setOpen}
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
        />
      </SearchBoxStyled>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Drawer
        variant="persistent"
        sx={{
          zIndex: 1,
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        open={open}
        anchor={anchor}
      >
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        {anchor === "left" ? <Toolbar style={{ height: "110px" }} /> : <></>}
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Box sx={{ overflow: "auto", height: drawerHeight }}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <List>
            {searchResults.length === 0 ? (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <ListItem>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <SListItemText primary="検索した昆虫は見つかりません。" />
              </ListItem>
            ) : (
              searchResults.map((result: any, index: any) => (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <React.Fragment key={result.id}>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <ListItem
                    ref={selectedItemId === result.id ? topListItemRef : null}
                    onClick={() => handleListItem(result)}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                      backgroundColor:
                        selectedItemId === result.id ? "#f5f5f5" : "initial",
                    }}
                  >
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <ListItemText
                      primary={
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <>
                          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                          <Typography variant="body1" color="textPrimary">
                            {result.name}
                          </Typography>
                          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                          <Typography variant="body2" color="textPrimary">
                            {result.address}
                          </Typography>
                          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                          <Typography variant="body2" color="textSecondary">
                            投稿写真数：{result.image_count}枚
                          </Typography>
                          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                          <Typography variant="body2" color="textSecondary">
                            昆虫種類数：{result.insect_count}種類
                          </Typography>
                        </>
                      }
                    />
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <ListItemAvatar>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <img
                        src={result.image[0]}
                        alt="avatar"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "10%",
                        }}
                      />
                    </ListItemAvatar>
                  </ListItem>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  {index !== searchResults.length - 1 && <Divider />}
                </React.Fragment>
              ))
            )}
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Divider />
          </List>
        </Box>
      </Drawer>
    </Box>
  );
});

const SListItemText = styled(ListItemText)`
  color: red;
`;
