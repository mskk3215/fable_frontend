"use client";

import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Link from "next/link";
import styled from "styled-components";
import { sightingNotificationState } from "../../../store/atoms/notificationAtom";
import { useSearchWord } from "../../../store/atoms/searchWordState";
import { createHandleNotificationSetting } from "../../_utils/sightingnotificationUtils";
import { usePageSize } from "../../../hooks/usePageSize";
import { ActiveMonthChart } from "./ActiveMonthChart";
import { ActiveHourChart } from "./ActiveHourChart";
import { usePictureBook } from "../../../hooks/usePictureBooks";
import { useInsectSightingNotifications } from "../../../hooks/useSightingNotifications";
import { SightingNotificationList } from "../SightingNotificationList";
import { SightingNotificationSettingButton } from "../SightingNotificationSettingButton";
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Grid,
  Skeleton,
} from "@mui/material";

type Props = {
  insectId: number;
};

export const PictureBook = (props: Props) => {
  const { insectId } = props;
  const sightingNotifications = useRecoilValue(sightingNotificationState);
  const { pictureBookInfo } = usePictureBook(insectId);
  const {
    pictureBookSightingInsectNotifications, // picturebook下部の昆虫の通知情報一覧
    handleGetSightingNotificationSettings,
    isSightingNotificationInitialLoading,
    isNotificationLoading,
  } = useInsectSightingNotifications(insectId);
  const { saveSearchWord } = useSearchWord();
  const pageSize = usePageSize();

  // 画像の順序をいいね順に並び替える
  const sortedImages = pictureBookInfo?.collectedInsectImages
    .slice()
    .sort((a, b) => {
      return b.likesCount - a.likesCount;
    });

  // 通知ボタンのSkeleton表示を一度だけ行う
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  useEffect(() => {
    if (isNotificationLoading === false && !hasLoadedOnce) {
      setHasLoadedOnce(true);
    }
  }, [isNotificationLoading]);

  // // 通知ボタンのon/offの状態をサーバーへ送信する
  const handleNotificationSetting = createHandleNotificationSetting(
    sightingNotifications,
    handleGetSightingNotificationSettings
  );

  return (
    <>
      <Container maxWidth="md">
        <Box sx={{ mt: 7 }}>
          {pictureBookInfo ? (
            <Typography variant="h4" component="h1" gutterBottom>
              {pictureBookInfo?.name}
            </Typography>
          ) : (
            <Typography variant="h4" component="h1" gutterBottom>
              Loading...
            </Typography>
          )}
          <Box display="flex" alignItems="center" gap="20px">
            {pictureBookInfo && !isSightingNotificationInitialLoading ? (
              <Typography variant="body1" color="text.secondary">
                {pictureBookInfo?.isCollected ? (
                  <span style={{ color: "green" }}>✔️採集済</span>
                ) : (
                  <span style={{ color: "red" }}>❌未採集</span>
                )}
              </Typography>
            ) : (
              <Skeleton variant="text" width={68} height={30} />
            )}
            {!hasLoadedOnce ? (
              <Skeleton variant="text" width={150} height={30} />
            ) : (
              <SightingNotificationSettingButton
                insectId={insectId}
                handleNotificationSetting={handleNotificationSetting}
                isPictureBook={true}
              />
            )}
          </Box>
          <Typography variant="body1" mt={1}>
            写真数：{pictureBookInfo?.imageCount} 枚
          </Typography>
          {/* 画像表示 */}
          {pictureBookInfo ? (
            <Box sx={{ my: 2 }}>
              <Paper
                variant="outlined"
                sx={{ p: 0, backgroundColor: "#F2F2F2", borderRadius: "10px" }}
              >
                <Grid container>
                  {/* 左半分 */}
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        height: 300,
                        backgroundImage: `url(${sortedImages?.[0].url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderTopLeftRadius: "10px",
                        borderBottomLeftRadius: "10px",
                      }}
                    />
                  </Grid>
                  {/* 右半分 */}
                  <Grid item xs={12} sm={6}>
                    <Grid container>
                      {sortedImages?.slice(1, 5).map((image, index) => (
                        <Grid item xs={6} key={index}>
                          <Box
                            sx={{
                              height: 150,
                              backgroundImage: `url(${image.url})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              borderTopRightRadius: index === 1 ? "10px" : 0,
                              borderBottomRightRadius: index === 3 ? "10px" : 0,
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          ) : (
            <Box sx={{ my: 2 }}>
              <Paper variant="outlined" sx={{ p: 0 }}>
                <Grid container>
                  {/* 左半分 */}
                  <Grid item xs={12} sm={6}>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={300}
                      sx={{ borderRadius: "10px 0 0 10px" }}
                    />
                  </Grid>
                  {/* 右半分 */}
                  <Grid item xs={12} sm={6}>
                    <Grid container>
                      {[...Array(4)].map((_, index) => (
                        <Grid item xs={6} key={index}>
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={150}
                            sx={{
                              borderRadius: `${index === 1 ? "10px" : "0"} ${
                                index === 3 ? "10px" : "0"
                              }`,
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          )}
          <Box sx={{ my: 2 }}>
            <Typography variant="h6" gutterBottom>
              特徴
            </Typography>
            <List disablePadding>
              {/* 分類 */}
              <ListItem sx={{ display: "block" }}>
                <ListItemText primary="分類" />
                <Typography variant="body1" ml={2}>
                  {pictureBookInfo?.biologicalFamily}
                </Typography>
              </ListItem>
              {/* サイズ */}
              <ListItem sx={{ display: "block" }}>
                <ListItemText primary="サイズ" />
                <Typography variant="body1" ml={2}>
                  {pictureBookInfo?.size}
                </Typography>
              </ListItem>
              {/* 寿命 */}
              <ListItem sx={{ display: "block" }}>
                <ListItemText primary="寿命" />
                <Typography variant="body1" ml={2}>
                  {pictureBookInfo?.lifespan}
                </Typography>
              </ListItem>
              {/* 食事 */}
              <ListItem sx={{ display: "block" }}>
                <ListItemText primary="食事" />
                <Typography variant="body1" ml={2}>
                  {pictureBookInfo?.foods.map((food) => food).join("、")}
                </Typography>
              </ListItem>
              {/* 生息環境 */}
              <ListItem sx={{ display: "block" }}>
                <ListItemText primary="生息環境" />
                <Typography variant="body1" ml={2}>
                  {pictureBookInfo?.habitatPlace}
                </Typography>
              </ListItem>
              {/* 主な出没先 */}
              <ListItem sx={{ display: "block" }}>
                <ListItemText primary="主な出没先" />
                <Typography variant="body1" ml={2} color="primary">
                  <SLink
                    href={`/map`}
                    onClick={() => {
                      if (pictureBookInfo?.name) {
                        saveSearchWord(pictureBookInfo?.name);
                      }
                    }}
                  >
                    Mapで見る
                  </SLink>
                </Typography>
              </ListItem>
              {/* 必要な道具 */}
              <ListItem sx={{ display: "block" }}>
                <ListItemText primary="採集に必要な道具" />
                <Typography variant="body1" ml={2}>
                  {pictureBookInfo?.tools.map((tool) => tool).join("、")}
                </Typography>
              </ListItem>
            </List>
            {/* 活動月 */}
            <Typography variant="h6" gutterBottom>
              月毎の累計投稿枚数
            </Typography>
            <ActiveMonthChart
              pictureBookInfo={pictureBookInfo && pictureBookInfo}
              pageSize={pageSize}
            />
            {/* 活動時間 */}
            <Typography variant="h6" gutterBottom>
              時間帯毎の累計投稿枚数
            </Typography>
            <ActiveHourChart
              pictureBookInfo={pictureBookInfo && pictureBookInfo}
              pageSize={pageSize}
            />
            <Typography variant="h6" gutterBottom>
              最近の出没先
            </Typography>
            {pictureBookSightingInsectNotifications?.map(
              (notification, index) => (
                <SightingNotificationList
                  key={index}
                  notification={notification}
                  index={index}
                  isPictureBookPage={true}
                />
              )
            )}
          </Box>
        </Box>
      </Container>
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
