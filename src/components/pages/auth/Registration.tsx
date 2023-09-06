import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../urls";
import { GuestLoginButton } from "../../atoms/button/GuestLoginButton";
import { useLoginAuthAction } from "../../../hooks/useLoginAuthAction";
import { useUsers } from "../../../hooks/useUsers";
import { Box, Button, TextField, Typography } from "@mui/material";

export const Registration = () => {
  const { handleSuccessfulAuthentication } = useUsers();

  const { handleLoginAction } = useLoginAuthAction();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleRegistrationAction = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    // バリデーション
    if (!nickname || !email || !password || !passwordConfirmation) {
      setErrors(["入力されていない項目があります"]);
      return;
    }
    // ユーザー登録
    createUser({
      user: {
        nickname: nickname,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      },
    })
      .then((response) => {
        if (response.data.registered) {
          handleSuccessfulAuthentication(response.data);
          navigate("/");
        }
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
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
              name="password_confirmation"
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
              >
                登録
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                  width: "100%",
                }}
              >
                <Box sx={{ flexGrow: 1, flexBasis: 0, marginRight: 1 }}>
                  <GuestLoginButton handleLoginAction={handleLoginAction} />
                </Box>
                <Box sx={{ flexGrow: 1, flexBasis: 0 }}>
                  <Button
                    onClick={() => navigate("/login")}
                    color="secondary"
                    fullWidth
                    sx={{ width: "100%" }}
                  >
                    ログイン
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
