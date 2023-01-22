import { Card, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { deletePosts } from "../../urls";

export const PostItem = ({ post, handleGetPosts }) => {
  const handleDeletePost = async (id) => {
    await deletePosts(id).then(() => {
      handleGetPosts();
    });
  };

  return (
    <>
      <Card>
        {post.image?.url ? (
          <Box sx={{ position: "relative" }}>
            <CardMedia component="img" src={post.image.url} alt="post img" />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                color: "white",
                padding: "10px",
              }}
            >
              <Typography variant="body2">昆虫名</Typography>
              <Typography variant="body2">公園名</Typography>
            </Box>
          </Box>
        ) : null}
      </Card>
    </>
  );
};
