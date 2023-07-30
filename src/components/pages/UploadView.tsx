import React from "react";
import { PostForm } from "../organisms/PostForm";
import { Grid } from "@mui/material";

export const UploadView = () => {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent={"center"}
        style={{ marginTop: "50px" }}
      >
        <PostForm />
      </Grid>
    </>
  );
};
