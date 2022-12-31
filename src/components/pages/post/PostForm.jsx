import { Cancel } from "@mui/icons-material";
import { Box, Button, IconButton, Input } from "@mui/material";
import React, { useCallback, useState } from "react";
import { createPosts } from "../../../urls";

export default function PostForm({ handleGetPosts }) {
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const uploadImage = useCallback((e) => {
    const file = e.target.files[0];
    setImage(file);
  }, []);

  const previewImage = useCallback((e) => {
    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
  }, []);

  const createFormData = () => {
    const formData = new FormData();
    formData.append("post[image]", image ? image : "");
    return formData;
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const data = createFormData();

    await createPosts(data).then(() => {
      setPreview("");
      setImage("undefined");
      handleGetPosts();
    });
  };

  return (
    <>
      <form noValidate onSubmit={handleCreatePost}>
        <div>
          <label htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                uploadImage(e);
                previewImage(e);
              }}
            />
            <IconButton color="success" variant=" outlined" component="span">
              アップロード
            </IconButton>
          </label>
        </div>
        <div>
          <Button type="submit" color="success" variant="contained">
            Post
          </Button>
        </div>
      </form>
      {preview ? (
        <Box
          sx={{
            width: 200,
            height: 200,
            borderRadius: 1,
            borderColor: "grey.400",
          }}
        >
          <img src={preview} alt="preview img" />
          <IconButton color="inherit" onClick={() => setPreview("")}>
            <Cancel />
          </IconButton>
        </Box>
      ) : null}
    </>
  );
}
