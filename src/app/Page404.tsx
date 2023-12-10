"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Container } from "@mui/material";

export const Page404 = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
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
};
