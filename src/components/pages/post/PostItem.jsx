import { Card, CardMedia } from "@mui/material";
import { deletePosts } from "../../../urls";

export const PostItem = ({ post, handleGetPosts }) => {
  const handleDeletePost = async (id) => {
    await deletePosts(id).then(() => {
      handleGetPosts();
    });
  };

  return (
    <>
      <Card>
        {post.image.map((image) => {
          return <CardMedia component="img" src={image.url} alt="post img" />;
        })}
      </Card>
    </>
  );
};
