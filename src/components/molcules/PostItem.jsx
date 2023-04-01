import * as React from "react";
import {
  Box,
  Card,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import format from "date-fns/format";
import ja from "date-fns/locale/ja";
import styled from "styled-components";
import { memo } from "react";
import { useCallback } from "react";

export const PostItem = memo((props) => {
  const {
    post,
    handleSelect,
    handleRemove,
    checked,
    isCheckboxVisible,
    parks,
  } = props;

  const handleChange = useCallback(
    (e) => {
      if (checked) {
        handleRemove();
      } else {
        handleSelect();
      }
    },
    [checked, handleSelect, handleRemove]
  );

  const createdTime = (post) => {
    const date = new Date(post.created_at);
    const formattedDate = format(date, "yyyy/M/d/(E)", { locale: ja });
    return formattedDate;
  };

  const CustomTypography = styled(Typography)`
    && {
      font-size: 12px;
    }
  `;

  return (
    <>
      {post.image?.url ? (
        <FormControlLabel
          control={
            <Box
              sx={{
                position: "relative",
                height: 250,
                width: 250,
                border: "0.5px solid gray",
                borderRadius: "0.5rem",
                "&:hover": { opacity: 0.8 },
              }}
            >
              <Card>
                <CardMedia
                  component="img"
                  src={post.image.url}
                  alt={post.id}
                  sx={{ height: 200, width: "100%", objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                >
                  {isCheckboxVisible && (
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    height: 50,
                    width: "100%",
                    bottom: 10,
                    left: 10,
                    bgcolor: "rgba(192, 192, 192, 0.2)",
                    pl: 1,
                  }}
                >
                  <CustomTypography>{createdTime(post)}</CustomTypography>
                  <CustomTypography variant="body2">
                    {post.insect_name}
                    {post.insect_name ? `(${post.insect_sex})` : ""}
                  </CustomTypography>
                  <CustomTypography variant="body2">
                    {parks[post.park_id - 1]?.name}
                  </CustomTypography>
                </Box>
              </Card>
            </Box>
          }
        />
      ) : null}
    </>
  );
});
