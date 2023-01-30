import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import styled from "styled-components";
import { deletePosts } from "../../urls";

export const PostItem = (props) => {
  const { post, handleGetPosts } = props;

  const handleDeletePost = async (id) => {
    await deletePosts(id).then(() => {
      handleGetPosts();
    });
  };

  const CustomCard = styled(Card)({
    "&:hover": { opacity: 0.7 },
  });

  return (
    <>
      {post.image?.url ? (
        <CustomCard>
          <CardMedia component="img" src={post.image.url} alt={post.id} />
          <CardContent>
            <Typography variant="body2">昆虫名</Typography>
            <Typography variant="body2">公園名</Typography>
          </CardContent>
        </CustomCard>
      ) : null}
    </>
  );
};
