"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { throttle } from "lodash";
import {
  deleteUserSightingNotificationSetting,
  updateSightingNotifications,
} from "../../../urls";
import { useInsectSightingNotifications } from "../../../hooks/useSightingNotifications";
import { SightingNotificationList } from "../SightingNotificationList";
import { UserNotificationModal } from "./UserNotificationModal";
import { MarkAllAsReadButton } from "./MarkAllAsReadButton";
import {
  isNotificationIconState,
  notificationSettingState,
  sightingNotificationState,
} from "../../../store/atoms/notificationAtom";
import { Box, List, Typography, CircularProgress } from "@mui/material";
import { SightingNotifications } from "../../../types/sightingnotifications";
import { messageState } from "../../../store/atoms/errorAtom";
import { ApiError } from "../../../types/api";
import { useErrorAction } from "../../../hooks/error/useErrorAction";

export const UserNotificationList = () => {
  const {
    userSightingNotifications,
    isSightingNotificationLoading,
    setSightingNotificationPage,
    handleGetSightingNotifications,
    handleGetSightingNotificationSettings,
    isSightingNotificationInitialLoading,
  } = useInsectSightingNotifications();
  const sightingNotifications = useRecoilValue(sightingNotificationState);
  const notificationSetting = useRecoilValue(notificationSettingState);
  const setIsNotificationIcon = useSetRecoilState(isNotificationIconState);
  const setMessage = useSetRecoilState(messageState);
  const { handleGeneralErrorAction } = useErrorAction();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  // Modal open/close
  const [notificationOpen, setNotificationOpen] = useState(false);
  const handleNotificationModalOpen = useCallback(() => {
    setNotificationOpen(true);
  }, []);

  const handleNotificationModalClose = useCallback(async () => {
    // 通知設定の変更をサーバーに送信。notificationSettingでfalseになっているものだけを送信
    const deletePromises = sightingNotifications
      .filter(
        (notification: SightingNotifications) =>
          !notificationSetting[notification.insectId]
      )
      .map((notification) => {
        return deleteUserSightingNotificationSetting(notification.id);
      });
    await Promise.all(deletePromises);
    handleGetSightingNotificationSettings();
    setNotificationOpen(false);
  }, [sightingNotifications, notificationSetting]);

  // 全て既読にする
  const handleMarkAllAsRead = useCallback(async () => {
    await updateSightingNotifications()
      .then((response) => {
        if (response.data.status === "updated") {
          setIsNotificationIcon(false);
        }
        setMessage({ message: "全て既読にしました", type: "success" });
      })
      .catch((error: ApiError) => handleGeneralErrorAction(error, setMessage))
      .finally(() => {
        setIsLoading(false);
      });
  }, [userSightingNotifications]);

  // 通知リスト取得
  useEffect(() => {
    handleGetSightingNotifications();
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "98%",
          m: "auto",
          marginTop: "70px",
          maxWidth: 600,
          padding: "2px",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, ml: 2 }}>
          昆虫の出没情報一覧
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <MarkAllAsReadButton
            handleMarkAllAsRead={handleMarkAllAsRead}
            isLoading={isLoading}
          />
          <UserNotificationModal
            notificationOpen={notificationOpen}
            handleNotificationModalOpen={handleNotificationModalOpen}
            handleNotificationModalClose={handleNotificationModalClose}
          />
        </Box>
        <List>
          {isSightingNotificationInitialLoading === false &&
            (userSightingNotifications.length > 0 ? (
              userSightingNotifications.map(
                (notification: SightingNotifications, index) => (
                  <SightingNotificationList
                    key={index}
                    notification={notification}
                    index={index}
                    isUserNotificationPage={true}
                  />
                )
              )
            ) : (
              <Box
                sx={{
                  fontSize: {
                    xs: "12px",
                    md: "16px",
                  },
                }}
              >
                <Typography color="error.main">通知がありません。</Typography>
                <Typography color="error.main">
                  通知設定が無い場合、通知設定を追加してください。
                </Typography>
              </Box>
            ))}
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
