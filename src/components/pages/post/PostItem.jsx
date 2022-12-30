import { Card, CardActionArea, CardMedia, IconButton } from "@material-ui/core";
import { HighlightOff } from "@material-ui/icons";
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
        {post.image?.url ? (
          <CardMedia component="img" src={post.image.url} alt="post img" />
        ) : null}
        <CardActionArea>
          <div>
            <IconButton
              onClick={() => {
                handleDeletePost(post.id);
              }}
            >
              <HighlightOff />
            </IconButton>
          </div>
        </CardActionArea>
      </Card>
    </>
  );
};
