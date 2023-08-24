import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginUserState } from "../../store/atoms/userAtom";
import { usePosts } from "../../hooks/usePosts";
import { useImages } from "../../hooks/useImages";
import { LikeButton } from "../atoms/button/LikeButton";
import { FollowButton } from "../atoms/button/FollowButton";
import { DeleteButton } from "../atoms/button/DeleteButton";
import {
  Card,
  CardMedia,
  Typography,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Post } from "../../types/posts";

export const PostList = () => {
  const { posts } = usePosts();
  const loginUser = useRecoilValue(loginUserState);
  const { createdTime } = useImages();
  const [displayedImages, setDisplayedImages] = useState<{
    [key: string]: number;
  }>({});

  const handleNextImage = (postId: number) => {
    setDisplayedImages((prevState) => ({
      ...prevState,
      [postId]: (prevState[postId] || 0) + 1,
    }));
  };

  const handlePreviousImage = (postId: number) => {
    setDisplayedImages((prevState) => ({
      ...prevState,
      [postId]: (prevState[postId] || 0) - 1,
    }));
  };

  return (
    <>
      {posts.map((post: Post) => {
        const currentImageIndex = displayedImages[post.id] || 0;
        return (
          <Box key={post.id} sx={{ width: "100%", marginTop: 6 }}>
            <Card
              style={{
                margin: "16px auto",
                maxWidth: 600,
                border: "1pt solid #ccc",
              }}
              elevation={5}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "8px 16px",
                  height: 50,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {/* Avatar */}
                  <Avatar alt="avatar" src={post.avatar} />
                  {/* ユーザー名 */}
                  <Typography
                    variant="h6"
                    style={{ padding: 16 }}
                    component={Link}
                    to={`/userpage/${post.user_id}`}
                    sx={{
                      cursor: "pointer",
                      textDecoration: "none",
                      color: "inherit",
                      "&:visited": {
                        color: "inherit",
                      },
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {post.username}
                  </Typography>
                </Box>
                {/* フォローボタン */}
                {loginUser?.id !== post.user_id && (
                  <FollowButton followedUserId={post.user_id} />
                )}
                {/* 削除ボタン */}
                {loginUser?.id === post.user_id && (
                  <DeleteButton postId={post.id} />
                )}
              </Box>
              <Box sx={{ position: "relative" }}>
                {post.images.map((imageData, index) => (
                  <Box key={index}>
                    {/* 画像 */}
                    <CardMedia
                      component="img"
                      height="400"
                      image={imageData.image}
                      alt="postlistimage"
                      style={{
                        display: currentImageIndex === index ? "block" : "none",
                      }}
                    />
                    {currentImageIndex === index && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-between",
                          padding: "8px 16px",
                          height: 50,
                        }}
                      >
                        {/* 画像ごとのタイトルと投稿日時 */}
                        <Box>
                          {imageData.insect_name && (
                            <Typography>
                              {imageData.insect_name}の写真
                            </Typography>
                          )}
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Typography>{imageData.park_name}</Typography>
                            <Typography sx={{ paddingLeft: "10px" }}>
                              {createdTime(imageData)
                                ? createdTime(imageData)
                                : "\u00a0"}
                            </Typography>
                          </Box>
                        </Box>
                        {/* 画像ごとのいいねボタンといいね数 */}
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <LikeButton image={imageData} />
                        </Box>
                      </Box>
                    )}
                  </Box>
                ))}
                {/* ページドット */}
                {post.images.length > 1 && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 80,
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {post.images.map((_, index) => (
                      <span
                        key={index}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          margin: "0 3px",
                          backgroundColor:
                            currentImageIndex === index ? "white" : "gray",
                          transition: "background-color 0.3s",
                        }}
                      ></span>
                    ))}
                  </Box>
                )}
                {/* ページ切り替えボタン */}
                {post.images.length > 1 && (
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <IconButton
                      onClick={() => handlePreviousImage(post.id)}
                      disabled={currentImageIndex === 0}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: 10,
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        color: "black",
                      }}
                    >
                      <ArrowBackIos />
                    </IconButton>
                    <IconButton
                      onClick={() => handleNextImage(post.id)}
                      disabled={currentImageIndex === post.images.length - 1}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        right: 10,
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        color: "black",
                      }}
                    >
                      <ArrowForwardIos />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Card>
          </Box>
        );
      })}
    </>
  );
};
