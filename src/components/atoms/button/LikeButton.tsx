import React from "react";
import { useRecoilState } from "recoil";
import {
  likedCountState,
  likedImageState,
} from "../../../store/atoms/imageAtom";
import { createImageLike, deleteImageLike } from "../../../urls";
import { Button } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Post } from "../../../types/images";

type Props = {
  post: Post;
};

export const LikeButton = (props: Props) => {
  const { post } = props;
  const [likedImage, setLikedImage] = useRecoilState(likedImageState);
  const [likedCount, setLikedCount] = useRecoilState(likedCountState);

  // いいねボタンを押した時の処理
  const handleLikeButtonClick = (imageId: number) => {
    const isCurrentLiked = likedImage[imageId];

    // いいね状態を更新
    setLikedImage((prevLikedImage) => {
      const updatedLikedImage = {
        ...prevLikedImage,
        [imageId]: !isCurrentLiked,
      };
      // いいね状態をサーバーに送信
      if (updatedLikedImage[imageId] === true) {
        createImageLike(imageId);
      } else {
        deleteImageLike(imageId);
      }
      return updatedLikedImage;
    });
    // いいね数を更新
    setLikedCount((prevLikedCount) => {
      const updatedLikedCount = {
        ...prevLikedCount,
        [imageId]: isCurrentLiked
          ? prevLikedCount[imageId] - 1
          : prevLikedCount[imageId] + 1,
      };
      return updatedLikedCount;
    });
  };

  // いいね状態の取得
  const getIsLiked = (imageId?: number) => {
    if (imageId === undefined) return false;
    return likedImage[imageId] ?? false;
  };

  return (
    <>
      {" "}
      <Button
        startIcon={
          getIsLiked(post.id) ? (
            <Favorite style={{ color: "#FF69B4" }} />
          ) : (
            <FavoriteBorder style={{ color: "#808080" }} />
          )
        }
        onClick={() => handleLikeButtonClick(post.id)}
        style={{ paddingLeft: 5, minWidth: "auto", color: "#808080" }}
      >
        {likedCount[post.id]}
      </Button>
    </>
  );
};
