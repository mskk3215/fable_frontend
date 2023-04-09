import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Header } from "../atoms/layout/Header";
import { SearchBox } from "../molcules/SearchBox";
import styled from "styled-components";
import { useState } from "react";
import { useContext } from "react";
import { SearchParkContext } from "../../providers/SearchParkProvider";

import { ListItemAvatar, Typography } from "@mui/material";
import React from "react";

const drawerWidth = 400;

export const MapDrawer = () => {
  const { searchResults } = useContext(SearchParkContext);
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const SearchBoxStyled = styled.div`
    position: absolute;
    top: 55px;
    left: 10px;
    z-index: 2;
  `;

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
        <SearchBox
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
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
      >
        <Toolbar style={{ height: "100px" }} />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {searchResults.map((result, index) => (
              <React.Fragment key={result.id}>
                <ListItem>
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
            ))}
            <Divider />
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};
