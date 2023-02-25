import { Grid } from "@mui/material";
import { useState } from "react";
import { PostItem } from "../molcules/PostItem";
import { EditForm } from "../organisms/EditForm";
import { useAllImages } from "../../hooks/useAllImages";

export default function PostEdit() {
  const { posts } = useAllImages();
  const [selectedIds, setSelectedIds] = useState([]);

  return (
    <>
      <Grid container direction="row" sx={{ margin: "0 0 0 10px" }}>
        <Grid item xs={10}>
          {posts?.map((post) => {
            return (
              <PostItem
                key={post.id}
                post={post}
                handleSelect={() => {
                  setSelectedIds((ids) => [...ids, post.id]);
                }}
                handleRemove={() => {
                  setSelectedIds((ids) => ids.filter((id) => id !== post.id));
                }}
                checked={selectedIds.includes(post.id)}
                isCheckboxVisible={true}
              />
            );
          })}
        </Grid>
        <Grid item xs={2}>
          <EditForm selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
        </Grid>
      </Grid>
    </>
  );
}
