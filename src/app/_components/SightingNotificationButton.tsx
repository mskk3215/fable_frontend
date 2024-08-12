"use client";

import React, { memo } from "react";
import { useRecoilState } from "recoil";
import { notificationSettingState } from "../../store/atoms/notificationAtom";
import { Button } from "@mui/material";

type Props = {
  insectId: number;
  handleNotificationSetting?: (insectId: number) => void;
  isPictureBook?: boolean;
};

export const SightingNotificationButton = memo((props: Props) => {
  const { insectId, handleNotificationSetting, isPictureBook } = props;
  const [notificationSetting, setNotificationSetting] = useRecoilState(
    notificationSettingState
  );

  const handleNotificationButtonClick = async (insectId: number) => {
    setNotificationSetting((prev) => {
      return {
        ...prev,
        [insectId]: !prev[insectId],
      };
    });
    if (isPictureBook) {
      handleNotificationSetting && handleNotificationSetting(insectId);
    }
  };

  return (
    <>
      <Button
        onClick={() => handleNotificationButtonClick(insectId)}
        variant={notificationSetting[insectId] ? "outlined" : "contained"}
        size="small"
        sx={{
          maxWidth: { xs: "75%", md: "100%" },
          backgroundColor: notificationSetting[insectId]
            ? "#ffffff"
            : "#2b3d51",
          color: notificationSetting[insectId] ? "#2b3d51" : "#ffffff",
          borderColor: notificationSetting[insectId] ? "#2b3d51" : undefined,
          "&:hover": {
            backgroundColor: notificationSetting[insectId]
              ? "#ffffff"
              : "#2b3d51",
            opacity: 0.7,
          },
          ml: 2,
        }}
      >
        {notificationSetting[insectId]
          ? "出没通知を停止する"
          : "出没通知を受け取る"}
      </Button>
    </>
  );
});
SightingNotificationButton.displayName = "SightingNotificationButton";
