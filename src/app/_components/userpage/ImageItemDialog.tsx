"use client";

import React, { memo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useSwipeable } from "react-swipeable";
import Link from "next/link";
import { loginUserState } from "../../../store/atoms/userAtom";
import { FollowButton } from "../FollowButton";
import { LikeButton } from "../LikeButton";
import {
  searchWordState,
  useDestinationLocation,
} from "../../../store/atoms/searchWordState";
import styled from "styled-components";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Cancel } from "@mui/icons-material";
import { Image } from "../../../types/images";
import { Park } from "../../../types/parks";
import { User } from "../../../types/user";

type Props = {
  numUserId?: number;
  currentImage: Image;
  currentImageIndex?: number;
  maxIndex?: number;
  createdTime: (takenDateTime: string | Date) => string;
  imageOpen: boolean;
  imageSize: { height: string; width: string };
  handleClickImageClose: (e: React.MouseEvent) => void;
  handlePrevImageClick?: () => void;
  handleNextImageClick?: () => void;
  parks: Park[];
  isFollowed: (followedUserId: number) => boolean;
  viewedUser?: User;
};

export const ImageItemDialog = memo((props: Props) => {
  const {
    numUserId,
    currentImage,
    currentImageIndex,
    maxIndex,
    createdTime,
    imageOpen,
    imageSize,
    handleClickImageClose,
    handlePrevImageClick,
    handleNextImageClick,
    parks,
    isFollowed,
    viewedUser,
  } = props;

  const loginUser = useRecoilValue(loginUserState);
  const setSearchWord = useSetRecoilState(searchWordState);
  const { saveDestinationLocation } = useDestinationLocation();

  // スワイプ処理
  const imageSwipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (handleNextImageClick && currentImageIndex !== maxIndex) {
        handleNextImageClick();
      }
    },
    onSwipedRight: () => {
      if (handlePrevImageClick && currentImageIndex !== 0) {
        handlePrevImageClick();
      }
    },
  });

  return (
    <>
      <Dialog
        open={imageOpen}
        onClose={handleClickImageClose}
        fullWidth={true}
        maxWidth={"xl"}
        sx={{
          backgroundColor: "rgba(0,0,0,0.9)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogContent
          {...imageSwipeHandlers}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "flex-start",
            overflow: "auto",
            margin: 0,
            padding: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            component="span"
            m={0}
            p={0}
            sx={{
              backgroundColor: "rgba(0,0,0,0.9)",
              maxWidth: "100vw",
              maxHeight: "60vh",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentImage.image}
              alt="currentImageImage"
              style={{
                objectFit: "contain",
                height: imageSize.height,
                width: imageSize.width,
                maxWidth: "100vw",
                maxHeight: "60vh",
                display: "block",
              }}
            />
          </Box>
          <Box
            component="span"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={1.5}
            p={2}
            mt={2}
            overflow="hidden"
          >
            <Box display="flex" flexDirection="row" alignItems="center">
              <Avatar
                src={
                  viewedUser?.avatar instanceof File
                    ? URL.createObjectURL(viewedUser.avatar)
                    : viewedUser?.avatar || ""
                }
                sx={{ width: { xs: 30, md: 50 }, height: { xs: 30, md: 50 } }}
              />
              <Typography
                variant="h6"
                paddingLeft="10px"
                paddingRight="10px"
                sx={{
                  fontSize: { xs: "0.9rem", md: "1rem" },
                }}
              >
                {viewedUser?.nickname}
              </Typography>
              {loginUser?.id !== viewedUser?.id &&
                isFollowed(viewedUser?.id ?? 0) === false &&
                numUserId && (
                  <FollowButton
                    followedUserId={numUserId}
                    isFollowed={isFollowed}
                  />
                )}
            </Box>
            <Box
              sx={{
                fontSize: {
                  xs: "12px",
                  md: "16px",
                },
              }}
            >
              昆虫名:{" "}
              <SLink
                href={`/map`}
                onClick={() => {
                  if (currentImage.insectName) {
                    setSearchWord(currentImage.insectName);
                  }
                }}
              >
                {currentImage.insectName
                  ? `${currentImage.insectName}(${currentImage.insectSex})`
                  : "\u00a0"}
              </SLink>
            </Box>
            <Box
              sx={{
                fontSize: {
                  xs: "12px",
                  md: "16px",
                },
              }}
            >
              撮影場所:{" "}
              <SLink
                href={`/direction`}
                onClick={() => {
                  if (currentImage.parkId) {
                    saveDestinationLocation(
                      parks[currentImage.parkId - 1].name
                    );
                  }
                }}
              >
                {currentImage.parkId &&
                  (parks[currentImage.parkId - 1]?.name ||
                    currentImage.cityName)}
              </SLink>
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "0.8rem", md: "1rem" },
              }}
            >
              撮影日:{" "}
              {createdTime &&
              currentImage.takenDateTime &&
              createdTime(currentImage.takenDateTime)
                ? createdTime(currentImage.takenDateTime)
                : "\u00a0"}
            </Typography>
            <LikeButton image={currentImage} />
          </Box>
        </DialogContent>
        {currentImageIndex !== 0 && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImageClick?.();
            }}
            sx={{
              position: "fixed",
              left: "1%",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1500,
              color: "darkgray",
              borderRadius: "10%",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.5)",
              },
            }}
          >
            <ArrowBackIos />
          </Button>
        )}
        {currentImageIndex !== maxIndex && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleNextImageClick?.();
            }}
            sx={{
              position: "fixed",
              right: "1%",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1500,
              color: "darkgray",
              borderRadius: "10%",
            }}
          >
            <ArrowForwardIos />
          </Button>
        )}
        {/* キャンセルボタン */}
        <Button
          onClick={handleClickImageClose}
          sx={{
            position: "absolute",
            right: "1%",
            top: "1%",
            zIndex: 1501,
            color: "darkgray",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Cancel />
        </Button>
      </Dialog>
    </>
  );
});
ImageItemDialog.displayName = "ImageItemDialog";

const SLink = styled(Link)({
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    textDecoration: "underline",
  },
});
