import Link from "next/link";
import styled from "styled-components";
import { useDestinationLocation } from "../../store/atoms/searchWordState";
import { formatDateTime } from "../_utils/datetimeUtils";
import { Box, ListItem, Typography } from "@mui/material";
import { SightingNotifications } from "../../types/sightingnotifications";

type Props = {
  notification: SightingNotifications;
  index: number;
  isPictureBookPage?: boolean;
};

export const SightingNotificationList = (props: Props) => {
  const { notification, index, isPictureBookPage } = props;
  const { saveDestinationLocation } = useDestinationLocation();

  return (
    <>
      <StyledListItem key={index}>
        <ItemWrapper>
          <Typography variant="body2" color="textSecondary">
            {notification.takenDateTime && (
              <>{formatDateTime(notification.takenDateTime)}</>
            )}
          </Typography>
          {!isPictureBookPage ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <SLink href={`/picturebook/${notification.insectId}`}>
                {notification.insectName}
              </SLink>
              <Typography
                variant="body1"
                color="textSecondary"
                component="span"
                style={{ marginRight: "4px", marginLeft: "4px" }}
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
      </StyledListItem>
    </>
  );
};

const StyledListItem = styled(ListItem)({
  borderBottom: "1px solid #ddd",
  padding: "8px",
});
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
