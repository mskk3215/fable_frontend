"use client";

import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { loginUserState } from "../../../store/atoms/userAtom";
import { LogoutButton } from "./LogoutButton";
import { useAuthCheck } from "../../../hooks/user/useAuthCheck";
import { useSessionTimeout } from "../../../hooks/user/useHandleSessionTimeout";
import styled from "styled-components";
import { GuestLoginButton } from "./GuestLoginButton";
import { usePageSize } from "../../../hooks/usePageSize";
import { SearchBarInHeader } from "./SearchBarInHeader";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

export const Header = () => {
  useAuthCheck();
  useSessionTimeout();

  const pathname = usePathname();
  const pageSize = usePageSize();
  const loginUser = useRecoilValue(loginUserState);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const shouldNotShowSearchBar =
    pathname !== "/map" && pathname !== "/direction";
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        backgroundColor: "#2b3d51",
        color: "#fff",
        zIndex: 100,
        height: "48px",
      }}
    >
      <Toolbar variant="dense">
        {pageSize > 8 ? (
          // 画面サイズが大きい場合
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <SiteNameText>
                <TopSLink href={loginUser === undefined ? "/" : "/postlist"}>
                  fablesearch
                </TopSLink>
              </SiteNameText>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {shouldNotShowSearchBar && <SearchBarInHeader />}
                {loginUser && (
                  <>
                    <SLink href="/uploadview">投稿</SLink>
                    <SLink href="/postlist">投稿一覧</SLink>
                    <SLink href="/statistics">分析</SLink>
                    <SLink href="/picturebooklist">図鑑</SLink>
                  </>
                )}
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              {loginUser === undefined ? (
                <>
                  <GuestLoginButton />
                  <SLink href="/registration">新規登録</SLink>
                  <SLink href="/login">ログイン</SLink>
                </>
              ) : (
                <>
                  <SLink href="/userpage">マイページ</SLink>
                  <LogoutButton />
                </>
              )}
            </Box>
          </Box>
        ) : (
          // 画面サイズが小さい場合、menuボタンを表示
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <SiteNameText>
                  <TopSLink href={loginUser === undefined ? "/" : "/postlist"}>
                    fablesearch
                  </TopSLink>
                </SiteNameText>
              </Box>
              <Box sx={{ display: "flex" }}>
                <IconButton onClick={handleClick}>
                  <MenuIcon sx={{ color: "white" }} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  sx={{
                    "& .MuiPaper-root": {
                      backgroundColor: "#2b3d51",
                    },
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <SLink href="/map">検索</SLink>
                  </MenuItem>
                  {loginUser && (
                    <Box>
                      <MenuItem onClick={handleClose}>
                        <SLink href="/uploadview">投稿</SLink>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <SLink href="/postlist">投稿一覧</SLink>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <SLink href="/statistics">分析</SLink>
                      </MenuItem>
                    </Box>
                  )}
                  {loginUser === undefined ? (
                    <Box>
                      <MenuItem onClick={handleClose}>
                        <GuestLoginButton />
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <SLink href="/registration">新規登録</SLink>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <SLink href="/login">ログイン</SLink>
                      </MenuItem>
                    </Box>
                  ) : (
                    <Box>
                      <MenuItem onClick={handleClose}>
                        <SLink href="/userpage">マイページ</SLink>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <LogoutButton />
                      </MenuItem>
                    </Box>
                  )}
                </Menu>
              </Box>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

const TopSLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  padding: 0px 12px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  padding: 0px 12px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const SiteNameText = styled.div`
  font-size: 25px;
  font-weight: bold;
  font-family: "Noto Serif", serif;
  font-style: italic;
`;
