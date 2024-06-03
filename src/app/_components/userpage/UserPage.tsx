"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { throttle } from "lodash";
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
  ButtonBase,
  CircularProgress,
  Skeleton,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { ShareMenuButton } from "./ShareMenuButton";

export const UserPage = () => {
  const { handleGetUser, isFollowed, viewedUser } = useUsers();
  const { parks } = useParks();

  const params = useParams();
  const numUserId =
    typeof params.id === "string" ? parseInt(params.id, 10) : undefined;
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
  } = useImages();
  const pageSize = usePageSize("UserPage");

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
  const handleImageScroll = throttle(() => {
    if (
      window.innerHeight + window.pageYOffset >=
        document.documentElement.scrollHeight - 10 &&
      !isImagesLoading
    )
      setImagePage((prevImagePage) => prevImagePage + 1);
  }, 200);

  useEffect(() => {
    handleGetMoreImages(pageSize, numUserId, "addToImages");
  }, [imagePage]);

  useEffect(() => {
    window.addEventListener("scroll", handleImageScroll);
    return () => window.removeEventListener("scroll", handleImageScroll);
  }, [isImagesLoading]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          marginTop: "70px",
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
          {viewedUser && <ShareMenuButton profileInfo={viewedUser} />}
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
        </Box>
        {isImagesInitialLoading || !viewedUser ? (
          <Typography>Loading...</Typography>
        ) : (
          <Typography>{viewedUser?.nickname}</Typography>
        )}
        <Typography>投稿枚数：{totalImagesCount}枚</Typography>
        <FollowModal
          viewedUser={viewedUser}
          followOpen={followOpen}
          handleFollowModalOpen={handleFollowModalOpen}
          handleFollowModalClose={handleFollowModalClose}
          isFollowed={isFollowed}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          ml: 1.5,
        }}
      >
        <ImageSortSelector
          handleGetImages={handleGetImages}
          sortOption={sortOption}
          setSortOption={setSortOption}
          pageSize={pageSize}
          userId={numUserId}
        />
        <Link href={"/imageedit"}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2b3d51",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#2b3d51",
                opacity: 0.7,
              },
              mr: 1.5,
            }}
          >
            投稿編集
          </Button>
        </Link>
      </Box>
      <Grid
        container
        spacing={0.25}
        sx={{
          width: { xs: "99%", md: "100%" },
          m: "auto",
          paddingRight: { xs: "0px", md: "10px" },
        }}
      >
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
    </>
  );
};

const SquareSkeleton = styled(Skeleton)({
  backgroundColor: "#eee",
  borderRadius: "4px",
  paddingTop: "100%",
  position: "relative",
  width: "100%",
});
