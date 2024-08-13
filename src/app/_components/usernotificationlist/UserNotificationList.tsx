"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { throttle } from "lodash";
import { useInsectSightingNotifications } from "../../../hooks/useSightingNotifications";
import { SightingNotificationList } from "../SightingNotificationList";
import { UserNotificationModal } from "./UserNotificationModal";
import {
  notificationSettingState,
  sightingNotificationState,
} from "../../../store/atoms/notificationAtom";
import {
  Box,
  List,
  ListItem,
  Typography,
  Skeleton,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { SightingNotifications } from "../../../types/sightingnotifications";
import { deleteUserSightingNotificationSetting } from "../../../urls";

export const UserNotificationList = () => {
  const {
    userSightingNotifications,
    isSightingNotificationInitialLoading,
    isSightingNotificationLoading,
    setSightingNotificationPage,
    handleGetSightingNotificationSettings,
  } = useInsectSightingNotifications();
  const sightingNotifications = useRecoilValue(sightingNotificationState);
  const notificationSetting = useRecoilValue(notificationSettingState);

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

  const [notificationOpen, setNotificationOpen] = useState(false);

  // Modal open
  const handleNotificationModalOpen = useCallback(() => {
    setNotificationOpen(true);
  }, []);

  // Modal close
  const handleNotificationModalClose = useCallback(async () => {
    setNotificationOpen(false);
    // 通知設定の変更をサーバーに送信。notificationSettingでfalseになっているものだけを送信
    const deletePromises = sightingNotifications
      .filter(
        (notification: SightingNotifications) =>
          !notificationSetting[notification.insectId]
      )
      .map((notification) => {
        deleteUserSightingNotificationSetting(notification.id);
      });
    await Promise.all(deletePromises);
  }, [notificationSetting]);
    handleGetSightingNotificationSettings();

  return (
    <>
      <Box sx={{ width: "98%", m: "auto", marginTop: "70px", maxWidth: 600 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          昆虫の出没情報一覧
        </Typography>
        <UserNotificationModal
          userSightingNotifications={userSightingNotifications}
          notificationOpen={notificationOpen}
          handleNotificationModalOpen={handleNotificationModalOpen}
          handleNotificationModalClose={handleNotificationModalClose}
        />
        <List>
          {isSightingNotificationInitialLoading ? (
            Array.from(new Array(8)).map((_, index) => (
              <SkeltonStyledListItem key={index}>
                <ListItemText
                  primary={<Skeleton variant="text" height={100} />}
                />
              </SkeltonStyledListItem>
            ))
          ) : userSightingNotifications.length > 0 ? (
            userSightingNotifications.map(
              (notification: SightingNotifications, index) => (
                <SightingNotificationList
                  key={index}
                  notification={notification}
                  index={index}
                />
              )
            )
          ) : (
            <Box>
              <Typography color="error.main">通知がありません。</Typography>
              <Typography color="error.main">
                通知設定が無い場合、通知設定を追加してください
              </Typography>
            </Box>
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
