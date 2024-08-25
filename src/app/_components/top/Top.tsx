import React from "react";
import Image from "next/image";
import { Container, Grid, Typography, Paper, Box } from "@mui/material";

export default function Top() {
  return (
    <>
      <Box sx={{ width: "100%", height: "75vh", position: "relative" }}>
        <Image
          src="/images/top0.png"
          alt="fablre insect searchのトップページの画像"
          layout="fill"
          objectFit="cover"
        />
        <Typography
          variant="h4"
          color="primary"
          sx={{
            position: "absolute",
            top: "50%",
            right: { xs: "5%", md: "10%", xl: "15%" },
            transform: "translateY(-50%)",
            color: "white",
            textAlign: "center",
            padding: "15px",
            maxWidth: "40%",
            whiteSpace: "normal",
            wordWrap: "break-word",
            fontSize: { xs: "1rem", sm: "1.5rem", xl: "2rem" },
          }}
        >
          新たな昆虫採集の地を見つけ、 <br />
          冒険の一歩を踏み出そう
        </Typography>
      </Box>
      <Container sx={{ my: 5, py: 2 }}>
        <Typography variant="h3" color="#2b3d51" gutterBottom>
          fablesearchの使い方
        </Typography>
        <Grid container spacing={2}>
          {/* 場所・ルート検索に関して */}
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
                sx={{ width: "100%", height: "35vh", position: "relative" }}
              >
                <Image
                  src="/images/top1.png"
                  alt="公園検索の画像"
                  layout="fill"
                />
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
          {/* 投稿と通知に関して */}
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
                見つけた昆虫を投稿しよう！
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                昆虫を見つけたら投稿しましょう。 <br />
                また誰かが昆虫を発見し投稿したとき、通知を受け取ることができます。
                <br />
                興味のある昆虫の最新情報を逃さずキャッチしましょう。
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
                sx={{ width: "100%", height: "35vh", position: "relative" }}
              >
                <Image
                  src="/images/top2.png"
                  alt="画像投稿の画像"
                  layout="fill"
                />
              </Paper>
            </Grid>
          </Grid>
          {/* 分析と図鑑に関して */}
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
                sx={{ width: "100%", height: "35vh", position: "relative" }}
              >
                <Image src="/images/top3.png" alt="分析の画像" layout="fill" />
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
                地域の昆虫について、もっと詳しく知ろう！
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                分析機能で採集状況を確認して他のユーザーと比較しましょう。
                <br />
                図鑑機能で特定の昆虫の特徴や生息地について詳しく調べることができます。
                <br />
                これらの機能を活用して知識を深め、実際の採集活動に役立てていきましょう。
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
