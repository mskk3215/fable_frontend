import React, { useState, useContext, useEffect, useRef, memo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SearchParkContext } from "../../providers/SearchParkProvider";
import {
  selectedCenterState,
  selectedItemState,
} from "../../store/atoms/MapDirectionState";
import { Header } from "../atoms/layout/Header";
import {
  destinationLocationState,
  saveDestinationLocation,
} from "../../store/atoms/searchWordState";
import { InsectSearchBox } from "../molecules/InsectSearchBox";
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
import { Anchor } from "../../types/map";
import { Park } from "../../types/parks";

type Props = {
  anchor: Anchor;
  drawerWidth: string | number;
  drawerHeight: string | number;
};

export const MapDrawer = memo((props: Props) => {
  const { anchor, drawerWidth, drawerHeight } = props;
  const { searchResults } = useContext(SearchParkContext);
  const setSelectedCenter = useSetRecoilState(selectedCenterState);
  const [destinationLocation, setDestinationLocation] = useRecoilState(
    destinationLocationState
  );
  const [selectedItemId, setSelectedItemId] = useRecoilState(selectedItemState);
  const [open, setOpen] = useState(true);

  const handleListItem = (result: Park) => {
    setSelectedItemId(result.id);
    setDestinationLocation(result.name);
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
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Header />
      </AppBar>
      <SearchBoxStyled>
        <InsectSearchBox
          setOpen={setOpen}
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
        />
      </SearchBoxStyled>
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
        {anchor === "left" ? <Toolbar style={{ height: "110px" }} /> : <></>}
        <Box sx={{ overflow: "auto", height: drawerHeight }}>
          <List>
            {searchResults.length === 0 ? (
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
                            投稿写真数：{result.image_count}枚
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            昆虫種類数：{result.insect_count}種類
                          </Typography>
                        </>
                      }
                    />
                    <ListItemAvatar>
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
                  {index !== searchResults.length - 1 && <Divider />}
                </React.Fragment>
              ))
            )}
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
const SearchBoxStyled = styled.div`
  position: absolute;
  top: 55px;
  left: 10px;
  z-index: 2;
`;
