import React from "react";
import { Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
      <Button variant="contained" color="primary" onClick={handleBackHome}>
        Topページへ戻る
      </Button>
    </Container>
  );
};
