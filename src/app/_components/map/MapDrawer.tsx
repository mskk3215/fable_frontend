"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Image from "next/image";
import {
  selectedCenterState,
  selectedItemIdState,
  selectedItemNameState,
} from "../../../store/atoms/MapDirectionState";
import { Header } from "../headerfotter/Header";
import {
  destinationLocationState,
  searchWordState,
  useDestinationLocation,
} from "../../../store/atoms/searchWordState";
import { InsectSearchBox } from "./InsectSearchBox";
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
import { CircularProgress, ListItemAvatar, Typography } from "@mui/material";
import { Anchor } from "../../../types/map";
import { Park } from "../../../types/parks";

type Props = {
  anchor: Anchor;
  drawerWidth?: string | number;
  drawerHeight?: string | number;
  searchResults: Park[];
  isParksLoading: boolean;
  handleGetParkSearchResults: (searchWord: string) => void;
  insectOptions: string[];
  queryWord: string;
  setQueryWord: (queryWord: string) => void;
};

export const MapDrawer = memo((props: Props) => {
  const {
    anchor,
    drawerWidth,
    drawerHeight,
    searchResults,
    isParksLoading,
    handleGetParkSearchResults,
    insectOptions,
    queryWord,
    setQueryWord,
  } = props;
  const setSelectedCenter = useSetRecoilState(selectedCenterState);
  const destinationLocation = useRecoilValue(destinationLocationState);
  const { saveDestinationLocation } = useDestinationLocation();
  const [selectedItemId, setSelectedItemId] =
    useRecoilState(selectedItemIdState);
  const setSelectedItemName = useSetRecoilState(selectedItemNameState);
  const searchWord = useRecoilValue(searchWordState);
  const [open, setOpen] = useState(true);

  const handleListItem = (result: Park) => {
    setSelectedItemId(result.id);
    setSelectedItemName(result.name);
    setSelectedCenter({ lat: result.latitude, lng: result.longitude });
  };
  useEffect(() => {
    saveDestinationLocation(destinationLocation);
  }, [destinationLocation]);

  // 検索結果のリストの先頭にスクロールする
  const topListItemRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (selectedItemId && topListItemRef.current) {
      topListItemRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedItemId]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Header />
      </AppBar>
      {!isParksLoading && (
        <SearchBoxStyled>
          <InsectSearchBox
            setOpen={setOpen}
            selectedItemId={selectedItemId}
            setSelectedItemId={setSelectedItemId}
            handleGetParkSearchResults={handleGetParkSearchResults}
            insectOptions={insectOptions}
            queryWord={queryWord}
            setQueryWord={setQueryWord}
          />
        </SearchBoxStyled>
      )}
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
        {anchor === "left" ? <Toolbar style={{ height: "125px" }} /> : <></>}
        <Box sx={{ overflow: "auto", height: drawerHeight }}>
          <List>
            {isParksLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  mt: 2,
                }}
              >
                <CircularProgress />
              </Box>
            ) : searchWord && searchResults.length === 0 ? (
              <ListItem>
                <SListItemText primary="検索した昆虫は見つかりません。" />
              </ListItem>
            ) : (
              searchResults.map((result, index) => (
                <React.Fragment key={result.id}>
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
                    <ListItemText
                      primary={
                        <>
                          <Typography variant="body1" color="textPrimary">
                            {result.name}
                          </Typography>
                          <Typography variant="body2" color="textPrimary">
                            {result.address}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            投稿写真数：{result.imageCount}枚
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            昆虫種類数：{result.insectCount}種類
                          </Typography>
                        </>
                      }
                    />
                    <ListItemAvatar>
                      <Image
                        src={result.images[0]}
                        alt="公園にいる代表的な昆虫画像"
                        width={100}
                        height={100}
                        style={{
                          borderRadius: "10%",
                        }}
                      />
                    </ListItemAvatar>
                  </ListItem>
                  {index !== searchResults.length - 1 && <Divider />}
                </React.Fragment>
              ))
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
});
MapDrawer.displayName = "MapDrawer";

const SListItemText = styled(ListItemText)`
  color: red;
`;
const SearchBoxStyled = styled.div`
  position: absolute;
  top: 55px;
  left: 10px;
  z-index: 2;
`;
