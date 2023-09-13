import React, { useState, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { messageState } from "../../store/atoms/errorAtom";
import { LinearProgressBarWithLabel } from "../atoms/bar/LinearProgressBarWithLabel";
import { createPosts } from "../../urls";
import { useErrorAction } from "../../hooks/error/useErrorAction";
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
import { ApiError } from "../../types/api";
import { HandleGetImages } from "../../types/images";

type Props = {
  handleGetImages: HandleGetImages;
};

export const PostForm = memo((props: Props) => {
  const { handleGetImages } = props;
  const { handleGeneralErrorAction } = useErrorAction();
  const [images, setImages] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputId = Math.random().toString(32).substring(2);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [uploadPostProgress, setUploadPostProgress] = useState<number>(0);

  const setMessage = useSetRecoilState(messageState);

  const navigate = useNavigate();
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (
        e.target.files?.length > 10 ||
        images.length + e.target.files.length > 10
      ) {
        setUploadError("一度に投稿できるのは、10枚までです");
        return;
      }
      setImages([...images, ...Array.from(e.target.files)]);
      setUploadError(null);
    }
  };

  const handleCreateImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    images.forEach((image) => {
      data.append("image[image][]", image);
    });

    setIsLoading(true);

    await createPosts(data, (progressEvent) => {
      const { loaded, total } = progressEvent;
      if (total === undefined) return;
      const percentage = Math.floor((loaded * 100) / total);
      setUploadPostProgress(percentage);
    })
      .then(() => {
        setMessage({
          message: "アップロードしました",
          type: "success",
        });

        navigate("/imageedit");
        handleGetImages(undefined);
        setImages([]);
      })
      .catch((error: ApiError) => {
        handleGeneralErrorAction(error, setMessage);
      })
      .finally(() => {
        setIsLoading(false);
        setUploadPostProgress(0);
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
        <form noValidate onSubmit={handleCreateImage}>
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
                    disabled={isLoading}
                  >
                    アップロード
                    <input
                      accept="image/*"
                      id={inputId}
                      multiple
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        if (!isLoading) {
                          uploadImage(e);
                        }
                      }}
                      disabled={isLoading}
                    />
                  </Button>
                </label>
              </Box>
              {/* count text */}
              <Box>
                <Typography color="grey">
                  {images.length}枚アップロード
                </Typography>
              </Box>
              {uploadError ? (
                <Box>
                  <Typography color="error">{uploadError}</Typography>
                </Box>
              ) : images.length === 0 ? (
                <Box>
                  <Typography color="grey">
                    一度に投稿できるのは、10枚までです
                  </Typography>
                  <Typography color="grey">
                    写真をアップロードしてください
                  </Typography>
                </Box>
              ) : (
                ""
              )}
              {/* プログレスバー */}
              {uploadPostProgress > 0 && (
                <Box sx={{ width: "100%", my: 2 }}>
                  <LinearProgressBarWithLabel value={uploadPostProgress} />
                </Box>
              )}
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
            </Box>
            <Box sx={{ width: "100%" }}>
              {/* button */}
              <Button
                fullWidth
                disabled={images.length === 0 || isLoading}
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
