"use client";

import React from "react";
import { PostForm } from "../../_components/uploadview/PostForm";
import { useImages } from "../../../hooks/useImages";
import { Grid } from "@mui/material";

export const UploadView = () => {
  const { handleGetImages } = useImages();

  return (
    <>
      <Grid container direction="row" justifyContent={"center"}>
        <PostForm handleGetImages={handleGetImages} />
      </Grid>
    </>
  );
};
