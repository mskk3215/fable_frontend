import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import { PostItem } from "../molecules/PostItem";
import { useAllParks } from "../../hooks/useAllParks";
import { useUserImages } from "../../hooks/useUserImages";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import { Avatar, Button, Typography } from "@mui/material";

export const PostList = () => {
  const { parks } = useAllParks();
  const { user, viewedUser, handleGetUser } = useContext(UserContext);
  const { userId } = useParams();
  const numUserId = userId ? parseInt(userId, 10) : undefined;
  const { posts } = useUserImages(numUserId);

  useEffect(() => {
    handleGetUser(numUserId);
  }, [numUserId]);

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
          {user?.id === viewedUser?.id && (
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
        </Box>
        <Typography>{viewedUser?.nickname}</Typography>
        <Typography>投稿枚数：{posts.length}枚</Typography>
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
        {user?.id === viewedUser?.id && (
          <Button
            component={Link}
            to="/postedit"
            variant="contained"
            color="primary"
          >
            投稿編集
          </Button>
        )}
      </Box>
      <Grid container spacing={0.5}>
        {posts.map((post) => (
          <Grid item xs={6} sm={4} md={2} key={post.id}>
            <PostItem
              post={post}
              parks={parks}
              isCheckboxVisible={false}
              isDialogVisible={true}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
