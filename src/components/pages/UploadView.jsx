import { Grid } from "@mui/material";
import { useAllImages } from "../../hooks/useAllImages";
import { PostForm } from "../organisms/PostForm";

export const UploadView = () => {
  const { handleGetPosts } = useAllImages();

  return (
    <>
      <Grid container direction="row" justifyContent={"center"}>
        <PostForm handleGetPosts={handleGetPosts} />
      </Grid>
    </>
  );
};
