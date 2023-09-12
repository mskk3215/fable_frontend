import React from "react";
import { PostForm } from "../organisms/PostForm";
import { useImages } from "../../hooks/useImages";
import { Grid } from "@mui/material";

export const UploadView = () => {
  const { handleGetImages } = useImages();

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent={"center"}
        style={{ marginTop: "50px" }}
      >
        <PostForm handleGetImages={handleGetImages} />
      </Grid>
    </>
  );
};
