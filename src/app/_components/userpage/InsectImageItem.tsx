"use client";

import React, { useCallback, memo, useState } from "react";
import { ImageItemDialog } from "./ImageItemDialog";
import {
  Box,
  Card,
  CardMedia,
  Checkbox,
  FormControlLabel,
  styled,
} from "@mui/material";
import { Image } from "../../../types/images";
import { Park } from "../../../types/parks";
import { User } from "../../../types/user";

type Props = {
  image: Image;
  index?: number;
  currentImageIndex?: number;
  maxIndex?: number;
  handleSelect?: () => void;
  handleRemove?: () => void;
  checked?: boolean;
  isCheckboxVisible: boolean;
  numUserId?: number;
  setCurrentImageIndex?: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  handlePrevImageClick?: () => void;
  handleNextImageClick?: () => void;
  currentImage?: Image;
  parks: Park[];
  createdTime: (takenDateTime: string | Date) => string;
  isFollowed?: (followedUserId: number) => boolean;
  viewedUser?: User;
};

export const InsectImageItem = memo((props: Props) => {
  const {
    image,
    index,
    currentImageIndex,
    maxIndex,
    handleSelect,
    handleRemove,
    checked,
    isCheckboxVisible,
    numUserId,
    setCurrentImageIndex,
    handlePrevImageClick,
    handleNextImageClick,
    currentImage,
    parks,
    createdTime,
    isFollowed,
    viewedUser,
  } = props;

  // checkboxの切り替え
  const handleCheckBoxChange = useCallback(() => {
    if (checked) {
      handleRemove?.();
    } else {
      handleSelect?.();
    }
  }, [checked, handleSelect, handleRemove]);

  // DialogのOpen/Close
  const [imageOpen, setImageOpen] = useState<boolean>(false);
  const [imageSize, setImageSize] = useState({ height: "auto", width: "auto" });

  const handleClickImageOpen = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex?.(index);
      setImageOpen(true);
      setImageSize({ height: "70vh", width: "auto" });
    },
    [setCurrentImageIndex, index]
  );

  const handleClickImageClose = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentImageIndex?.(undefined);
      setImageOpen(false);
    },
    [setCurrentImageIndex]
  );

  return (
    <>
      {image.image && (
        <SquareCard onClick={(e) => handleClickImageOpen(e)}>
          <FormControlLabel
            control={
              <Card>
                <CardMedia
                  component="img"
                  src={image.image}
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
                <Box
                  sx={{
                    position: "absolute",
                    color: "white",
                    bottom: 0,
                    left: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: "5px",
                    fontSize: "12px",
                  }}
                >
                  {/* 撮影日 */}
                  {createdTime &&
                  image.takenDateTime &&
                  createdTime(image.takenDateTime)
                    ? createdTime(image.takenDateTime)
                    : "\u00a0"}
                  <br />
                  {/* 昆虫名 */}
                  {image.insectName
                    ? `${image.insectName}(${image.insectSex})`
                    : "\u00a0"}
                  <br />
                  {/* 公園名 or 市町村名 */}
                  {image.parkId !== undefined && parks[image.parkId - 1]?.name
                    ? parks[image.parkId - 1]?.name
                    : image.cityName}
                </Box>
              </Card>
            }
            label="card"
          />
          {currentImage && isFollowed && (
            <ImageItemDialog
              numUserId={numUserId}
              currentImage={currentImage}
              currentImageIndex={currentImageIndex}
              maxIndex={maxIndex}
              createdTime={createdTime}
              imageOpen={imageOpen}
              imageSize={imageSize}
              handleClickImageClose={handleClickImageClose}
              handlePrevImageClick={handlePrevImageClick}
              handleNextImageClick={handleNextImageClick}
              parks={parks}
              isFollowed={isFollowed}
              viewedUser={viewedUser}
            />
          )}
        </SquareCard>
      )}
    </>
  );
});
InsectImageItem.displayName = "InsectImageItem";

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
