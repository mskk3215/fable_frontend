"use client";

import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Link from "next/link";
import { throttle } from "lodash";
import { loginUserState } from "../../../store/atoms/userAtom";
import { useImages } from "../../../hooks/useImages";
import { usePosts } from "../../../hooks/usePosts";
import { useUsers } from "../../../hooks/user/useUsers";
import { LikeButton } from "../LikeButton";
import { FollowButton } from "../FollowButton";
import { DeletePostButton } from "./DeletePostButton";
import { PostTab } from "./PostTab";
import {
  searchWordState,
  useDestinationLocation,
} from "../../../store/atoms/searchWordState";
import styled from "styled-components";
import {
  Card,
  CardMedia,
  Typography,
  IconButton,
  Avatar,
  Box,
  Skeleton,
  CircularProgress,
  ButtonBase,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Post } from "../../../types/posts";

export const PostList = () => {
  const loginUser = useRecoilValue(loginUserState);
  const {
    isPostsInitialLoading,
    isPostsLoading,
    handleGetPosts,
    posts,
    setPosts,
    setPostPage,
    tabValue,
    setTabValue,
  } = usePosts();
  const { createdTime } = useImages();
  const { isFollowed } = useUsers();
  const [displayedImages, setDisplayedImages] = useState<{
    [key: string]: number;
  }>({});
  const setSearchWord = useSetRecoilState(searchWordState);
  const { saveDestinationLocation } = useDestinationLocation();

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
  // scrollで投稿を追加取得
  // const handlePostScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop !==
  //       document.documentElement.offsetHeight ||
  //     isPostsLoading
  //   )
  //     return;
  //   setPostPage((prevPage) => prevPage + 1);
  // };
  const handlePostScroll = throttle(() => {
    if (
      window.innerHeight + window.pageYOffset >=
        document.documentElement.scrollHeight - 10 &&
      !isPostsLoading
    ) {
      setPostPage((prevPage) => prevPage + 1);
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handlePostScroll);
    return () => window.removeEventListener("scroll", handlePostScroll);
  }, [isPostsLoading]);

  return (
    <>
      {/* タブで表示切り替え */}
      <PostTab tabValue={tabValue} setTabValue={setTabValue} />
      {isPostsInitialLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                maxWidth: 600,
                width: "98%",
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
                width="98%"
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
        : posts.map((post: Post) => {
            const currentImageIndex = displayedImages[post.id] || 0;
            return (
              <Box key={post.id} sx={{ width: "98%", m: "auto" }}>
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
                      <ButtonBase
                        component={Link}
                        href={`/userpage/${post.userId}`}
                      >
                        <Typography
                          variant="h6"
                          style={{ padding: 16 }}
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
                      </ButtonBase>
                    </Box>
                    {/* フォローボタン */}
                    {loginUser?.id !== post.userId && (
                      <FollowButton
                        followedUserId={post.userId}
                        isFollowed={isFollowed}
                      />
                    )}
                    {/* 削除ボタン */}
                    {loginUser?.id === post.userId && (
                      <DeletePostButton
                        postId={post.id}
                        handleGetPosts={handleGetPosts}
                        setPosts={setPosts}
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
                      <Box key={post.id + "-" + index}>
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
                              {imageData.insectName && (
                                <Box
                                  sx={{
                                    fontSize: {
                                      xs: "12px",
                                      md: "16px",
                                    },
                                  }}
                                >
                                  <SLink
                                    href={`/map`}
                                    onClick={() => {
                                      if (imageData.insectName) {
                                        setSearchWord(imageData.insectName);
                                      }
                                    }}
                                  >
                                    {imageData.insectName}
                                  </SLink>
                                  の写真
                                </Box>
                              )}
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                }}
                              >
                                <Box
                                  sx={{
                                    fontSize: {
                                      xs: "12px",
                                      md: "16px",
                                    },
                                  }}
                                >
                                  <SLink
                                    href={`/direction`}
                                    onClick={() => {
                                      if (imageData.parkName) {
                                        saveDestinationLocation(
                                          imageData.parkName
                                        );
                                      }
                                    }}
                                  >
                                    {imageData.parkName}
                                  </SLink>
                                </Box>
                                <Typography
                                  sx={{
                                    paddingLeft: "5px",
                                    fontSize: {
                                      xs: "12px",
                                      md: "16px",
                                    },
                                  }}
                                >
                                  {createdTime &&
                                  imageData.takenAt &&
                                  createdTime(imageData.takenAt)
                                    ? createdTime(imageData.takenAt)
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
                            key={post.id + "-" + index}
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
      {isPostsLoading && !isPostsInitialLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "50px",
            marginTop: "16px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{ display: "flex", justifyContent: "center", height: "50px" }}
        ></Box>
      )}
    </>
  );
};

const SLink = styled(Link)({
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    textDecoration: "underline",
  },
});
