"use client";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { throttle } from "lodash";
import { sightingNotificationState } from "../../../store/atoms/notificationAtom";
import { createHandleNotificationSetting } from "../../_utils/sightingnotificationUtils";
import { usePictureBook } from "../../../hooks/usePictureBooks";
import { useInsectSightingNotifications } from "../../../hooks/useSightingNotifications";
import { SearchBarInPictureBookList } from "./SearchBarInPictureBookList";
import { SightingNotificationSettingButton } from "../SightingNotificationSettingButton";
import { usePageSize } from "../../../hooks/usePageSize";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { Insect } from "../../../types/insects";

export const PictureBookList = () => {
  const {
    pictureBookList,
    isPictureBookListInitialLoading,
    isPictureBookListLoading,
    setPictureBookListPage,
    searchTerm,
    setSearchTerm,
    handleGetFilteredPictureBookList,
    handleGetPictureBookList,
  } = usePictureBook();
  const sightingNotifications = useRecoilValue(sightingNotificationState);
  const { handleGetSightingNotificationSettings } =
    useInsectSightingNotifications();
  const pageSize = usePageSize();

  const handleSearch = () => {
    if (searchTerm) {
      handleGetFilteredPictureBookList();
    } else {
      handleGetPictureBookList();
    }
  };

  // 通知ボタンのon/offの状態をサーバーへ送信する
  const handleNotificationSetting = createHandleNotificationSetting(
    sightingNotifications,
    handleGetSightingNotificationSettings
  );

  // scrollで投稿を追加取得
  const handlePictureBookListScroll = throttle(() => {
    if (
      window.innerHeight + window.pageYOffset >=
        document.documentElement.scrollHeight - 10 &&
      !isPictureBookListLoading
    ) {
      setPictureBookListPage((prevPage) => prevPage + 1);
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handlePictureBookListScroll);
    return () =>
      window.removeEventListener("scroll", handlePictureBookListScroll);
  }, []);

  return (
    <>
      {isPictureBookListInitialLoading ? (
        <Box sx={{ width: "98%", m: "auto", marginTop: "70px", maxWidth: 600 }}>
          <SearchBarInPictureBookList
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
          />
          {[...Array(6)].map((_, index) => (
            <ListItem
              key={index}
              sx={{ borderBottom: 1, borderColor: "divider", gap: 2 }}
            >
              <ListItemAvatar>
                <Skeleton
                  variant="rectangular"
                  width={100}
                  height={100}
                  style={{ borderRadius: "10%" }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={<Skeleton variant="text" width="100%" />}
              />
            </ListItem>
          ))}
        </Box>
      ) : (
        <Box sx={{ width: "98%", m: "auto", marginTop: "70px", maxWidth: 600 }}>
          <SearchBarInPictureBookList
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
          />
          <List>
            {pictureBookList.map((insect: Insect) => (
              <ListItem
                key={insect.insectId}
                sx={{ borderBottom: 1, borderColor: "divider", gap: 2 }}
              >
                <ListItemAvatar>
                  <Image
                    src={insect.insectImage}
                    alt={insect.insectName}
                    width={pageSize > 8 ? 100 : 80}
                    height={pageSize > 8 ? 100 : 80}
                    style={{ borderRadius: "10%" }}
                  />
                </ListItemAvatar>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingRight: "10px",
                  }}
                >
                  <Box
                    sx={{
                      paddingLeft: "5px",
                      fontSize: {
                        xs: "12px",
                        md: "16px",
                      },
                    }}
                  >
                    <SLink href={`/picturebook/${insect.insectId}`}>
                      {insect.insectName}
                    </SLink>
                  </Box>
                  <SightingNotificationSettingButton
                    insectId={insect.insectId}
                    handleNotificationSetting={handleNotificationSetting}
                    isPictureBookList={true}
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
      {isPictureBookListLoading && !isPictureBookListInitialLoading ? (
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

const SLink = styled(Link)({
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    textDecoration: "underline",
  },
});
