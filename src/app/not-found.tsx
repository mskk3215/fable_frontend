"use client";

import React from "react";

import { Typography, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleBackHome = () => {
    router.push("/");
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h1"
        component="div"
        color="textSecondary"
        sx={{ fontWeight: "bold" }}
      >
        404
      </Typography>
      <Typography
        variant="subtitle1"
        component="div"
        color="textSecondary"
        sx={{ marginY: 2 }}
      >
        お探しのページは見つかりませんでした。
      </Typography>
      <Button
        onClick={handleBackHome}
        sx={{
          backgroundColor: "#2b3d51",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#2b3d51",
            opacity: 0.7,
          },
        }}
      >
        Topページへ戻る
      </Button>
    </Container>
  );
}
