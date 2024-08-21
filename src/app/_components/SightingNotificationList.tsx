import Link from "next/link";
import styled from "styled-components";
import { useDestinationLocation } from "../../store/atoms/searchWordState";
import { formatDateTime } from "../_utils/datetimeUtils";
import { Box, Typography } from "@mui/material";
import { SightingNotifications } from "../../types/sightingnotifications";
import { useRecoilValue } from "recoil";
import { isNotificationIconState } from "../../store/atoms/notificationAtom";

type Props = {
  notification: SightingNotifications;
  index: number;
  isPictureBookPage?: boolean;
  isUserNotificationPage?: boolean;
};

export const SightingNotificationList = (props: Props) => {
  const { notification, index, isPictureBookPage, isUserNotificationPage } =
    props;
  const { saveDestinationLocation } = useDestinationLocation();
  const isNotificationIcon = useRecoilValue(isNotificationIconState);

  return (
    <>
      <Box
        key={index}
        sx={{
          borderBottom: "1px solid #ddd",
          padding: "8px",
          backgroundColor: isUserNotificationPage
            ? !notification?.isRead && isNotificationIcon
              ? "#66cdaa"
              : "transparent"
            : "transparent",
        }}
      >
        <ItemWrapper>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Typography variant="body2" color="textSecondary">
              {notification.takenDateTime && (
                <>{formatDateTime(notification.takenDateTime)}</>
              )}
            </Typography>
            {isUserNotificationPage &&
              !notification?.isRead &&
              isNotificationIcon && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ paddingLeft: "8px" }}
                >
                  未読
                </Typography>
              )}
          </Box>
          {!isPictureBookPage ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                fontSize: {
                  xs: "12px",
                  md: "16px",
                },
              }}
            >
              <SLink href={`/picturebook/${notification.insectId}`}>
                {notification.insectName}
              </SLink>
              <Typography
                color="textSecondary"
                component="span"
                style={{
                  marginRight: "4px",
                  marginLeft: "4px",
                }}
                sx={{ fontSize: { xs: "12px", md: "16px" } }}
              >
                {" "}
                が{" "}
              </Typography>
              <SLink
                href={`/direction`}
                onClick={() => {
                  if (notification.parkName) {
                    saveDestinationLocation(notification.parkName);
                  }
                }}
              >
                {notification.parkName}
              </SLink>
              <Typography
                variant="body1"
                color="textSecondary"
                component="span"
                style={{ marginRight: "4px", marginLeft: "4px" }}
                sx={{ fontSize: { xs: "12px", md: "16px" } }}
              >
                {" "}
                に出没しました。
              </Typography>
            </Box>
          ) : (
            <SLink
              href={`/direction`}
              onClick={() => {
                if (notification.parkName) {
                  saveDestinationLocation(notification.parkName);
                }
              }}
            >
              {notification.parkName}
            </SLink>
          )}
        </ItemWrapper>
      </Box>
    </>
  );
};

const ItemWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

const SLink = styled(Link)({
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    textDecoration: "underline",
  },
});
