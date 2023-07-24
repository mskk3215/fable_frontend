import React, { useCallback, memo, ChangeEvent } from "react";
import format from "date-fns/format";
import ja from "date-fns/locale/ja";
import {
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Typography,
  styled,
} from "@mui/material";
import { Post } from "../../types/images";
import { Park } from "../../types/parks";

type Props = {
  post: Post;
  handleSelect?: () => void;
  handleRemove?: () => void;
  checked?: boolean;
  isCheckboxVisible: boolean;
  parks: Park[];
};

export const PostItem = memo((props: Props) => {
  const {
    post,
    handleSelect,
    handleRemove,
    checked,
    isCheckboxVisible,
    parks,
  } = props;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (checked) {
        handleRemove?.();
      } else {
        handleSelect?.();
      }
    },
    [checked, handleSelect, handleRemove]
  );

  const createdTime = (post: Post) => {
    if (post.taken_at) {
      const date = new Date(post.taken_at);
      const formattedDate = format(date, "yyyy/M/d/(E)", { locale: ja });
      return formattedDate;
    }
    return null;
  };

  return (
    <>
      {post.image ? (
        <SquareCard>
          <FormControlLabel
            control={
              <Card>
                <CardMedia
                  component="img"
                  src={post.image}
                  style={{
                    height: "100%",
                    objectFit: "contain",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
                {isCheckboxVisible && (
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                    style={{ position: "absolute", top: 5, right: 5 }}
                  />
                )}
                <CardContent
                  style={{
                    position: "absolute",
                    bottom: -20,
                    left: -10,
                    width: "100%",
                    color: "white",
                  }}
                >
                  {/* 撮影日 */}
                  <CustomTypography variant="body2">
                    {createdTime(post) ? createdTime(post) : "\u00a0"}
                  </CustomTypography>
                  {/* 昆虫名 */}
                  <CustomTypography>
                    {post.insect_name
                      ? `${post.insect_name}(${post.insect_sex})`
                      : "\u00a0"}
                  </CustomTypography>
                  {/* 公園名 or 市町村名 */}
                  <CustomTypography>
                    {post.park_id !== null && parks[post.park_id - 1]?.name
                      ? parks[post.park_id - 1]?.name
                      : post.city_name}
                  </CustomTypography>
                </CardContent>
              </Card>
            }
            label="card"
          />
        </SquareCard>
      ) : null}
    </>
  );
});

const SquareCard = styled(Card)(() => ({
  backgroundColor: "black",
  border: "1px solid",
  borderColor: "#444d58",
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  paddingTop: "100%",
  position: "relative",
  overflow: "hidden",
  "&:hover": { opacity: 0.8 },
}));

const CustomTypography = styled(Typography)`
  && {
    font-size: 12px;
  }
`;
