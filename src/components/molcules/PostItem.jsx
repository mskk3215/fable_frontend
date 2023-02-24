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
import format from "date-fns/format";
import ja from "date-fns/locale/ja";
import { useAllInsects } from "../../hooks/useAllInsects";
import { useAllParks } from "../../hooks/useAllParks";
import { useAllImages } from "../../hooks/useAllImages";

export const PostItem = (props) => {
  const { post, handleSelect, handleRemove, checked } = props;
  const { handleGetPosts } = useAllImages();
  const { insects } = useAllInsects();
  const { parks } = useAllParks();

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

  const createdTime = (post) => {
    const date = new Date(post.created_at);
    const formattedDate = format(date, "yyyy/M/d/(E)", { locale: ja });
    return formattedDate;
  };

  return (
    <>
      {post.image?.url ? (
        <CustomCard>
          <CardMedia component="img" src={post.image.url} alt={post.id} />
          <CardContent>
            <Typography variant="body2">
              {insects[post.insect_id]?.name}
            </Typography>
            <Typography variant="body2">{parks[post.park_id]?.name}</Typography>
            <Typography variant="body2">{createdTime(post)}</Typography>
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
