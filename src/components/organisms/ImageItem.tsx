import React, { useCallback, memo, ChangeEvent, useState } from "react";
import { useParks } from "../../hooks/useParks";
import { useImages } from "../../hooks/useImages";
import { ImageItemDialog } from "../molecules/ImageItemDialog";
import {
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Typography,
  styled,
} from "@mui/material";
import { Image } from "../../types/images";

type Props = {
  image: Image;
  index?: number;
  currentImageIndex?: number | undefined;
  maxIndex?: number;
  handleSelect?: () => void;
  handleRemove?: () => void;
  checked?: boolean;
  isCheckboxVisible: boolean;
  isDialogVisible: boolean;
  numUserId?: number | undefined;
  setCurrentImageIndex: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  handlePrevImageClick: () => void;
  handleNextImageClick: () => void;
  currentImage?: Image | undefined;
};

export const ImageItem = memo((props: Props) => {
  const {
    image,
    index,
    currentImageIndex,
    maxIndex,
    handleSelect,
    handleRemove,
    checked,
    isCheckboxVisible,
    isDialogVisible,
    numUserId,
    setCurrentImageIndex,
    handlePrevImageClick,
    handleNextImageClick,
    currentImage,
  } = props;
  const { parks } = useParks();
  const { createdTime } = useImages();
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
                    {createdTime(image) ? createdTime(image) : "\u00a0"}
                  </CustomTypography>
                  {/* 昆虫名 */}
                  <CustomTypography>
                    {image.insect_name
                      ? `${image.insect_name}(${image.insect_sex})`
                      : "\u00a0"}
                  </CustomTypography>
                  {/* 公園名 or 市町村名 */}
                  <CustomTypography>
                    {image.park_id !== null && parks[image.park_id - 1]?.name
                      ? parks[image.park_id - 1]?.name
                      : image.city_name}
                  </CustomTypography>
                </CardContent>
              </Card>
            }
            label="card"
          />
          {currentImage && (
            <>
              <ImageItemDialog
                numUserId={numUserId}
                currentImage={currentImage}
                currentImageIndex={currentImageIndex}
                maxIndex={maxIndex}
                createdTime={createdTime}
                isDialogVisible={isDialogVisible}
                imageOpen={imageOpen}
                imageSize={imageSize}
                handleClickImageClose={handleClickImageClose}
                handlePrevImageClick={handlePrevImageClick}
                handleNextImageClick={handleNextImageClick}
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
