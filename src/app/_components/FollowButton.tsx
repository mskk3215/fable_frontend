"use client";

import React, { memo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { followUserState, loginUserState } from "../../store/atoms/userAtom";
import { createUserRelationship, deleteUserRelationship } from "../../urls";
import { Button } from "@mui/material";

type Props = {
  followedUserId: number;
  isFollowed: (followedUserId: number) => boolean;
};

export const FollowButton = memo((props: Props) => {
  const { followedUserId, isFollowed } = props;
  const loginUser = useRecoilValue(loginUserState);
  const setFollowUser = useSetRecoilState(followUserState);

  // フォロー状態変更時の処理
  const handleFollowButtonClick = (followedUserId?: number) => {
    if (loginUser?.id === undefined || followedUserId === undefined) return;
    // followUserのState更新
    setFollowUser((prevStatus) => {
      const updatedStatus = {
        ...prevStatus,
        [followedUserId]: !prevStatus[followedUserId],
      };
      // サーバーにフォロー状態を送信
      if (updatedStatus[followedUserId] === true) {
        createUserRelationship(loginUser.id, followedUserId);
      } else {
        deleteUserRelationship(loginUser.id, followedUserId);
      }
      return updatedStatus;
    });
  };

  return (
    <>
      <Button
        onClick={() => handleFollowButtonClick(followedUserId)}
        variant={isFollowed(followedUserId) ? "outlined" : "contained"}
        size="small"
        sx={{
          maxWidth: { xs: "75%", md: "100%" },
          backgroundColor: isFollowed(followedUserId) ? "#ffffff" : "#2b3d51",
          color: isFollowed(followedUserId) ? "#2b3d51" : "#ffffff",
          borderColor: isFollowed(followedUserId) ? "#2b3d51" : undefined,
          "&:hover": {
            backgroundColor: isFollowed(followedUserId) ? "#ffffff" : "#2b3d51",
            opacity: 0.7,
          },
        }}
      >
        {isFollowed(followedUserId) ? "フォロー中" : "フォローする"}
      </Button>
    </>
  );
});
FollowButton.displayName = "FollowButton";
