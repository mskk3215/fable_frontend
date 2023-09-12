import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginUserState } from "../../store/atoms/userAtom";
import { useImages } from "../../hooks/useImages";
import { usePosts } from "../../hooks/usePosts";
import { LikeButton } from "../atoms/button/LikeButton";
import { FollowButton } from "../atoms/button/FollowButton";
import { DeletePostButton } from "../atoms/button/DeletePostButton";
import { PostTab } from "../atoms/tab/PostTab";
import {
  Card,
  CardMedia,
  Typography,
  IconButton,
  Avatar,
  Box,
  Skeleton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Post } from "../../types/posts";

export const PostList = () => {
  const loginUser = useRecoilValue(loginUserState);
  const { isPostsLoading, handleGetPosts, posts } = usePosts();
  const { createdTime } = useImages();
  const [displayedImages, setDisplayedImages] = useState<{
    [key: string]: number;
  }>({});
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // 投稿内の画像前後切り替え
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
      {/* タブで表示切り替え */}
      <PostTab posts={posts} setFilteredPosts={setFilteredPosts} />
      {isPostsLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                maxWidth: 600,
                width: "100%",
                my: 3,
                mx: "auto",
                position: "relative",
                "&::before": {
                  content: '""',
                  display: "block",
                  paddingTop: "75%",
                },
              }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  textAlign: "center",
                }}
              />
            </Box>
          ))
        : filteredPosts.map((post: Post) => {
            const currentImageIndex = displayedImages[post.id] || 0;
            return (
              <Box key={post.id}>
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
                      <DeletePostButton
                        postId={post.id}
                        handleGetPosts={handleGetPosts}
                      />
                    )}
                  </Box>
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      paddingBottom: "75%",
                    }}
                  >
                    {post.images.map((imageData, index) => (
                      <Box key={index}>
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "80%",
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={imageData.image}
                            alt="postlistimage"
                            style={{
                              objectFit: "contain",
                              width: "100%",
                              height: "100%",
                              backgroundColor: "black",
                              display:
                                currentImageIndex === index ? "block" : "none",
                            }}
                          />
                        </Box>
                        {currentImageIndex === index && (
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              width: "100%",
                              height: "20%",
                              display: "flex",
                              justifyContent: "flex-between",
                            }}
                          >
                            {/* 画像ごとのタイトルと投稿日時 */}
                            <Box sx={{ padding: "5px" }}>
                              {imageData.insect_name && (
                                <Typography
                                  sx={{
                                    fontSize: {
                                      xs: "12px",
                                      md: "16px",
                                    },
                                  }}
                                >
                                  {imageData.insect_name}の写真
                                </Typography>
                              )}
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: {
                                      xs: "12px",
                                      md: "16px",
                                    },
                                  }}
                                >
                                  {imageData.park_name}
                                </Typography>
                                <Typography
                                  sx={{
                                    paddingLeft: "5px",
                                    fontSize: {
                                      xs: "12px",
                                      md: "16px",
                                    },
                                  }}
                                >
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
                                top: 0,
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
                          bottom: "25%",
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
                      <Box
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <IconButton
                          onClick={() => handlePreviousImage(post.id)}
                          disabled={currentImageIndex === 0}
                          size="small"
                          sx={{
                            position: "absolute",
                            top: "40%",
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
                          disabled={
                            currentImageIndex === post.images.length - 1
                          }
                          size="small"
                          sx={{
                            position: "absolute",
                            top: "40%",
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
