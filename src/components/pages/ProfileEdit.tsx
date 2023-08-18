import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../store/atoms/userAtom";
import { updateUser } from "../../urls";
import { PasswordChangeButton } from "../atoms/button/PasswordChangeButton";
import { UserProfileForm } from "../../types/user";
import {
  Box,
  Button,
  TextField,
  Avatar,
  Stack,
  Typography,
} from "@mui/material";

export const ProfileEdit = () => {
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);

  const [profileValues, setProfileValues] = useState<UserProfileForm>({
    nickname: loginUser ? loginUser.nickname : "",
    email: loginUser ? loginUser.email : "",
    avatar: loginUser ? loginUser.avatar : null,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<string[]>([]);

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

    const profileData = new FormData();
    if (loginUser === null) return;

    profileData.append("user[nickname]", profileValues.nickname);
    profileData.append("user[email]", profileValues.email);
    if (selectedImage) {
      profileData.append("user[avatar]", selectedImage);
    }
    updateUser(loginUser.id, profileData)
      .then((updatedUser) => {
        setLoginUser(updatedUser.data.user);
        alert("プロフィールを更新しました");
      })
      .catch((error) => {
        if (error.response) {
          setErrors(error.response.data.errors);
        }
      });
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
                sx={{ width: 125, height: 125 }}
              />
              <Button component="label">
                画像を変更
                <input type="file" hidden onChange={handleImageChange} />
              </Button>
            </Box>
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
            <Button variant="contained" type="submit" color="primary" fullWidth>
              更新する
            </Button>
          </Stack>
        </Box>
      </form>
      <Box marginTop={3} marginBottom={3} />
      <PasswordChangeButton setErrors={setErrors} />
    </>
  );
};
