import React, { useCallback, memo, ChangeEvent, useState } from "react";
import { useParks } from "../../hooks/useParks";
import { PostItemDialog } from "../molecules/PostItemDialog";
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

type Props = {
  post: Post;
  index?: number;
  currentImageIndex?: number | undefined;
  maxIndex?: number;
  handleSelect?: () => void;
  handleRemove?: () => void;
  checked?: boolean;
  isCheckboxVisible: boolean;
  isDialogVisible: boolean;
  handleFollowButtonClick: (userId?: number, followStatus?: boolean) => void;
  numUserId?: number | undefined;
  setCurrentImageIndex: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  handlePrevImageClick: () => void;
  handleNextImageClick: () => void;
  currentPost?: Post | undefined;
  isFollowed?: boolean;
};

export const PostItem = memo((props: Props) => {
  const {
    post,
    index,
    currentImageIndex,
    maxIndex,
    handleSelect,
    handleRemove,
    checked,
    isCheckboxVisible,
    isDialogVisible,
    handleFollowButtonClick,
    numUserId,
    setCurrentImageIndex,
    handlePrevImageClick,
    handleNextImageClick,
    currentPost,
    isFollowed,
  } = props;
  const { parks } = useParks();
  // checkboxの切り替え
  const handleCheckBoxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (checked) {
        handleRemove?.();
      } else {
        handleSelect?.();
      }
    },
    [checked, handleSelect, handleRemove]
  );

  // 撮影日時をフォーマットする
  const createdTime = (post: Post) => {
    if (post.taken_at) {
      const date = new Date(post.taken_at);
      const formattedDate = format(date, "yyyy/M/d/(E)", { locale: ja });
      return formattedDate;
    }
    return null;
  };

  // DialogのOpen/Close
  const [imageOpen, setImageOpen] = useState<boolean>(false);
  const [imageSize, setImageSize] = useState({ height: "auto", width: "auto" });

  const handleClickImageOpen = useCallback(
    (e: React.MouseEvent) => {
      if (isDialogVisible === false) return;
      e.stopPropagation();
      setCurrentImageIndex(index);
      setImageOpen(true);
      setImageSize({ height: "70vh", width: "auto" });
    },
    [setCurrentImageIndex, index, isDialogVisible]
  );

  const handleClickImageClose = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex(undefined);
      setImageOpen(false);
    },
    [setCurrentImageIndex]
  );

  return (
    <>
      {post.image && (
        <SquareCard onClick={(e) => handleClickImageOpen(e)}>
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
                    onChange={handleCheckBoxChange}
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
          {currentPost && (
            <>
              <PostItemDialog
                numUserId={numUserId}
                currentPost={currentPost}
                currentImageIndex={currentImageIndex}
                maxIndex={maxIndex}
                createdTime={createdTime}
                isDialogVisible={isDialogVisible}
                imageOpen={imageOpen}
                imageSize={imageSize}
                handleClickImageClose={handleClickImageClose}
                handlePrevImageClick={handlePrevImageClick}
                handleNextImageClick={handleNextImageClick}
                handleFollowButtonClick={handleFollowButtonClick}
                isFollowed={isFollowed}
              />
            </>
          )}
        </SquareCard>
      )}
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
