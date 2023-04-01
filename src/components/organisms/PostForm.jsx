import { Cancel } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAllImages } from "../../hooks/useAllImages";
import { createPosts } from "../../urls";

export const PostForm = () => {
  const [images, setImages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const inputId = Math.random().toString(32).substring(2);
  const { handleGetPosts } = useAllImages();

  const navigate = useNavigate();
  const uploadImage = (e) => {
    setImages([...images, ...e.target.files]);
    setIsSending(true);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const data = new FormData();
    images.map((image) => {
      data.append("image[image][]", image);
    });
    alert("アップロードしました");

    navigate("/postedit");

    await createPosts(data).then(() => {
      setImages([]);
      setIsSending(false);
      handleGetPosts();
    });
  };

  const handleOnRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <>
      <form noValidate onSubmit={handleCreatePost}>
        {/* upload */}
        <div>
          <label htmlFor={inputId}>
            <IconButton color="success" variant="outlined" component="span">
              アップロード
              <input
                accept="image/*"
                id={inputId}
                multiple
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  uploadImage(e);
                }}
              />
            </IconButton>
          </label>
        </div>
        {/* preview */}
        {images.map((image, i) => (
          <div key={i} style={{ position: "relative", width: "40%" }}>
            <Box
              sx={{
                width: 200,
                height: 200,
                borderRadius: 1,
                borderColor: "grey.400",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="delete image"
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  color: "#353535",
                }}
                onClick={() => handleOnRemoveImage(i)}
              >
                <Cancel />
              </IconButton>
              <img
                src={URL.createObjectURL(image)}
                alt="preview img"
                style={{ width: "100%" }}
              />
            </Box>
          </div>
        ))}
        {/* button */}
        {isSending ? (
          <div>
            <Button type="submit" color="success" variant="contained">
              Post
            </Button>
          </div>
        ) : (
          ""
        )}
      </form>
    </>
  );
};
