import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import format from "date-fns/format";
import ja from "date-fns/locale/ja";
import { useAllInsects } from "../../hooks/useAllInsects";
import { useAllParks } from "../../hooks/useAllParks";

export const PostItem = (props) => {
  const { post, handleSelect, handleRemove, checked, isCheckboxVisible } =
    props;
  const { insects } = useAllInsects();
  const { parks } = useAllParks();

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
        <FormControlLabel
          control={
            <CustomCard>
              <CardMedia component="img" src={post.image.url} alt={post.id} />
              <CardContent>
                <Typography variant="body2">
                  {insects[post.insect_id - 1]?.name}
                </Typography>
                <Typography variant="body2">
                  {parks[post.park_id - 1]?.name}
                </Typography>
                <Typography variant="body2">{createdTime(post)}</Typography>
                {isCheckboxVisible && (
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                )}
              </CardContent>
            </CustomCard>
          }
          label=""
        />
      ) : null}
    </>
  );
};
