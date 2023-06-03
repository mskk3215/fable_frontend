import Grid from "@mui/material/Grid";
import { PostItem } from "../molcules/PostItem";
import * as React from "react";
import { Link } from "react-router-dom";
import { useAllImages } from "../../hooks/useAllImages";
import { useAllParks } from "../../hooks/useAllParks";
import Box from "@mui/system/Box";

export const PostList = () => {
  const { posts } = useAllImages();
  const { parks } = useAllParks();

  return (
    <Box sx={{ flexGrow: 1, marginTop: 5 }}>
      <Link to="/postedit">編集</Link>
      <Grid container spacing={0.5}>
        {posts.map((post) => (
          <Grid item xs={6} sm={4} md={2.4} key={post.id}>
            <PostItem post={post} parks={parks} isCheckboxVisible={false} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
