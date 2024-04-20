"use client";

import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../../store/atoms/userAtom";
import { useProfileChangeAction } from "../../../hooks/user/useProfileChangeAction";
import { Button, Modal, Paper, Stack, TextField } from "@mui/material";
import { UserPasswordForm } from "../../../types/user";

type Props = {
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUploadProfileProgress: React.Dispatch<React.SetStateAction<number>>;
  passwordChangeOpen: boolean;
  handleModalClose: () => void;
};

export const PasswordChangeModal = (props: Props) => {
  const {
    setErrors,
    setIsLoading,
    setUploadProfileProgress,
    passwordChangeOpen,
    handleModalClose,
  } = props;
  const { handleProfileChangeAction } = useProfileChangeAction();
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);

  const [passwordValues, setPasswordValues] = useState<UserPasswordForm>({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordError, setPasswordError] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  // プロフィール編集の処理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordValues({ ...passwordValues, [name]: value });
  };

  // サーバーに送信
  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleValidation()) {
      handleModalClose();
      const passwordData = new FormData();
      if (loginUser === undefined) return;

      passwordData.append("user[password]", passwordValues.password);
      passwordData.append("user[newPassword]", passwordValues.newPassword);

      // パスワード変更の処理
      handleProfileChangeAction({
        loginUser,
        setLoginUser,
        profileData: passwordData,
        setErrors,
        isPasswordChange: true,
        setIsLoading: setIsLoading,
        setUploadProfileProgress: setUploadProfileProgress,
      });
    }
  };

  // パスワードバリデーション
  const handleValidation = () => {
    setPasswordError("");
    setConfirmPasswordError("");
    if (passwordValues.password.length < 6) {
      setPasswordError("現在のパスワードは6文字以上である必要があります。");
      return;
    }
    if (passwordValues.newPassword.length < 6) {
      setNewPasswordError("新しいパスワードは6文字以上である必要があります。");
      return;
    }
    if (passwordValues.confirmNewPassword.length < 6) {
      setConfirmPasswordError(
        "新しいパスワード（確認）は6文字以上である必要があります。"
      );
      return;
    }
    if (passwordValues.password === passwordValues.newPassword) {
      setNewPasswordError("現在のパスワードと新しいパスワードが同じです。");
      return;
    }
    if (passwordValues.newPassword !== passwordValues.confirmNewPassword) {
      setConfirmPasswordError("パスワードが一致しません。");
      return;
    }
    return true;
  };

  return (
    <>
      <Modal open={passwordChangeOpen} onClose={handleModalClose}>
        <Paper sx={modalStyle}>
          <form onSubmit={handlePasswordSubmit}>
            <Stack spacing={3}>
              <TextField
                error={!!passwordError}
                helperText={passwordError}
                name="password"
                type="password"
                label="現在のパスワード"
                value={passwordValues.password}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                error={!!newPasswordError}
                helperText={newPasswordError}
                name="newPassword"
                type="password"
                label="新しいパスワード"
                value={passwordValues.newPassword}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                name="confirmNewPassword"
                type="password"
                label="新しいパスワード(確認)"
                value={passwordValues.confirmNewPassword}
                onChange={handleInputChange}
                fullWidth
              />
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  backgroundColor: "#2b3d51",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#2b3d51",
                    opacity: 0.7,
                  },
                }}
              >
                変更する
              </Button>
            </Stack>
          </form>
        </Paper>
      </Modal>
    </>
  );
};

const modalStyle = {
  position: "absolute",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  bgcolor: "background.paper",
  border: "1px solid gray",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};
