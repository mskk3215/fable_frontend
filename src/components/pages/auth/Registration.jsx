import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { registrationUrl } from "../../../urls";
import { GuestLoginButton } from "../../atoms/button/GuestLoginButton";
import { UserContext } from "../../../providers/UserProvider";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useLoginAuthAction } from "../../../hooks/useLoginAuthAction";

export const Registration = () => {
  const { handleSuccessfulAuthentication } = useContext(UserContext);
  const { handleLoginAction } = useLoginAuthAction();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();
  const handleRegistrationAction = (e) => {
    axios
      .post(
        registrationUrl,
        {
          nickname: nickname,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
        },
        //cookieを含める
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          handleSuccessfulAuthentication(response.data);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("registration error", error);
      });
    e.preventDefault();
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
                mt={2}
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
                  <GuestLoginButton
                    sx={{ width: "100%" }}
                    handleLoginAction={handleLoginAction}
                  />
                </Box>
                <Box sx={{ flexGrow: 1, flexBasis: 0 }}>
                  <Button
                    onClick={() => navigate("/login")}
                    color="secondary"
                    fullWidth
                    sx={{ width: "100%" }}
                    fontSize="1rem"
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
