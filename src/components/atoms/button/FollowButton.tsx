import React, { memo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { followUserState, loginUserState } from "../../../store/atoms/userAtom";
import { useUsers } from "../../../hooks/user/useUsers";
import { createUserRelationship, deleteUserRelationship } from "../../../urls";
import { Button } from "@mui/material";

type Props = {
  followedUserId: number;
};

export const FollowButton = memo((props: Props) => {
  const { followedUserId } = props;
  const loginUser = useRecoilValue(loginUserState);
  const setFollowUser = useSetRecoilState(followUserState);
  const { isFollowed } = useUsers();

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
        color="primary"
        size="small"
        sx={{ maxWidth: { xs: "75%", md: "100%" } }}
      >
        {isFollowed(followedUserId) ? "フォロー中" : "フォローする"}
      </Button>
    </>
  );
});
