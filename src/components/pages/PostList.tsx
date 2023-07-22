import React, { useContext, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
import { useAllImages } from "../../hooks/useAllImages";
import { useAllParks } from "../../hooks/useAllParks";
import { PostItem } from "../molecules/PostItem";
import { PageNavigator } from "../organisms/PageNavigator";
import { paginatedPostsState } from "../../store/atoms/paginatedPostsState";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";

export const PostList = () => {
  const { posts } = useAllImages();
  const { parks } = useAllParks();
  const { loggedInStatus } = useContext(UserContext);
  const paginatedPosts = useRecoilValue(paginatedPostsState);
  const navigate = useNavigate();

  // ログインしていない場合はログインページにリダイレクト
  useEffect(() => {
    if (!loggedInStatus) {
      navigate("/login");
    }
  }, [loggedInStatus, navigate]);

  return (
    <Box sx={{ flexGrow: 1, marginTop: 5 }}>
      <Grid container spacing={0.5}>
        {paginatedPosts.map((post) => (
          <Grid item xs={6} sm={4} md={2.4} key={post.id}>
            <PostItem post={post} parks={parks} isCheckboxVisible={false} />
          </Grid>
        ))}
      </Grid>
      <PageNavigator posts={posts} />
      <Link
        to="/postedit"
        style={{ display: "block", textAlign: "right", marginTop: 10 }}
      >
        編集ページへ
      </Link>
    </Box>
  );
};
