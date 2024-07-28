"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { useSearchWord } from "../../../store/atoms/searchWordState";
import { ActiveMonthChart } from "./ActiveMonthChart";
import { ActiveHourChart } from "./ActiveHourChart";
import { usePictureBook } from "../../../hooks/usePictureBooks";
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Grid,
  Chip,
  Skeleton,
} from "@mui/material";

type Props = {
  insectId: number;
};

export const PictureBook = (props: Props) => {
  const { insectId } = props;
  const { pictureBookInfo } = usePictureBook(insectId);
  const { saveSearchWord } = useSearchWord();

  // 画像の順序をいいね順に並び替える
  const sortedImages = pictureBookInfo?.collectedInsectImages
    .slice()
    .sort((a, b) => {
      return b.likesCount - a.likesCount;
    });

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
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color="text.secondary">
              {pictureBookInfo?.isCollected ? (
                <span style={{ color: "green" }}>✔️採集済</span>
              ) : (
                <span style={{ color: "red" }}>❌未採集</span>
              )}
            </Typography>
            <Chip label="通知に追加" sx={{ ml: 1 }} color="primary" />
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
                <Grid container spacing={0.5}>
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
                    <Grid container spacing={0.5}>
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
                <Grid container spacing={0.5}>
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
                    <Grid container spacing={0.5}>
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
            />
            {/* 活動時間 */}
            <Typography variant="h6" gutterBottom>
              時間帯毎の累計投稿枚数
            </Typography>
            <ActiveHourChart
              pictureBookInfo={pictureBookInfo && pictureBookInfo}
            />
            <Typography variant="h6" gutterBottom>
              最近の出没先
            </Typography>
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
