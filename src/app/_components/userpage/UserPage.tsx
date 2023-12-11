"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Link from "next/link";
import { useParams } from "next/navigation";
import { loginUserState } from "../../../store/atoms/userAtom";
import { ImageItem } from "./ImageItem";
import { FollowModal } from "./FollowModal";
import { FollowButton } from "../FollowButton";
import { ImageSortSelector } from "./ImageSortSelector";
import { useUsers } from "../../../hooks/user/useUsers";
import { useImages } from "../../../hooks/useImages";
import { useParks } from "../../../hooks/useParks";
import { usePageSize } from "../../../hooks/usePageSize";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import {
  Avatar,
  Button,
  CircularProgress,
  Skeleton,
  Typography,
} from "@mui/material";
import styled from "styled-components";

export const UserPage = () => {
  const loginUser = useRecoilValue(loginUserState);
  const { handleGetUser, isFollowed, viewedUser } = useUsers();
  const { parks } = useParks();

  const params = useParams();
  const numUserId = params
    ? parseInt(Array.isArray(params) ? params[0] : params, 10)
    : undefined;
  const {
    images,
    totalImagesCount,
    handleGetImages,
    handleGetMoreImages,
    isImagesInitialLoading,
    isImagesLoading,
    imagePage,
    setImagePage,
    createdTime,
    sortOption,
    setSortOption,
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
    <Box sx={{ width: "100%", marginTop: 5 }}>
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
            alt="avatar"
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
              variant="body1"
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
              <Link href={"/profileedit"}>編集</Link>
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
          mb: 2,
          ml: 1,
        }}
      >
        <ImageSortSelector
          handleGetImages={handleGetImages}
          sortOption={sortOption}
          setSortOption={setSortOption}
          pageSize={pageSize}
          userId={numUserId}
        />
        {loginUser?.id === viewedUser?.id && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2b3d51",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#2b3d51",
                opacity: 0.7,
              },
              mr: 1,
            }}
          >
            <Link href={"/imageedit"}>投稿編集</Link>
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
                  viewedUser={viewedUser}
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
