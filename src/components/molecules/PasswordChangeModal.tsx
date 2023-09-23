import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../store/atoms/userAtom";
import { useProfileChangeAction } from "../../hooks/user/useProfileChangeAction";
import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import { UserPasswordForm } from "../../types/user";

type Props = {
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUploadProfileProgress: React.Dispatch<React.SetStateAction<number>>;
};

export const PasswordChangeModal = (props: Props) => {
  const { setErrors, setIsLoading, setUploadProfileProgress } = props;
  const { handleProfileChangeAction } = useProfileChangeAction();
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);

  const [passwordValues, setPasswordValues] = useState<UserPasswordForm>({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [open, setOpen] = useState(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  // プロフィール編集の処理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordValues({ ...passwordValues, [name]: value });
  };
  // パスワード変更モーダルの処理
  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };

  // サーバーに送信
  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleValidation()) {
      handleModalClose();
      const passwordData = new FormData();
      if (loginUser === null) return;

      passwordData.append("user[password]", passwordValues.password);
      passwordData.append("user[new_password]", passwordValues.newPassword);

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
      setNewPasswordError("現在のパスワードと新しいパスワードが同じです");
      return;
    }
    if (passwordValues.newPassword !== passwordValues.confirmNewPassword) {
      setConfirmPasswordError("パスワードが一致しません");
      return;
    }
    return true;
  };

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 400, m: "auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button variant="outlined" onClick={handleModalOpen} fullWidth>
            パスワード変更
          </Button>
          <Modal open={open} onClose={handleModalClose}>
            <form onSubmit={handlePasswordSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                  m: "auto",
                  bgcolor: "background.paper",
                  borderRadius: "10px",
                  width: "90%",
                  maxWidth: 400,
                  marginTop: 10,
                }}
              >
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
                    label="新しいパスワード（確認）"
                    value={passwordValues.confirmNewPassword}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    fullWidth
                  >
                    変更する
                  </Button>
                </Stack>
              </Box>
            </form>
          </Modal>
        </Box>
      </Box>
    </>
  );
};
