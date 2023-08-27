import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginUserState, viewedUserState } from "../../store/atoms/userAtom";
import { ImageItem } from "../organisms/ImageItem";
import { FollowModal } from "../molecules/FollowModal";
import { FollowButton } from "../atoms/button/FollowButton";
import { useUsers } from "../../hooks/useUsers";
import { useImages } from "../../hooks/useImages";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import { Avatar, Button, Typography } from "@mui/material";
import { ImageSortSelector } from "../atoms/selector/ImageSortSelector";

export const UserPage = () => {
  const loginUser = useRecoilValue(loginUserState);
  const viewedUser = useRecoilValue(viewedUserState);
  const { handleGetUser } = useUsers();

  const { userId } = useParams();
  const numUserId = userId ? parseInt(userId, 10) : undefined;
  const { images, setImages, handleGetImages } = useImages(numUserId);

  // urlが変更されたらページに表示するユーザー、ログインユーザー情報を取得する
  useEffect(() => {
    handleGetUser(numUserId);
    handleGetImages(numUserId);
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
              <FollowButton followedUserId={numUserId} />
            </Box>
          )}
        </Box>
        <Typography>{viewedUser?.nickname}</Typography>
        <Typography>投稿枚数：{images.length}枚</Typography>
        {loginUser?.id === viewedUser?.id && (
          <FollowModal
            viewedUser={viewedUser}
            followOpen={followOpen}
            handleFollowModalOpen={handleFollowModalOpen}
            handleFollowModalClose={handleFollowModalClose}
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
        <ImageSortSelector
          images={images}
          setImages={setImages}
          numUserId={numUserId}
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
        {images.map((image, index) => (
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
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
