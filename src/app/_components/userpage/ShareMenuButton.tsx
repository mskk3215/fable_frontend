"use client";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import {
  TwitterShareButton,
  LineShareButton,
  TwitterIcon,
  LineIcon,
} from "react-share";
import { usePathname } from "next/navigation";
import { loginUserState } from "../../../store/atoms/userAtom";
import { CopyToTheLink } from "./CopyToTheLink";
import { Box, Button, Menu, MenuItem, Tooltip } from "@mui/material";
import { Typography } from "@mui/material";
import { User } from "../../../types/user";

type Props = {
  profileInfo: User;
};
export const ShareMenuButton = (props: Props) => {
  const { profileInfo } = props;
  const pathname = usePathname();
  const loginUser = useRecoilValue(loginUserState);

  const determineUrl = () => {
    if (pathname === "/userpage") {
      return `https://fablesearch.com/userpage/${loginUser?.id}`;
    } else {
      return `https://fablesearch.com${pathname}`;
    }
  };
  const sharedUrl = determineUrl();

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        onClick={handleClick}
        sx={{
          position: "absolute",
          top: -10,
          right: -70,
          cursor: "pointer",
          textDecoration: "none",
          color: "black",
          fontSize: "16px",
          "&:hover": {
            backgroundColor: "transparent",
            textDecoration: "underline",
          },
        }}
      >
        共有
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <Tooltip title="Twitterでシェア" placement="right">
            <TwitterShareButton
              url={sharedUrl}
              title={`${profileInfo?.nickname}が採集した昆虫一覧`}
              hashtags={["昆虫採集", "fablesearch"]}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TwitterIcon size={30} />
                <Typography variant="body2">Twitterでシェア</Typography>
              </Box>
            </TwitterShareButton>
          </Tooltip>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Tooltip title="Lineでシェア" placement="right">
            <LineShareButton
              url={sharedUrl}
              title={`${profileInfo?.nickname}が採集した昆虫一覧`}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LineIcon size={30} />
                <Typography variant="body2">Lineでシェア</Typography>
              </Box>
            </LineShareButton>
          </Tooltip>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <CopyToTheLink url={sharedUrl} />
        </MenuItem>
      </Menu>
    </>
  );
};
