"use client";

import React, { useState } from "react";
import { useAuthActions } from "../../../hooks/user/useAuthActions";
import { Box, Button, TextField, Typography } from "@mui/material";

export const Registration = () => {
  const { handleUserRegistrationAction } = useAuthActions();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegistrationAction = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    // バリデーション
    const inputFields = [
      {
        value: nickname,
        name: "名前",
      },
      {
        value: email,
        name: "メールアドレス",
      },
      {
        value: password,
        name: "パスワード",
      },
      {
        value: passwordConfirmation,
        name: "確認用パスワード",
      },
    ];
    const errorMessages = inputFields
      .filter((field) => !field.value)
      .map((field) => `${field.name}を入力してください`);
    if (errorMessages.length > 0) {
      setErrors(errorMessages);
      return;
    }
    if (password !== passwordConfirmation) {
      setErrors(["パスワードが一致しません"]);
      return;
    }

    // ユーザー登録
    handleUserRegistrationAction({
      nickname,
      email,
      password,
      passwordConfirmation,
      setErrors,
      setIsLoading,
    });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          marginTop: 10,
        }}
      >
        <Box
          sx={{
            p: 2,
            border: "1px solid gray",
            borderRadius: 4,
            maxWidth: 400,
            width: "100%",
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            新規登録
          </Typography>
          {errors &&
            errors.map((error, index) => (
              <Typography
                key={index}
                variant="body1"
                color="error"
                sx={{ marginTop: 2 }}
              >
                {error}
              </Typography>
            ))}
          <Box sx={{ width: "100%", maxWidth: "400px" }}>
            <TextField
              label="名前"
              variant="outlined"
              name="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              margin="normal"
              required
              fullWidth
            ></TextField>
            <TextField
              label="メールアドレス"
              variant="outlined"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              fullWidth
            ></TextField>
            <TextField
              label="パスワード"
              variant="outlined"
              name="password"
              type="password"
              placeholder="パスワードを入力してください"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              fullWidth
            ></TextField>
            <TextField
              label="確認用パスワード"
              variant="outlined"
              name="passwordConfirmation"
              type="password"
              placeholder="パスワードを再入力してください"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              margin="normal"
              required
              fullWidth
            ></TextField>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                mt: 2,
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleRegistrationAction}
                disabled={isLoading}
                sx={{
                  backgroundColor: "#2b3d51",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#2b3d51",
                    opacity: 0.7,
                  },
                }}
              >
                登録
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
