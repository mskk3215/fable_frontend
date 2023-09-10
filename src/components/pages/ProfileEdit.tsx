import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../store/atoms/userAtom";
import { PasswordChangeModal } from "../molecules/PasswordChangeModal";
import { useProfileChangeAction } from "../../hooks/user/useProfileChangeAction";
import { UserProfileForm } from "../../types/user";
import {
  Box,
  Button,
  TextField,
  Avatar,
  Stack,
  Typography,
  LinearProgress,
} from "@mui/material";

export const ProfileEdit = () => {
  const { handleProfileChangeAction } = useProfileChangeAction();
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);

  const [profileValues, setProfileValues] = useState<UserProfileForm>({
    nickname: loginUser ? loginUser.nickname : "",
    email: loginUser ? loginUser.email : "",
    avatar: loginUser ? loginUser.avatar : null,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadProfileProgress, setUploadProfileProgress] = useState<number>(0);

  // ユーザー情報を取得
  useEffect(() => {
    if (loginUser) {
      setProfileValues((v) => ({
        ...v,
        nickname: loginUser.nickname,
        email: loginUser.email,
        avatar: loginUser.avatar,
      }));
    }
  }, [loginUser]);

  // プロフィール編集の処理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileValues({ ...profileValues, [name]: value });
  };
  // 画像変更の処理
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setProfileValues({ ...profileValues, avatar: file });
      // メモリ解放
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
      setBlobUrl(URL.createObjectURL(file));
    }
  };

  // サーバーに送信
  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (handelValidation()) {
      const profileData = new FormData();
      if (loginUser === null) return;

      profileData.append("user[nickname]", profileValues.nickname);
      profileData.append("user[email]", profileValues.email);
      if (selectedImage) {
        profileData.append("user[avatar]", selectedImage);
      }

      // プロフィール更新の処理
      handleProfileChangeAction({
        loginUser: loginUser,
        setLoginUser: setLoginUser,
        profileData: profileData,
        setErrors: setErrors,
        isPasswordChange: false,
        setIsLoading: setIsLoading,
        setUploadProfileProgress: setUploadProfileProgress,
      });
    }
  };

  // プロフィールバリデーション
  const handelValidation = () => {
    setErrors([]);
    if (profileValues.nickname.length < 1) {
      setErrors((prev) => [...prev, "アカウント名を入力してください"]);
      return;
    }
    if (profileValues.email.length < 1) {
      setErrors((prev) => [...prev, "メールアドレスを入力してください"]);
      return;
    }
    return true;
  };

  // メモリ解放
  useEffect(() => {
    return () => {
      if (blobUrl !== undefined) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, []);

  return (
    <>
      <form onSubmit={handleProfileSubmit}>
        <Box sx={{ width: "100%", maxWidth: 400, m: "auto", marginTop: 10 }}>
          <Stack spacing={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Avatar
                src={
                  blobUrl ||
                  (loginUser?.avatar instanceof File
                    ? URL.createObjectURL(loginUser.avatar)
                    : loginUser?.avatar || "")
                }
                sx={{
                  width: { xs: 100, sm: 125 },
                  height: { xs: 100, sm: 125 },
                }}
              />
              <Button component="label">
                画像を変更
                <input type="file" hidden onChange={handleImageChange} />
              </Button>
            </Box>
            {uploadProfileProgress > 0 && (
              <Box sx={{ width: "100%", my: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={uploadProfileProgress}
                />
              </Box>
            )}
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
              name="nickname"
              label="アカウント名"
              value={profileValues.nickname}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="email"
              label="メール"
              value={profileValues.email}
              onChange={handleInputChange}
              fullWidth
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              disabled={isLoading}
            >
              更新する
            </Button>
          </Stack>
        </Box>
      </form>
      <Box marginTop={3} marginBottom={3} />
      <PasswordChangeModal setErrors={setErrors} />
    </>
  );
};
