import React from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  ImageListItem,
  Box,
} from "@mui/material";
import { usePageSize } from "../../hooks/usePageSize";

export const Help = () => {
  const pageSize = usePageSize();

  return (
    <>
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <img
          src="/images/top0.png"
          alt="トップ画像"
          style={{ width: "100%", height: "75vh", objectFit: "cover" }}
        />
        <Typography
          variant="h4"
          color="primary"
          style={{
            position: "absolute",
            top: "50%",
            right: pageSize > 8 ? "20%" : "5%",
            transform: "translateY(-50%)",
            color: "white",
            textAlign: "center",
            padding: "15px",
            maxWidth: "40%",
            whiteSpace: "normal",
            wordWrap: "break-word",
            fontSize: pageSize > 8 ? "2rem" : "1rem",
          }}
        >
          新たな昆虫採集の地を見つけ、 <br />
          冒険の一歩を踏み出そう
        </Typography>
      </Box>
      <Container sx={{ my: 5, py: 2 }}>
        <Typography variant="h3" color="#2b3d51" gutterBottom>
          fabreの使い方
        </Typography>
        <Grid container spacing={2}>
          {/* 検索に関して */}
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ mt: { xs: 0, md: 10 }, px: { xs: 1 } }}
              order={{ xs: 2 }}
            >
              <Paper
                component="div"
                variant="outlined"
                sx={{ maxHeight: "300px", overflow: "hidden" }}
              >
                <ImageListItem>
                  <img src="/images/top1.png" alt="公園検索の画像" />
                </ImageListItem>
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ mt: { xs: 5, md: 10 }, px: { xs: 1 } }}
              order={{ xs: 1 }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textDecoration: "underline" }}
              >
                昆虫がいる場所を探そう！
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                昆虫の名前を入力して検索しましょう。 <br />
                昆虫がいる場所を地図上で確認し、道順を確認することができます。
              </Typography>
            </Grid>
          </Grid>
          {/* 投稿に関して */}
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ mt: { xs: 5, md: 10 }, px: { xs: 1 } }}
              order={{ xs: 1, md: 2 }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textDecoration: "underline" }}
              >
                見つけた昆虫を投稿しよう!
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                昆虫を見つけたら投稿しましょう。 <br />
                投稿した画像はマイページで見ることができます。 <br />
                また他のユーザーの投稿した画像、注目されている画像も見ることができます。
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ mt: { xs: 0, md: 10 }, px: { xs: 1 } }}
              order={{ xs: 2, md: 1 }}
            >
              <Paper
                component="div"
                variant="outlined"
                sx={{ maxHeight: "300px", overflow: "hidden" }}
              >
                <ImageListItem>
                  <img src="/images/top2.png" alt="画像投稿の画像" />
                </ImageListItem>
              </Paper>
            </Grid>
          </Grid>
          {/* 分析に関して */}
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ mt: { xs: 0, md: 10 }, px: { xs: 1 } }}
              order={{ xs: 2 }}
            >
              <Paper
                component="div"
                variant="outlined"
                sx={{ maxHeight: "300px", overflow: "hidden" }}
              >
                <ImageListItem>
                  <img src="/images/top3.png" alt="分析の画像" />
                </ImageListItem>
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ mt: { xs: 5, md: 10 }, px: { xs: 1 } }}
              order={{ xs: 1 }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textDecoration: "underline" }}
              >
                採集状況を確認しよう！
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                昆虫採集の状況を確認してみましょう。 <br />
                地域ごとの採集状況を確認することができます。
                <br />
                また他のユーザーと比較してどのくらい昆虫を見つけているかも確認することができます。
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};