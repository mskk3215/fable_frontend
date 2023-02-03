import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { deletePosts } from "../../urls";

export const PostItem = (props) => {
  const { post, handleGetPosts, handleSelect, handleRemove, checked } = props;

  const handleDeletePost = async (id) => {
    await deletePosts(id).then(() => {
      handleGetPosts();
    });
  };

  const CustomCard = styled(Card)({
    "&:hover": { opacity: 0.7 },
  });

  const handleChange = (e) => {
    if (checked) {
      handleRemove();
    } else {
      handleSelect();
    }
  };

  return (
    <>
      {post.image?.url ? (
        <CustomCard>
          <CardMedia component="img" src={post.image.url} alt={post.id} />
          <CardContent>
            <Typography variant="body2">{post.insectName}</Typography>
            <Typography variant="body2">{post.parkName}</Typography>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </CardContent>
        </CustomCard>
      ) : null}
    </>
  );
};
