import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { registrationUrl } from "../../../urls";
// @ts-expect-error TS(6142): Module '../../atoms/button/GuestLoginButton' was r... Remove this comment to see the full error message
import { GuestLoginButton } from "../../atoms/button/GuestLoginButton";
// @ts-expect-error TS(6142): Module '../../../providers/UserProvider' was resol... Remove this comment to see the full error message
import { UserContext } from "../../../providers/UserProvider";
import { Box, Button, TextField, Typography } from "@mui/material";
// @ts-expect-error TS(6142): Module '../../../hooks/useLoginAuthAction' was res... Remove this comment to see the full error message
import { useLoginAuthAction } from "../../../hooks/useLoginAuthAction";

export const Registration = () => {
  // @ts-expect-error TS(2339): Property 'handleSuccessfulAuthentication' does not... Remove this comment to see the full error message
  const { handleSuccessfulAuthentication } = useContext(UserContext);
  const { handleLoginAction } = useLoginAuthAction();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const handleRegistrationAction = (e: any) => {
    // バリデーション
    if (!nickname || !email || !password || !passwordConfirmation) {
      // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'never'.
      setErrors(["入力されていない項目があります"]);
      return;
    }
    // ユーザー登録
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
        setErrors(error.response.data.errors);
      });
    e.preventDefault();
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          marginTop: 10,
        }}
      >
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Box
          sx={{
            p: 2,
            border: "1px solid gray",
            borderRadius: 4,
            maxWidth: 400,
            width: "100%",
          }}
        >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            新規登録
          </Typography>
          {errors &&
            errors.map((error, index) => (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Typography
                key={index}
                variant="body1"
                color="error"
                sx={{ marginTop: 2 }}
              >
                {error}
              </Typography>
            ))}
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Box sx={{ width: "100%", maxWidth: "400px" }}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                mt: 2,
              }}
            >
              // @ts-expect-error TS(2769): No overload matches this call.
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleRegistrationAction}
                mt={2}
              >
                登録
              </Button>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                  width: "100%",
                }}
              >
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Box sx={{ flexGrow: 1, flexBasis: 0, marginRight: 1 }}>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <GuestLoginButton
                    sx={{ width: "100%" }}
                    handleLoginAction={handleLoginAction}
                  />
                </Box>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Box sx={{ flexGrow: 1, flexBasis: 0 }}>
                  // @ts-expect-error TS(2769): No overload matches this call.
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
