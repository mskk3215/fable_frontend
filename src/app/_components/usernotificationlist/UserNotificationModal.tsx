"use client";

import React, { memo } from "react";
import { useRecoilValue } from "recoil";
import Link from "next/link";
import { sightingNotificationState } from "../../../store/atoms/notificationAtom";
import {
  Box,
  Button,
  ButtonBase,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { SightingNotifications } from "../../../types/sightingnotifications";
import { SightingNotificationSettingButton } from "../SightingNotificationSettingButton";

type Props = {
  userSightingNotifications?: SightingNotifications[];
  notificationOpen: boolean;
  handleNotificationModalOpen: () => void;
  handleNotificationModalClose: () => void;
};

export const UserNotificationModal = memo((props: Props) => {
  const {
    notificationOpen,
    handleNotificationModalOpen,
    handleNotificationModalClose,
  } = props;
  const sightingNotifications = useRecoilValue(sightingNotificationState);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          onClick={handleNotificationModalOpen}
          variant="contained"
          sx={{
            backgroundColor: "#2b3d51",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#2b3d51",
              opacity: 0.7,
            },
            mr: 1.5,
          }}
        >
          通知設定
        </Button>
        <Modal open={notificationOpen} onClose={handleNotificationModalClose}>
          <Box
            sx={{
              m: "auto",
              bgcolor: "background.paper",
              borderRadius: "10px",
              outline: "none",
              width: "90%",
              maxWidth: 400,
              marginTop: 10,
              position: "relative",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                p: 2,
                boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              通知設定一覧
            </Typography>
            <IconButton
              sx={{ position: "absolute", top: 14, right: 10 }}
              onClick={handleNotificationModalClose}
            >
              <Cancel />
            </IconButton>
            <Box sx={{ overflowY: "scroll", maxHeight: "70vh", p: 3 }}>
              <Stack spacing={3}>
                {sightingNotifications?.map((notification, index) => (
                  <React.Fragment key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ButtonBase
                          component={Link}
                          href={`/picturebook/${notification.insectId}`}
                        >
                          <Typography
                            sx={{
                              cursor: "pointer",
                              textDecoration: "none",
                              "&:hover": {
                                textDecoration: "underline",
                              },
                              marginRight: 1,
                              fontSize: {
                                xs: "14px",
                                md: "16px",
                              },
                            }}
                          >
                            {notification.insectName}
                          </Typography>
                        </ButtonBase>
                      </Box>
                      <SightingNotificationSettingButton
                        insectId={notification.insectId}
                      />
                      {/* <NotificationListButton
                        insectId={notification.insectId}
                      /> */}
                    </Box>
                  </React.Fragment>
                ))}
              </Stack>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
});
UserNotificationModal.displayName = "UserNotificationModal";
