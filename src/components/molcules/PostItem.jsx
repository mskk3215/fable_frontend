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
    if (post.taken_at) {
      const date = new Date(post.taken_at);
      const formattedDate = format(date, "yyyy/M/d/(E)", { locale: ja });
      return formattedDate;
    }
    return null;
  };

  const CustomTypography = styled(Typography)`
    && {
      font-size: 12px;
    }
  `;

  return (
    <>
      {post.image ? (
        <FormControlLabel
          control={
            <Box
              sx={{
                position: "relative",
                height: { xs: 150, md: 300 },
                width: { xs: 165, md: 300 },
                border: "0.5px solid gray",
                borderRadius: "0.5rem",
                "&:hover": { opacity: 0.8 },
              }}
            >
              <Card>
                <CardMedia
                  component="img"
                  src={post.image}
                  alt={post.id}
                  sx={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                    bgcolor: "black",
                  }}
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
                    position: "absolute",
                    height: 50,
                    width: "100%",
                    bottom: 5,
                    left: 5,
                    color: "white",
                  }}
                >
                  {/* 撮影日 */}
                  <CustomTypography>
                    {createdTime(post) ? createdTime(post) : "\u00a0"}
                  </CustomTypography>
                  {/* 昆虫名 */}
                  <CustomTypography variant="body2">
                    {post.insect_name
                      ? `${post.insect_name}(${post.insect_sex})`
                      : "\u00a0"}
                  </CustomTypography>
                  {/* 公園名 or 市町村名 */}
                  <CustomTypography variant="body2">
                    {parks[post.park_id - 1]?.name
                      ? parks[post.park_id - 1]?.name
                      : post.city_name}
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
