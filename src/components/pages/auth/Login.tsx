import React, { useState } from "react";
import { useAuthActions } from "../../../hooks/user/useAuthActions";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

export const Login = () => {
  const { handleLoginAction } = useAuthActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    // バリデーション
    const inputFields = [
      {
        value: email,
        name: "メールアドレス",
      },
      {
        value: password,
        name: "パスワード",
      },
    ];
    const errorMessages = inputFields
      .filter((field) => !field.value)
      .map((field) => `${field.name}を入力してください`);
    if (errorMessages.length > 0) {
      setErrors(errorMessages);
      return;
    }

    // ログイン認証
    handleLoginAction({
      email: email,
      password: password,
      setErrors: setErrors,
      setIsLoading: setIsLoading,
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
            ログイン
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
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
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
              />
            </Grid>
            <Grid item xs={12}>
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
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                id="login-button"
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleLogin}
                disabled={isLoading}
                sx={{
                  backgroundColor: "#2b3d51",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#d48a16",
                  },
                }}
              >
                ログイン
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
