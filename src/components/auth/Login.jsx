import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUrl } from "../../urls";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

export const Login = (props) => {
  const { handleSuccessfulAuthentication } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    axios
      .post(
        loginUrl,
        {
          email: email,
          password: password,
        },
        //cookieを含める
        { withCredentials: true }
      )
      .then((response) => {
        console.log("login condition", response);
        if (response.data.logged_in) {
          handleSuccessfulAuthentication(response.data);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("login error", error);
      });
    event.preventDefault();
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
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
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <TextField
                  label="メールアドレス"
                  variant="outlined"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
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
                  onChange={(event) => setPassword(event.target.value)}
                  margin="normal"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="contained" type="submit">
                  ログイン
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </>
  );
};
