"use client";

import React, { memo, useCallback, useEffect } from "react";
import {
  createUserSightingNotification,
  deleteUserSightingNotification,
} from "../../urls";
import { Button, Skeleton } from "@mui/material";
import { SightingNotifications } from "../../types/sightingnotifications";

type Props = {
  insectId: number;
  insectNotificationSetting: SightingNotifications[];
  handleGetSightingNotifications: (
    insectId?: number,
    includeNotificationButton?: boolean
  ) => void;
  isNotificationLoading: boolean | undefined;
  isNotificationEnabled: boolean | undefined;
  setIsNotificationEnabled: (value: boolean) => void;
};

export const InsectNotificationButton = memo((props: Props) => {
  const {
    insectId,
    insectNotificationSetting,
    handleGetSightingNotifications,
    isNotificationLoading,
    isNotificationEnabled,
    setIsNotificationEnabled,
  } = props;

  // Buttonの状態を管理
  useEffect(() => {
    if (isNotificationLoading === undefined) return;
    console.log(insectNotificationSetting);
    const isInsectNotificationEnabled = insectNotificationSetting.some(
      (notification) => notification.insectId === Number(insectId)
    );
    setIsNotificationEnabled(isInsectNotificationEnabled);
  }, [insectId, insectNotificationSetting]);

  // 通知追加
  const handleNotificationAdd = useCallback(async () => {
    const response = await createUserSightingNotification(insectId);
    if (response.data.setNotification === true) {
      handleGetSightingNotifications(undefined, true);
      setIsNotificationEnabled(true);
    }
  }, [insectId, handleGetSightingNotifications]);

  // 通知削除
  const handleNotificationRemove = useCallback(async () => {
    const notification = insectNotificationSetting.find(
      (notification) => notification.insectId === Number(insectId)
    );
    if (notification) {
      const response = await deleteUserSightingNotification(notification.id);
      if (response.data.setNotification === false) {
        handleGetSightingNotifications(undefined, true);
        setIsNotificationEnabled(false);
      }
    }
  }, [insectId, insectNotificationSetting, handleGetSightingNotifications]);

  return (
    <>
      {isNotificationEnabled === undefined ? (
        <Skeleton variant="text" width={150} height={30} />
      ) : (
        <Button
          onClick={
            isNotificationEnabled
              ? handleNotificationRemove
              : handleNotificationAdd
          }
          variant={isNotificationEnabled ? "outlined" : "contained"}
          size="small"
          sx={{
            maxWidth: { xs: "75%", md: "100%" },
            backgroundColor: isNotificationEnabled ? "#ffffff" : "#2b3d51",
            color: isNotificationEnabled ? "#2b3d51" : "#ffffff",
            borderColor: isNotificationEnabled ? "#2b3d51" : undefined,
            "&:hover": {
              backgroundColor: isNotificationEnabled ? "#ffffff" : "#2b3d51",
              opacity: 0.7,
            },
            ml: 2,
          }}
        >
          {isNotificationEnabled ? "出没通知を停止する" : "出没通知を受け取る"}
        </Button>
      )}
    </>
  );
});
InsectNotificationButton.displayName = "InsectNotificationButton";
