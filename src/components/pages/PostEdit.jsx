import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { getPosts } from "../../urls";
import { PostItem } from "../molcules/PostItem";
import { EditForm } from "../organisms/EditForm";

export default function PostEdit() {
  const [posts, setPosts] = useState([]);

  const handleGetPosts = async () => {
    const { data } = await getPosts();
    setPosts(data);
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  const [selectedIds, setSelectedIds] = useState([]);
  console.log(selectedIds);

  return (
    <>
      <Grid container direction="row" justifyContent={"center"}>
        <Grid item xs={10}>
          <Grid container justifyContent={"left"}>
            {posts?.map((post) => {
              return (
                <PostItem
                  key={post.id}
                  post={post}
                  handleGetPosts={handleGetPosts}
                  handleSelect={() => {
                    setSelectedIds((ids) => [...ids, post.id]);
                  }}
                  handleRemove={() => {
                    setSelectedIds((ids) => ids.filter((id) => id !== post.id));
                  }}
                  checked={selectedIds.includes(post.id)}
                />
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <EditForm selectedIds={selectedIds} />
        </Grid>
      </Grid>
    </>
  );
}
