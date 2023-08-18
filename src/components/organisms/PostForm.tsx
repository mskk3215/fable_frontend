import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { createPosts } from "../../urls";
import { useImages } from "../../hooks/useImages";
import { Cancel, FileUpload } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

export const PostForm = memo(() => {
  const { handleGetPosts } = useImages();
  const [images, setImages] = useState<File[]>([]);
  const inputId = Math.random().toString(32).substring(2);

  const navigate = useNavigate();
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    images.forEach((image) => {
      data.append("image[image][]", image);
    });

    await createPosts(data)
      .then(() => {
        alert("アップロードしました");
        navigate("/postedit");
        handleGetPosts();
        setImages([]);
      })
      .catch((error) => {
        alert(error.response.data.error_messages);
      });
  };

  const handleOnRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form noValidate onSubmit={handleCreatePost}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              height: "80vh",
              width: { xs: "80vw", md: "50vw" },
              paddingTop: 2,
              paddingBottom: 2,
            }}
          >
            {/* upload */}
            <Box sx={{ width: "100%" }}>
              <Box>
                <label htmlFor={inputId}>
                  <Button
                    color="success"
                    variant="outlined"
                    component="span"
                    startIcon={<FileUpload />}
                  >
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
                  </Button>
                </label>
              </Box>
              {/* count text */}
              <div>
                <Typography color="grey">
                  {images.length}枚アップロード
                </Typography>
              </div>
              {/* preview */}
              <Grid container direction="row" justifyContent={"flex-start"}>
                {images.map((image, i) => (
                  <Box
                    key={i}
                    position={"relative"}
                    sx={{
                      width: 200,
                      height: 200,
                      borderRadius: 1,
                      borderColor: "grey.400",
                    }}
                  >
                    <Card>
                      <CardMedia
                        component="img"
                        src={URL.createObjectURL(image)}
                        alt="preview img"
                        style={{ width: "100%" }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                      >
                        <IconButton
                          aria-label="delete image"
                          style={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            color: "grey",
                          }}
                          onClick={() => handleOnRemoveImage(i)}
                        >
                          <Cancel />
                        </IconButton>
                      </Box>
                    </Card>
                  </Box>
                ))}
              </Grid>
              {images.length === 0 ? (
                <Typography color="grey">
                  写真をアップロードしてください
                </Typography>
              ) : (
                ""
              )}
            </Box>
            <Box sx={{ width: "100%" }}>
              {/* button */}
              <Button
                fullWidth
                disabled={images.length === 0}
                type="submit"
                color="success"
                variant="contained"
              >
                投稿する
              </Button>
            </Box>
          </Box>
        </form>
      </Container>
    </>
  );
});
