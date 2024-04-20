"use client";

import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../../store/atoms/userAtom";
import { PasswordChangeModal } from "./PasswordChangeModal";
import { useProfileChangeAction } from "../../../hooks/user/useProfileChangeAction";
import {
  Box,
  Button,
  TextField,
  Avatar,
  Stack,
  Typography,
  LinearProgress,
} from "@mui/material";
import { UserProfileForm } from "../../../types/user";

export const ProfileEdit = () => {
  const { handleProfileChangeAction } = useProfileChangeAction();
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);

  const [profileValues, setProfileValues] = useState<UserProfileForm>({
    nickname: loginUser ? loginUser.nickname : "",
    email: loginUser ? loginUser.email : "",
    avatar: loginUser?.avatar ? loginUser.avatar : undefined,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadProfileProgress, setUploadProfileProgress] = useState<number>(0);
  const [passwordChangeOpen, setPasswordChangeOpen] = useState(false);

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
    if (handelValidation()) {
      if (loginUser === undefined) return;
      setIsLoading(true);
      const profileData = new FormData();

      profileData.append("user[nickname]", profileValues.nickname);
      if (profileValues.email) {
        profileData.append("user[email]", profileValues.email);
      }
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
    const inputFields = [
      {
        value: profileValues.nickname,
        name: "名前",
      },
      {
        value: profileValues.email,
        name: "メールアドレス",
      },
    ];
    const errorMessages = inputFields
      .filter((field) => !field.value)
      .map((field) => `${field.name}を入力してください`);
    if (errorMessages.length > 0) {
      setErrors(errorMessages);
      return false;
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

  // パスワード変更モーダルの処理
  const handleModalOpen = () => {
    setPasswordChangeOpen(true);
  };
  const handleModalClose = () => {
    setPasswordChangeOpen(false);
  };

  return (
    <>
      <form onSubmit={handleProfileSubmit}>
        <Box
          sx={{ width: "100%", maxWidth: 400, m: "auto", marginTop: "70px" }}
        >
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
              <Button
                component="label"
                sx={{
                  color: "#2b3d51",
                  "&:hover": {
                    opacity: 0.7,
                  },
                }}
              >
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
              label="名前"
              value={profileValues.nickname}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="email"
              label="メールアドレス"
              value={profileValues.email}
              onChange={handleInputChange}
              fullWidth
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={isLoading}
              sx={{
                backgroundColor: "#2b3d51",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#2b3d51",
                  opacity: 0.7,
                },
              }}
            >
              更新する
            </Button>
          </Stack>
        </Box>
      </form>
      <Box marginTop={3} marginBottom={3} />
      <Box sx={{ width: "90%", maxWidth: 400, m: "auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {" "}
          <Button
            variant="outlined"
            onClick={handleModalOpen}
            fullWidth
            sx={{
              borderColor: "#2b3d51",
              color: "#2b3d51",
            }}
          >
            パスワード変更
          </Button>
        </Box>
      </Box>
      {/* パスワード変更モーダル */}
      {passwordChangeOpen && (
        <PasswordChangeModal
          setErrors={setErrors}
          setIsLoading={setIsLoading}
          setUploadProfileProgress={setUploadProfileProgress}
          passwordChangeOpen={passwordChangeOpen}
          handleModalClose={handleModalClose}
        />
      )}
    </>
  );
};
