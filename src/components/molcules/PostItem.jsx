import { Card, CardMedia } from "@mui/material";
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
          <CardMedia component="img" src={post.image.url} alt="post img" />
        ) : null}
      </Card>
    </>
  );
};
