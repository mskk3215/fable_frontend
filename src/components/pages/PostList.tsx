import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isFollowedState,
  userState,
  viewedUserState,
} from "../../store/atoms/userAtom";
import { PostItem } from "../molecules/PostItem";
import { FollowModal } from "../molecules/FollowModal";
import { FollowButton } from "../atoms/button/FollowButton";
import { useUser } from "../../hooks/useUser";
import { useAllParks } from "../../hooks/useAllParks";
import { useUserImages } from "../../hooks/useUserImages";
import {
  createUserRelationship,
  deleteUserRelationship,
} from "../../urls";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import { Avatar, Button, Typography } from "@mui/material";

export const PostList = () => {
  const { parks } = useAllParks();

  const user = useRecoilValue(userState);
  const viewedUser = useRecoilValue(viewedUserState);
  const [isFollowed, setIsFollowed] = useRecoilState(isFollowedState);
  const { handleGetUser } = useUser();

  const { userId } = useParams();
  const numUserId = userId ? parseInt(userId, 10) : undefined;
  const { posts } = useUserImages(numUserId);

  // urlが変更されたらページに表示するユーザー情報を取得する
  useEffect(() => {
    handleGetUser(numUserId);
  }, [numUserId]);

  // フォロー状態を切り替える
  const handleFollowButtonClick = useCallback(
    (followedUserId?: number, followStatus?: boolean) => {
      if (user?.id === undefined || followedUserId === undefined) return;
      const newIsFollowed = !followStatus;
      if (newIsFollowed) {
        createUserRelationship(user.id, followedUserId);
      } else {
        deleteUserRelationship(user.id, followedUserId);
      }
      setIsFollowed(newIsFollowed);
    },
    []
  );

  // モーダルの開閉
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
    handleGetUser(numUserId);
  };

  return (
    <Box sx={{ width: "100%", marginTop: 10 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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
            alt="profile image"
            src={
              viewedUser?.avatar instanceof File
                ? URL.createObjectURL(viewedUser.avatar)
                : viewedUser?.avatar || ""
            }
            sx={{
              width: 125,
              height: 125,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          {user?.id === viewedUser?.id && (
            <Button
              component={Link}
              to="/profileedit"
              variant="contained"
              color="primary"
              sx={{
                position: "absolute",
                top: 0,
                left: -150,
              }}
            >
              Profile編集
            </Button>
          )}
          {user?.id !== viewedUser?.id && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: -150,
              }}
            >
              <FollowButton
                handleFollowButtonClick={() =>
                  handleFollowButtonClick(numUserId, isFollowed)
                }
                isFollowed={isFollowed}
              />
            </Box>
          )}
        </Box>
        <Typography>{viewedUser?.nickname}</Typography>
        <Typography>投稿枚数：{posts.length}枚</Typography>
        {user?.id === viewedUser?.id && (
          <FollowModal
            viewedUser={viewedUser}
            handleFollowButtonClick={handleFollowButtonClick}
            open={open}
            handleModalOpen={handleModalOpen}
            handleModalClose={handleModalClose}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 3,
          marginRight: 3,
        }}
      >
        {user?.id === viewedUser?.id && (
          <Button
            component={Link}
            to="/postedit"
            variant="contained"
            color="primary"
          >
            投稿編集
          </Button>
        )}
      </Box>
      <Grid container spacing={0.5}>
        {posts.map((post) => (
          <Grid item xs={6} sm={4} md={2} key={post.id}>
            <PostItem
              post={post}
              parks={parks}
              isCheckboxVisible={false}
              isDialogVisible={true}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
