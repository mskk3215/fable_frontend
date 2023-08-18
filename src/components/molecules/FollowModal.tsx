import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { FollowButton } from "../atoms/button/FollowButton";
import {
  Avatar,
  Box,
  ButtonBase,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { User } from "../../types/user";
import { Cancel } from "@mui/icons-material";

type Props = {
  viewedUser: User | null;
  handleFollowButtonClick: (userId?: number, followStatus?: boolean) => void;
  followOpen: boolean;
  handleFollowModalOpen: () => void;
  handleFollowModalClose: () => void;
};
type FollowedStatus = { [key: number]: boolean };

export const FollowModal = memo((props: Props) => {
  const {
    viewedUser,
    handleFollowButtonClick,
    followOpen,
    handleFollowModalOpen,
    handleFollowModalClose,
  } = props;

  // フォロー中のユーザーのフォロー状態を管理する
  const [followedStatus, setFollowedStatus] = useState(() => {
    return (viewedUser?.following || []).reduce<FollowedStatus>((acc, user) => {
      acc[user.id] = true;
      return acc;
    }, {});
  });

  // フォローユーザー毎のフォロー状態を切り替える
  const toggleFollowedStatus = (userId: number) => {
    setFollowedStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: !prevStatus[userId],
    }));
  };

  return (
    <>
      <Typography
        onClick={handleFollowModalOpen}
        sx={{
          cursor: "pointer",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        フォロー中：{viewedUser?.following.length}人
      </Typography>
      <Modal open={followOpen} onClose={handleFollowModalClose}>
        <Box
          sx={{
            m: "auto",
            bgcolor: "background.paper",
            borderRadius: "10px",
            outline: "none",
            width: "90%",
            maxWidth: 500,
            marginTop: 10,
            position: "relative",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              p: 2,
              boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            フォロー中
          </Typography>
          <IconButton
            sx={{ position: "absolute", top: 14, right: 10 }}
            onClick={handleFollowModalClose}
          >
            <Cancel />
          </IconButton>
          <Box sx={{ overflowY: "scroll", maxHeight: "70vh", p: 3 }}>
            <Stack spacing={3}>
              {viewedUser?.following.map((user) => (
                <React.Fragment key={user.id}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        alt="avatar"
                        src={
                          user?.avatar instanceof File
                            ? URL.createObjectURL(user.avatar)
                            : user?.avatar || ""
                        }
                        sx={{
                          width: 50,
                          height: 50,
                          marginLeft: 2,
                          marginRight: 2,
                        }}
                      />
                      <ButtonBase component={Link} to={`/postlist/${user.id}`}>
                        <Typography
                          sx={{
                            cursor: "pointer",
                            textDecoration: "none",
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          {user.nickname}
                        </Typography>
                      </ButtonBase>
                    </Box>
                    <FollowButton
                      handleFollowButtonClick={() => {
                        handleFollowButtonClick(
                          user.id,
                          followedStatus[user.id]
                        );
                        toggleFollowedStatus(user.id);
                      }}
                      isFollowed={followedStatus[user.id]}
                    />
                  </Box>
                </React.Fragment>
              ))}
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  );
});
