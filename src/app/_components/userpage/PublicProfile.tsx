"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { loginUserState } from "../../../store/atoms/userAtom";
import { Avatar, Box, ButtonBase, Typography } from "@mui/material";
import { FollowButton } from "../FollowButton";
import { FollowModal } from "./FollowModal";
import { useUsers } from "../../../hooks/user/useUsers";
import { User } from "../../../types/user";
import { ShareMenuButton } from "./ShareMenuButton";

type Props = {
  profileInfo: User;
  numUserId: number;
  totalImagesCount: number;
};

export default function PublicProfile(props: Props) {
  const { profileInfo, numUserId, totalImagesCount } = props;
  const loginUser = useRecoilValue(loginUserState);
  const { handleGetUser, isFollowed, viewedUser } = useUsers();

  useEffect(() => {
    handleGetUser(numUserId);
    setFollowOpen(false);
  }, [numUserId, loginUser]);

  // フォロー一覧モーダルの開閉
  const [followOpen, setFollowOpen] = useState(false);

  const handleFollowModalOpen = useCallback(() => {
    setFollowOpen(true);
  }, []);

  const handleFollowModalClose = useCallback(() => {
    setFollowOpen(false);
    if (loginUser) {
      handleGetUser(loginUser.id);
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "70px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Avatar
          alt={profileInfo?.nickname ? profileInfo?.nickname : ""}
          src={
            profileInfo?.avatar instanceof File
              ? URL.createObjectURL(profileInfo.avatar)
              : profileInfo?.avatar || ""
          }
          sx={{
            width: { xs: 100, sm: 125 },
            height: { xs: 100, sm: 125 },
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <ShareMenuButton profileInfo={profileInfo} />
        {loginUser && (
          <>
            {loginUser?.id === profileInfo?.id && (
              <ButtonBase component={Link} href={`/profileedit`}>
                <Typography
                  variant="body1"
                  sx={{
                    position: "absolute",
                    top: -30,
                    right: -55,
                    cursor: "pointer",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  編集
                </Typography>
              </ButtonBase>
            )}
            {loginUser?.id !== profileInfo?.id && (
              <Box
                sx={{
                  position: "absolute",
                  right: -100,
                  top: 30,
                }}
              >
                {numUserId && (
                  <FollowButton
                    followedUserId={numUserId}
                    isFollowed={isFollowed}
                  />
                )}
              </Box>
            )}
          </>
        )}
      </Box>
      <Typography>{profileInfo?.nickname}</Typography>
      <Typography>投稿枚数：{totalImagesCount}枚</Typography>
      {loginUser?.id === profileInfo?.id ? (
        <FollowModal
          viewedUser={viewedUser}
          followOpen={followOpen}
          handleFollowModalOpen={handleFollowModalOpen}
          handleFollowModalClose={handleFollowModalClose}
          isFollowed={isFollowed}
        />
      ) : (
        <Box mt={3} />
      )}
    </Box>
  );
}
