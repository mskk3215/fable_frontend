import React, { useState } from "react";
import { useLoginAuthAction } from "../../../hooks/useLoginAuthAction";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

export const Login = () => {
  const { handleLoginAction } = useLoginAuthAction();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD

<<<<<<< HEAD
  const handleLogin = (e) => {
    handleLoginAction({ email: email, password: password });
=======
  const handleLogin = async (e: any) => {
=======
  const [errors, setErrors] = useState<string[]>([]);

  const handleLogin = async () => {
>>>>>>> 8885765 (type definitions add to user-related components)
    // バリデーション
    if (!email || !password) {
      setErrors(["入力されていない項目があります"]);
      return;
    }
    // ログイン認証
    handleLoginAction({
      email: email,
      password: password,
      setErrors: setErrors,
    });
>>>>>>> e985f6b (error output by ts-migrate)
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
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
