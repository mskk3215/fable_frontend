import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { registrationUrl } from "../../../urls";
import { GuestLoginButton } from "../../atoms/button/GuestLoginButton";
import { UserContext } from "../../../providers/UserProvider";
import { useLoginAuthAction } from "../../../hooks/useLoginAuthAction";
import { Box, Button, TextField, Typography } from "@mui/material";

export const Registration = () => {
  const { handleSuccessfulAuthentication } = useContext(UserContext);
  const { handleLoginAction } = useLoginAuthAction();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
<<<<<<< HEAD

  const navigate = useNavigate();
<<<<<<< HEAD
  const handleRegistrationAction = (e) => {
=======
  const handleRegistrationAction = (e: any) => {
=======
  const [errors, setErrors] = useState<string[]>([]);

  const navigate = useNavigate();
  const handleRegistrationAction = (e: React.MouseEvent<HTMLButtonElement>) => {
>>>>>>> 8885765 (type definitions add to user-related components)
    // バリデーション
    if (!nickname || !email || !password || !passwordConfirmation) {
      setErrors(["入力されていない項目があります"]);
      return;
    }
    // ユーザー登録
>>>>>>> e985f6b (error output by ts-migrate)
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
<<<<<<< HEAD
=======
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
<<<<<<< HEAD
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
>>>>>>> e985f6b (error output by ts-migrate)
=======
>>>>>>> 8885765 (type definitions add to user-related components)
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
