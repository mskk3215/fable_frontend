"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthActions } from "../../../hooks/user/useAuthActions";
import { handleLogin } from "../../_utils/auth";
import { Button, Modal, Paper, TextField, Typography } from "@mui/material";

type Props = {
  loginAlertOpen: boolean;
  handleLoginAlertModalClose: () => void;
};
export const LoginAlertModal = (props: Props) => {
  const { loginAlertOpen, handleLoginAlertModalClose } = props;

  const { handleLoginAction } = useAuthActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onLoginClick = () => {
    handleLogin(email, password, setErrors, setIsLoading, handleLoginAction);
  };

  return (
    <>
      <Modal open={loginAlertOpen} onClose={handleLoginAlertModalClose}>
        <Paper sx={modalStyle}>
          <Typography sx={messageStyle}>
            閲覧するにはログインが必要です。
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
          <Button
            id="login-button"
            type="submit"
            fullWidth
            variant="contained"
            onClick={onLoginClick}
            disabled={isLoading}
            sx={{
              mt: 2,
              backgroundColor: "#2b3d51",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#2b3d51",
                opacity: 0.7,
              },
            }}
          >
            ログイン
          </Button>
          <Link href={"/registration"}>
            <Button sx={{ mt: 2, color: "#2b3d51" }}>新規登録はこちら</Button>
          </Link>
        </Paper>
      </Modal>
    </>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  bgcolor: "background.paper",
  border: "1px solid gray",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

const messageStyle = {
  mb: 2,
  pt: 1,
  pb: 1,
  color: "#333",
  bgcolor: "#f0f0f0",
  borderRadius: "4px",
  textAlign: "center",
  fontWeight: "normal",
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
};
