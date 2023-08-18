import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isFollowedState,
  loginUserState,
  viewedUserState,
} from "../../store/atoms/userAtom";
import { PostItem } from "../organisms/PostItem";
import { FollowModal } from "../molecules/FollowModal";
import { FollowButton } from "../atoms/button/FollowButton";
import { useUser } from "../../hooks/useUser";
import { useUserImages } from "../../hooks/useUserImages";
import {
  createUserRelationship,
  deleteUserRelationship,
} from "../../urls";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import { Avatar, Button, Typography } from "@mui/material";

export const PostList = () => {
  const loginUser = useRecoilValue(loginUserState);
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
        createUserRelationship(loginUser.id, followedUserId);
      } else {
        deleteUserRelationship(loginUser.id, followedUserId);
      }
      setIsFollowed(newIsFollowed);
    },
    []
  );

  // フォロー一覧モーダルの開閉
  const [followOpen, setFollowOpen] = useState(false);

  const handleFollowModalOpen = useCallback(() => {
    setFollowOpen(true);
  }, []);

  const handleFollowModalClose = useCallback(() => {
    setFollowOpen(false);
    handleGetUser(numUserId);
  }, []);

  // Dialogの画像切り替え
  const [currentImageIndex, setCurrentImageIndex] = useState<
    number | undefined
  >(undefined);

  const handleNextImageClick = useCallback(() => {
    if (
      typeof currentImageIndex !== "undefined" &&
      currentImageIndex < posts.length - 1
    ) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  }, [currentImageIndex, posts]);

  const handlePrevImageClick = useCallback(() => {
    if (typeof currentImageIndex !== "undefined" && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  }, [currentImageIndex]);

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
          {loginUser?.id === viewedUser?.id && (
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
          {loginUser?.id !== viewedUser?.id && (
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
        {loginUser?.id === viewedUser?.id && (
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
        {loginUser?.id === viewedUser?.id && (
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
        {posts.map((post, index) => (
          <Grid item xs={6} sm={4} md={2} key={post.id}>
            <PostItem
              post={post}
              index={index}
              currentImageIndex={currentImageIndex}
              maxIndex={posts.length - 1}
              isCheckboxVisible={false}
              isDialogVisible={true}
              handleFollowButtonClick={handleFollowButtonClick}
              numUserId={numUserId}
              setCurrentImageIndex={setCurrentImageIndex}
              handlePrevImageClick={handlePrevImageClick}
              handleNextImageClick={handleNextImageClick}
              currentPost={
                currentImageIndex !== undefined
                  ? posts[currentImageIndex]
                  : undefined
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
