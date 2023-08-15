import React, { useCallback, memo, ChangeEvent, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  isFollowedState,
  userState,
  viewedUserState,
} from "../../store/atoms/userAtom";
import { useAllParks } from "../../hooks/useAllParks";
import { FollowButton } from "../atoms/button/FollowButton";
import format from "date-fns/format";
import ja from "date-fns/locale/ja";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  Typography,
  styled,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Post } from "../../types/images";

type Props = {
  post: Post;
  index: number;
  currentImageIndex: number | undefined;
  setCurrentImageIndex: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  maxIndex: number;
  handleSelect?: () => void;
  handleRemove?: () => void;
  checked?: boolean;
  isCheckboxVisible: boolean;
  isDialogVisible: boolean;
  handleFollowButtonClick: (userId?: number, followStatus?: boolean) => void;
  numUserId: number | undefined;
  handlePrevImageClick: () => void;
  handleNextImageClick: () => void;
  currentPost: Post | undefined;
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
  } = props;

  const { parks } = useAllParks();
  const user = useRecoilValue(userState);
  const viewedUser = useRecoilValue(viewedUserState);
  const isFollowed = useRecoilValue(isFollowedState);

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

  // DialogのOpen/Close
  const [imageOpen, setImageOpen] = useState<boolean>(false);
  const [imageSize, setImageSize] = useState({ height: "auto", width: "auto" });

  const handleClickImageOpen = useCallback((e: React.MouseEvent) => {
    if (isDialogVisible === false) return;
    e.stopPropagation();
    setCurrentImageIndex(index);
    setImageOpen(true);
    setImageSize({ height: "70vh", width: "auto" });
  }, []);

  const handleClickImageClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(undefined);
    setImageOpen(false);
  }, []);

  return (
    <>
      {post.image ? (
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
          {currentPost && (
            <>
              <Dialog
                open={isDialogVisible && imageOpen}
                onClose={handleClickImageClose}
                fullWidth={true}
                maxWidth={"xl"}
                sx={{
                  backgroundColor: "rgba(0,0,0,0.9)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <DialogContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    overflow: "auto",
                    margin: 0,
                    padding: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Box component="span">
                    <img
                      src={currentPost.image}
                      alt="currentPostImage"
                      style={{
                        objectFit: "contain",
                        height: imageSize.height,
                        width: imageSize.width,
                        display: "block",
                      }}
                    />
                  </Box>
                  <Box
                    component="span"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    gap={1.5}
                    p={2}
                    width="250px"
                    overflow="auto"
                  >
                    <Box display="flex" flexDirection="row">
                      <Avatar
                        src={
                          viewedUser?.avatar instanceof File
                            ? URL.createObjectURL(viewedUser.avatar)
                            : viewedUser?.avatar || ""
                        }
                      />
                      <Typography
                        variant="h6"
                        paddingLeft="10px"
                        paddingRight="10px"
                      >
                        {viewedUser?.nickname}
                      </Typography>
                      {user?.id !== viewedUser?.id && isFollowed === false && (
                        <FollowButton
                          handleFollowButtonClick={() =>
                            handleFollowButtonClick(numUserId, isFollowed)
                          }
                          isFollowed={isFollowed}
                        />
                      )}
                    </Box>
                    <Typography variant="body1">
                      昆虫名:{" "}
                      {currentPost.insect_name
                        ? `${currentPost.insect_name}(${currentPost.insect_sex})`
                        : "\u00a0"}
                    </Typography>
                    <Typography variant="body1">
                      撮影場所:{" "}
                      {currentPost.park_id !== null &&
                      parks[currentPost.park_id - 1]?.name
                        ? parks[currentPost.park_id - 1]?.name
                        : currentPost.city_name}
                    </Typography>
                    <Typography variant="body1">
                      撮影日時:{" "}
                      {createdTime(currentPost)
                        ? createdTime(currentPost)
                        : "\u00a0"}
                    </Typography>
                  </Box>
                </DialogContent>
                {currentImageIndex !== 0 && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImageClick();
                    }}
                    sx={{
                      position: "fixed",
                      left: "1%",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 1500,
                      color: "darkgray",
                      borderRadius: "10%",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.5)",
                      },
                    }}
                  >
                    <ArrowBackIos />
                  </Button>
                )}
                {currentImageIndex !== maxIndex && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImageClick();
                    }}
                    sx={{
                      position: "fixed",
                      right: "1%",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 1500,
                      color: "darkgray",
                      borderRadius: "10%",
                    }}
                  >
                    <ArrowForwardIos />
                  </Button>
                )}
              </Dialog>
            </>
          )}
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
