import React, { useContext, useEffect, useState } from "react";
import { updateUser } from "../../urls";
import { Box, Button, Modal, TextField, Avatar, Stack } from "@mui/material";
import { UserContext } from "../../providers/UserProvider";
import { UserProfileForm } from "../../types/user";

export const ProfileEdit = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);

  const [values, setValues] = useState<UserProfileForm>({
    nickname: user ? user.nickname : "",
    email: user ? user.email : "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
    avatar: undefined,
  });

  useEffect(() => {
    if (user) {
      setValues((v) => ({
        ...v,
        nickname: user.nickname,
        email: user.email,
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setValues({ ...values, avatar: file });
  };

  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const profileData = new FormData();
    if (user === null) return;
    try {
      profileData.append("nickname", values.nickname);
      profileData.append("email", values.email);
      profileData.append("password", values.password);
      profileData.append("new_password", values.newPassword);
      profileData.append("confirm_new_password", values.confirmNewPassword);
      values.avatar && profileData.append("avatar", values.avatar);
      await updateUser(user.id, profileData).then(() => {
        alert("更新しました");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
                  values.avatar ? URL.createObjectURL(values.avatar) : undefined
                }
                sx={{ width: 80, height: 80 }}
              />
              <Button component="label">
                画像を変更
                <input type="file" hidden onChange={handleImageChange} />
              </Button>
            </Box>
            <TextField
              name="username"
              label="アカウント名"
              value={values.nickname}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="email"
              label="メール"
              value={values.email}
              onChange={handleInputChange}
              fullWidth
            />
            <Button variant="outlined" onClick={handleModalOpen} fullWidth>
              パスワード変更
            </Button>
            <Button variant="contained" type="submit" color="primary" fullWidth>
              保存
            </Button>
          </Stack>
        </Box>
        <Modal open={open} onClose={handleModalClose}>
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
                name="password"
                type="password"
                label="現在のパスワード"
                value={values.password}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                name="newPassword"
                type="password"
                label="新しいパスワード"
                value={values.newPassword}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                name="confirmNewPassword"
                type="password"
                label="新しいパスワード（確認）"
                value={values.confirmNewPassword}
                onChange={handleInputChange}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleModalClose}
                fullWidth
              >
                変更を保存
              </Button>
            </Stack>
          </Box>
        </Modal>
      </form>
    </>
  );
};
