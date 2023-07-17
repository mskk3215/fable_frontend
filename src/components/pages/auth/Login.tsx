import React, { useState } from "react";
// @ts-expect-error TS(6142): Module '../../../hooks/useLoginAuthAction' was res... Remove this comment to see the full error message
import { useLoginAuthAction } from "../../../hooks/useLoginAuthAction";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

export const Login = () => {
  const { handleLoginAction } = useLoginAuthAction();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleLogin = async (e: any) => {
    // バリデーション
    if (!email || !password) {
      // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'never'.
      setErrors(["入力されていない項目があります"]);
      return;
    }
    // ログイン認証
    handleLoginAction({
      email: email,
      password: password,
      setErrors: setErrors,
    });
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
            ログイン
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
          <Grid container spacing={2} sx={{ mt: 2 }}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Grid item xs={12}>
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
              />
            </Grid>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Grid item xs={12}>
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
              />
            </Grid>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Grid item xs={12}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Button
                id="login-button"
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleLogin}
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
