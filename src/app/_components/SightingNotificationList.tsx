import { Box, ListItem, Typography } from "@mui/material";
import Link from "next/link";
import styled from "styled-components";

import { SightingNotifications } from "../../types/sightingnotifications";
import {
  useDestinationLocation,
  useSearchWord,
} from "../../store/atoms/searchWordState";
import { formatDateTime } from "../_utils/datetimeUtils";

type Props = {
  notification: SightingNotifications;
  index: number;
  isPictureBookPage?: boolean;
};

export const SightingNotificationList = (props: Props) => {
  const { notification, index, isPictureBookPage } = props;
  const { saveSearchWord } = useSearchWord();
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
          {!isPictureBookPage && (
            <SLink
              href={`/map`}
              onClick={() => {
                if (notification.insectName) {
                  saveSearchWord(notification.insectName);
                }
              }}
            >
              {notification.insectName}
            </SLink>
          )}
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
