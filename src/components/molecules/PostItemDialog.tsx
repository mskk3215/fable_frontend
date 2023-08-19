import React, { memo } from "react";
import { useRecoilValue } from "recoil";
import { loginUserState, viewedUserState } from "../../store/atoms/userAtom";
import { useParks } from "../../hooks/useParks";
import { FollowButton } from "../atoms/button/FollowButton";
import { LikeButton } from "../atoms/button/LikeButton";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Post } from "../../types/images";

type Props = {
  numUserId?: number | undefined;
  currentPost: Post;
  currentImageIndex: number | undefined;
  maxIndex?: number;
  createdTime: (post: Post) => string | null;
  isDialogVisible: boolean;
  imageOpen: boolean;
  imageSize: { height: string; width: string };
  handleClickImageClose: (e: React.MouseEvent) => void;
  handlePrevImageClick: () => void;
  handleNextImageClick: () => void;
  handleFollowButtonClick: (userId?: number) => void;
  isFollowed?: boolean;
};

export const PostItemDialog = memo((props: Props) => {
  const {
    numUserId,
    currentPost,
    currentImageIndex,
    maxIndex,
    createdTime,
    isDialogVisible,
    imageOpen,
    imageSize,
    handleClickImageClose,
    handlePrevImageClick,
    handleNextImageClick,
    handleFollowButtonClick,
    isFollowed,
  } = props;
  const { parks } = useParks();
  const loginUser = useRecoilValue(loginUserState);
  const viewedUser = useRecoilValue(viewedUserState);
  return (
    <>
      <Dialog
        open={isDialogVisible && imageOpen}
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
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            overflow: "auto",
            margin: 0,
            padding: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Box component="span">
            <img
              src={currentPost.image}
              alt="currentPostImage"
              style={{
                objectFit: "contain",
                height: imageSize.height,
                width: imageSize.width,
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
            width="250px"
            overflow="auto"
          >
            <Box display="flex" flexDirection="row">
              <Avatar
                src={
                  viewedUser?.avatar instanceof File
                    ? URL.createObjectURL(viewedUser.avatar)
                    : viewedUser?.avatar || ""
                }
              />
              <Typography variant="h6" paddingLeft="10px" paddingRight="10px">
                {viewedUser?.nickname}
              </Typography>
              {loginUser?.id !== viewedUser?.id && isFollowed === false && (
                <FollowButton
                  handleFollowButtonClick={() =>
                    handleFollowButtonClick(numUserId)
                  }
                  isFollowed={isFollowed}
                />
              )}
            </Box>
            <Typography variant="body1">
              昆虫名:{" "}
              {currentPost.insect_name
                ? `${currentPost.insect_name}(${currentPost.insect_sex})`
                : "\u00a0"}
            </Typography>
            <Typography variant="body1">
              撮影場所:{" "}
              {currentPost.park_id !== null &&
              parks[currentPost.park_id - 1]?.name
                ? parks[currentPost.park_id - 1]?.name
                : currentPost.city_name}
            </Typography>
            <Typography variant="body1">
              撮影日時:{" "}
              {createdTime(currentPost) ? createdTime(currentPost) : "\u00a0"}
            </Typography>
            <LikeButton post={currentPost} />
          </Box>
        </DialogContent>
        {currentImageIndex !== 0 && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImageClick();
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
              handleNextImageClick();
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
      </Dialog>
    </>
  );
});
