import React, { memo } from "react";
import { useContext, useEffect, useRef } from "react";
import { SearchParkContext } from "../../providers/SearchParkProvider";
import { Header } from "../atoms/layout/Header";
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

export const MapDrawer = memo((props) => {
  const {
    selectedItemId,
    setSelectedItemId,
    setSelectedCenter,
    setSwitchDrawer,
    setListItem,
    open,
    setOpen,
    anchor,
    drawerWidth,
    drawerHeight,
  } = props;
  const { searchResults } = useContext(SearchParkContext);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItem = (result) => {
    setSelectedItemId(result.id);
    setListItem(result);
    setSelectedCenter({ lat: result.latitude, lng: result.longitude });
  };

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
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
          setSwitchDrawer={setSwitchDrawer}
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
                <ListItemText primary="検索した昆虫は見つかりません。" />
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
