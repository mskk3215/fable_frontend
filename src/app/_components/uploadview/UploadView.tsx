"use client";

import React from "react";
import { PostForm } from "./PostForm";
import { useInsectImages } from "../../../hooks/useInsectImages";
import { Grid } from "@mui/material";

export const UploadView = () => {
  const { handleGetImages } = useInsectImages();

  return (
    <>
      <Grid container direction="row" justifyContent={"center"}>
        <PostForm handleGetImages={handleGetImages} />
      </Grid>
    </>
  );
};
