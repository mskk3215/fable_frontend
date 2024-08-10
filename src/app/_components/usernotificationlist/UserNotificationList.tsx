"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useInsectSightingNotifications } from "../../../hooks/useSightingNotifications";
import styled from "styled-components";
import { throttle } from "lodash";
import { SightingNotifications } from "../../../types/sightingnotifications";
import {
  Box,
  List,
  ListItem,
  Typography,
  Skeleton,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { SightingNotificationList } from "../SightingNotificationList";
import { UserNotificationModal } from "./UserNotificationModal";

export const UserNotificationList = () => {
  const {
    userSightingNotifications,
    isSightingNotificationInitialLoading,
    isSightingNotificationLoading,
    setSightingNotificationPage,
  } = useInsectSightingNotifications();

  // scrollで投稿を追加取得
  const handleSightingNotificationScroll = throttle(() => {
    if (
      window.innerHeight + window.pageYOffset >=
        document.documentElement.scrollHeight - 10 &&
      !isSightingNotificationLoading
    ) {
      setSightingNotificationPage((prevPage) => prevPage + 1);
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleSightingNotificationScroll);
    return () =>
      window.removeEventListener("scroll", handleSightingNotificationScroll);
  }, []);

  return (
    <>
      <Box sx={{ width: "98%", m: "auto", marginTop: "70px", maxWidth: 600 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          昆虫の出没情報一覧
        </Typography>
        <List>
          {isSightingNotificationInitialLoading
            ? Array.from(new Array(8)).map((_, index) => (
                <SkeltonStyledListItem key={index}>
                  <ListItemText
                    primary={<Skeleton variant="text" height={100} />}
                  />
                </SkeltonStyledListItem>
              ))
            : userSightingNotifications?.map(
                (notification: SightingNotifications, index) => (
                  <SightingNotificationList
                    key={index}
                    notification={notification}
                    index={index}
                  />
                )
              )}
        </List>
      </Box>
      {isSightingNotificationLoading &&
      !isSightingNotificationInitialLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "70px",
            marginTop: "16px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{ display: "flex", justifyContent: "center", height: "70px" }}
        ></Box>
      )}
    </>
  );
};

const SkeltonStyledListItem = styled(ListItem)({
  borderBottom: "1px solid #ddd",
  padding: "1px",
});
