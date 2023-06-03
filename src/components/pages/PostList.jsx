import * as React from "react";
import { Link } from "react-router-dom";
import { useAllImages } from "../../hooks/useAllImages";
import { useAllParks } from "../../hooks/useAllParks";
import { PostItem } from "../molcules/PostItem";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";

export const PostList = () => {
  const { posts } = useAllImages();
  const { parks } = useAllParks();

  return (
    <Box sx={{ flexGrow: 1, marginTop: 5 }}>
      <Grid container spacing={0.5}>
        {posts.map((post) => (
          <Grid item xs={6} sm={4} md={2.4} key={post.id}>
            <PostItem post={post} parks={parks} isCheckboxVisible={false} />
          </Grid>
        ))}
      </Grid>
      <Link
        to="/postedit"
        style={{ display: "block", textAlign: "right", marginTop: 10 }}
      >
        編集ページへ
      </Link>
    </Box>
  );
};
