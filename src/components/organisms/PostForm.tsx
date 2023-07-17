import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { createPosts } from "../../urls";
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

export const PostForm = memo((props) => {
  // @ts-expect-error TS(2339): Property 'handleGetPosts' does not exist on type '... Remove this comment to see the full error message
  const { handleGetPosts } = props;
  const [images, setImages] = useState([]);
  const inputId = Math.random().toString(32).substring(2);

  const navigate = useNavigate();
  const uploadImage = (e: any) => {
    // @ts-expect-error TS(2345): Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message
    setImages([...images, ...e.target.files]);
  };

  const handleCreatePost = async (e: any) => {
    e.preventDefault();

    const data = new FormData();
    images.map((image) => {
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

  const handleOnRemoveImage = (index: any) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <form noValidate onSubmit={handleCreatePost}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Box sx={{ width: "100%" }}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Box>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <label htmlFor={inputId}>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Button
                    color="success"
                    variant="outlined"
                    component="span"
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    startIcon={<FileUpload />}
                  >
                    アップロード
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Typography color="grey">
                  {images.length}枚アップロード
                </Typography>
              </div>
              {/* preview */}
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Grid container direction="row" justifyContent={"flex-start"}>
                {images.map((image, i) => (
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Card>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <CardMedia
                        component="img"
                        src={URL.createObjectURL(image)}
                        alt="preview img"
                        style={{ width: "100%" }}
                      />
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                      >
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
                          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                          <Cancel />
                        </IconButton>
                      </Box>
                    </Card>
                  </Box>
                ))}
              </Grid>
              {images.length === 0 ? (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Typography color="grey">
                  写真をアップロードしてください
                </Typography>
              ) : (
                ""
              )}
            </Box>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Box sx={{ width: "100%" }}>
              {/* button */}
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
