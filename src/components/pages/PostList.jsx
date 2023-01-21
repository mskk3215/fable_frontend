import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { getPosts } from "../../urls";
import PostForm from "../organisms/PostForm";
import { PostItem } from "../molcules/PostItem";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  const handleGetPosts = async () => {
    const { data } = await getPosts();
    setPosts(data);
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  return (
    <>
      <Grid container direction="row" justifyContent={"center"}>
        <PostForm handleGetPosts={handleGetPosts} />
        {posts?.map((post) => {
          return (
            <PostItem
              key={post.id}
              post={post}
              handleGetPosts={handleGetPosts}
            />
          );
        })}
      </Grid>
    </>
  );
}
