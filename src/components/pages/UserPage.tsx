import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginUserState, viewedUserState } from "../../store/atoms/userAtom";
import { ImageItem } from "../organisms/ImageItem";
import { FollowModal } from "../molecules/FollowModal";
import { FollowButton } from "../atoms/button/FollowButton";
import { useUsers } from "../../hooks/user/useUsers";
import { useImages } from "../../hooks/useImages";
import { useParks } from "../../hooks/useParks";
import { usePageSize } from "../../hooks/usePageSize";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import {
  Avatar,
  Button,
  CircularProgress,
  Skeleton,
  Typography,
} from "@mui/material";
import { ImageSortSelector } from "../atoms/selector/ImageSortSelector";
import styled from "styled-components";

export const UserPage = () => {
  const loginUser = useRecoilValue(loginUserState);
  const viewedUser = useRecoilValue(viewedUserState);
  const { handleGetUser, isFollowed } = useUsers();
  const { parks } = useParks();

  const { userId } = useParams();
  const numUserId = userId ? parseInt(userId, 10) : undefined;
  const {
    images,
    setImages,
    totalImagesCount,
    handleGetImages,
    handleGetMoreImages,
    isImagesInitialLoading,
    isImagesLoading,
    imagePage,
    setImagePage,
    createdTime,
  } = useImages(numUserId);
  const pageSize = usePageSize();

  // urlが変更されたらページに表示するユーザー、ログインユーザー情報を取得する
  useEffect(() => {
    handleGetUser(numUserId);
    handleGetImages(pageSize, numUserId);
    setFollowOpen(false);
  }, [numUserId]);

  // フォロー一覧モーダルの開閉
  const [followOpen, setFollowOpen] = useState(false);

  const handleFollowModalOpen = useCallback(() => {
    setFollowOpen(true);
  }, []);

  const handleFollowModalClose = useCallback(() => {
    setFollowOpen(false);
    handleGetUser(undefined);
  }, []);

  // Dialogの画像切り替え
  const [currentImageIndex, setCurrentImageIndex] = useState<
    number | undefined
  >(undefined);

  const handleNextImageClick = useCallback(() => {
    if (
      typeof currentImageIndex !== "undefined" &&
      currentImageIndex < images.length - 1
    ) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  }, [currentImageIndex, images]);

  const handlePrevImageClick = useCallback(() => {
    if (typeof currentImageIndex !== "undefined" && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  }, [currentImageIndex]);

  // scrollで投稿を追加取得
  const handleImageScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isImagesLoading
    )
      return;
    setImagePage((prevImagePage) => prevImagePage + 1);
  };

  useEffect(() => {
    handleGetMoreImages(pageSize, numUserId, "addToImages");
  }, [imagePage]);

  useEffect(() => {
    window.addEventListener("scroll", handleImageScroll);
    return () => window.removeEventListener("scroll", handleImageScroll);
  }, [isImagesLoading]);

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
              width: { xs: 100, sm: 125 },
              height: { xs: 100, sm: 125 },
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          {loginUser?.id === viewedUser?.id && (
            <Typography
              component={Link}
              to="/profileedit"
              variant="body1"
              color="primary"
              sx={{
                position: "absolute",
                top: 0,
                right: -30,
                cursor: "pointer",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              編集
            </Typography>
          )}
          {loginUser?.id !== viewedUser?.id && (
            <Box
              sx={{
                position: "absolute",
                right: -100,
                top: 0,
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
        </Box>
        <Typography>{viewedUser?.nickname}</Typography>
        <Typography>投稿枚数：{totalImagesCount}枚</Typography>
        {loginUser?.id === viewedUser?.id ? (
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <ImageSortSelector
          images={images}
          setImages={setImages}
          numUserId={numUserId}
          handleGetImages={handleGetImages}
        />
        {loginUser?.id === viewedUser?.id && (
          <Button
            component={Link}
            to="/imageedit"
            variant="contained"
            color="primary"
          >
            投稿編集
          </Button>
        )}
      </Box>
      <Grid container spacing={0.5}>
        {isImagesInitialLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <SquareSkeleton variant="rectangular" />
              </Grid>
            ))
          : images.map((image, index) => (
              <Grid item xs={6} sm={4} md={2} key={image.id}>
                <ImageItem
                  image={image}
                  index={index}
                  currentImageIndex={currentImageIndex}
                  maxIndex={images.length - 1}
                  isCheckboxVisible={false}
                  isDialogVisible={true}
                  numUserId={numUserId}
                  setCurrentImageIndex={setCurrentImageIndex}
                  handlePrevImageClick={handlePrevImageClick}
                  handleNextImageClick={handleNextImageClick}
                  currentImage={
                    currentImageIndex !== undefined
                      ? images[currentImageIndex]
                      : undefined
                  }
                  parks={parks}
                  createdTime={createdTime}
                  isFollowed={isFollowed}
                />
              </Grid>
            ))}
      </Grid>
      {isImagesLoading && !isImagesInitialLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
            height: "50px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
            height: "50px",
          }}
        ></Box>
      )}
    </Box>
  );
};

const SquareSkeleton = styled(Skeleton)(() => ({
  backgroundColor: "#eee",
  borderRadius: "4px",
  paddingTop: "100%",
  position: "relative" as "relative",
  width: "100%",
}));
