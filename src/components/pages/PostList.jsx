import { Grid } from "@mui/material";
import { PostItem } from "../molcules/PostItem";
import { Link } from "react-router-dom";
import { useAllImages } from "../../hooks/useAllImages";

export default function PostList() {
  const { posts } = useAllImages();

  return (
    <>
      <Link to="/postedit">編集</Link>
      <Grid container direction="row" justifyContent={"center"}>
        {posts?.map((post) => {
          return (
            <PostItem key={post.id} post={post} isCheckboxVisible={false} />
          );
        })}
      </Grid>
    </>
  );
}
