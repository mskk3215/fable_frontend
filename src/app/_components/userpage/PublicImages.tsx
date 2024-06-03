"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import Link from "next/link";
import { throttle } from "lodash";
import { getUserImages } from "../../../urls";
import { ImageSortSelector } from "./ImageSortSelector";
import { loginUserState } from "../../../store/atoms/userAtom";
import { useImages } from "../../../hooks/useImages";
import { usePageSize } from "../../../hooks/usePageSize";
import { useUsers } from "../../../hooks/user/useUsers";
import { useParks } from "../../../hooks/useParks";
import { ImageItemDialog } from "./ImageItemDialog";
import { LoginAlertModal } from "./LoginAlertModal";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { Image as ImageType, SSRImage } from "../../../types/images";

type Props = {
  latestImages: SSRImage[];
  numUserId?: number;
};

const convertSSRImageToImage = (ssrImages: SSRImage[]): ImageType[] => {
  return ssrImages.map((ssrImage) => {
    return {
      ...ssrImage,
      insectName: ssrImage.insect_name,
      insectSex: ssrImage.insect_sex,
      cityName: ssrImage.city_name,
      takenAt: ssrImage.taken_at,
      userId: -1,
      createdAt: new Date(),
      likesCount: 0,
    };
  });
};

export default function PublicImages(props: Props) {
  const { latestImages, numUserId } = props;
  const loginUser = useRecoilValue(loginUserState);
  const { handleGetUser, isFollowed, viewedUser } = useUsers();

  const { parks } = useParks();
  const {
    images,
    setImages,
    handleGetImages,
    handleGetMoreImages,
    isImagesInitialLoading,
    isImagesLoading,
    imagePage,
    setImagePage,
    createdTime,
    sortOption,
    setSortOption,
  } = useImages(convertSSRImageToImage(latestImages));
  const pageSize = usePageSize();

  useEffect(() => {
    handleGetUser(numUserId);
  }, [numUserId, loginUser]);

  // CSR input for login user
  useEffect(() => {
    if (!loginUser) return;
    (async () => {
      const res = await getUserImages({
        userId: numUserId,
        page: 1,
        pageSize: pageSize,
        sortOption: 0,
      });
      setImages(res.data.images);
    })();
  }, [loginUser]);

  // infinity scroll
  const handleImageScroll = throttle(() => {
    if (
      window.innerHeight + window.pageYOffset >=
        document.documentElement.scrollHeight - 10 &&
      !isImagesLoading
    ) {
      if (!loginUser) {
        handleLoginAlertModalOpen();
        return;
      }
      setImagePage((prevImagePage) => prevImagePage + 1);
    }
  }, 200);

  useEffect(() => {
    handleGetMoreImages(pageSize, numUserId, "addToImages");
  }, [imagePage]);

  useEffect(() => {
    window.addEventListener("scroll", handleImageScroll);
    return () => window.removeEventListener("scroll", handleImageScroll);
  }, [isImagesLoading, loginUser]);

  // ImageDialog
  const [imageOpen, setImageOpen] = useState<boolean>(false);
  const [imageSize, setImageSize] = useState({ height: "auto", width: "auto" });
  const [currentImageIndex, setCurrentImageIndex] = useState<
    number | undefined
  >(undefined);

  const handleClickImageOpen = (index: number) => {
    if (loginUser) {
      setImageOpen(true);
      setCurrentImageIndex(index);
      setImageSize({ height: "70vh", width: "auto" });
    } else {
      handleLoginAlertModalOpen();
    }
  };

  const handleClickImageClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(undefined);
    setImageOpen(false);
  }, []);

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

  // LoginAlertModal
  const [loginAlertOpen, setLoginAlertOpen] = useState<boolean>(false);

  const handleLoginAlertModalOpen = () => {
    setLoginAlertOpen(true);
  };

  const handleLoginAlertModalClose = useCallback(() => {
    setLoginAlertOpen(false);
  }, []);

  return (
    <Box>
      {/* ソートオプション,編集ボタン */}
      {loginUser ? (
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
          {loginUser?.id === numUserId && (
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
                  mr: 1,
                }}
              >
                投稿編集
              </Button>
            </Link>
          )}
        </Box>
      ) : (
        <Box sx={{ mb: 7 }}></Box>
      )}
      {/* 画像一覧 */}
      <Grid
        container
        spacing={0.25}
        sx={{
          width: { xs: "99%", md: "100%" },
          m: "auto",
          paddingRight: { xs: "0px", md: "10px" },
        }}
      >
        {images.map((image: ImageType, index) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={2}
            key={image.id}
            sx={{
              position: "relative",
              backgroundColor: "black",
              border: "1px solid",
              borderColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              style={{ zIndex: 1 }}
              sx={{
                "&:hover::after": {
                  content: '""',
                  position: "relative",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
                paddingTop: "100%",
              }}
              onClick={() => handleClickImageOpen(index)}
            >
              <Image
                src={image.image}
                alt={`${image.insectName} - ${image.cityName}`}
                layout="fill"
                objectFit="contain"
              />
              <Box
                sx={{
                  position: "absolute",
                  color: "white",
                  bottom: 0,
                  left: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "5px",
                  fontSize: "12px",
                }}
              >
                {createdTime && image.takenAt && createdTime(image.takenAt)
                  ? createdTime(image.takenAt)
                  : "\u00a0"}
                <br />
                {loginUser ? (
                  <>
                    {image.insectName}({image.insectSex})<br />
                    {image.parkId !== undefined && parks[image.parkId - 1]?.name
                      ? parks[image.parkId - 1]?.name
                      : image.cityName}
                  </>
                ) : (
                  `${image.insectName} - ${image.cityName}`
                )}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      {/* 詳細画像ダイアログ */}
      {imageOpen && currentImageIndex !== undefined && parks && (
        <ImageItemDialog
          numUserId={numUserId}
          currentImage={images[currentImageIndex]}
          currentImageIndex={currentImageIndex}
          maxIndex={images.length - 1}
          createdTime={createdTime}
          imageOpen={imageOpen}
          imageSize={imageSize}
          handleClickImageClose={handleClickImageClose}
          handlePrevImageClick={handlePrevImageClick}
          handleNextImageClick={handleNextImageClick}
          parks={parks}
          isFollowed={isFollowed}
          viewedUser={viewedUser}
        />
      )}
      {/* ログインアラート */}
      {!imageOpen && loginAlertOpen && (
        <LoginAlertModal
          loginAlertOpen={loginAlertOpen}
          handleLoginAlertModalClose={handleLoginAlertModalClose}
        />
      )}
      {/* スクロールスピナー */}
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
}
