import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { getPosts } from "../../../urls";
import { PostForm } from "./PostForm";
import { PostItem } from "./PostItem";

export default function PostList() {
  // const [postFileData, setPostFileData] = useState("");
  // const changeUploadFile = async (e) => {
  //   const { name, files } = e.target;
  //   setPostFileData({
  //     ...postFileData,
  //     [name]: files[0],
  //   });
  //   e.target.value = "";
  // };

  // const formData = new FormData();
  // formData.append("image", postFileData.image ? postFileData.image : "");

  const [posts, setPosts] = useState([]);
  const handleGetPosts = async () => {
    const { data } = await getPosts();
    setPosts(data.posts);
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
