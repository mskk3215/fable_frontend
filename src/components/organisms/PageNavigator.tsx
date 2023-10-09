import React, { useEffect, memo } from "react";
import { useSetRecoilState } from "recoil";
import { Pagination } from "@mui/material";
import { paginatedImagesState } from "../../store/atoms/paginatedImagesState";
import { Image } from "../../types/images";

type Props = {
  images: Image[];
  pageSize: number;
  imagePage: number;
  setImagePage: React.Dispatch<React.SetStateAction<number>>;
  totalImageCount: number;
  handleGetMoreImages: (pageSize: number) => void;
};
export const PageNavigator = memo((props: Props) => {
  const {
    images,
    pageSize,
    imagePage,
    setImagePage,
    totalImageCount,
    handleGetMoreImages,
  } = props;
  const setPaginatedImages = useSetRecoilState(paginatedImagesState);

  // ページネーション
  useEffect(() => {
    const paginatedImages = images.slice(0, 15);
    setPaginatedImages(paginatedImages);
  }, [imagePage, pageSize, images, setPaginatedImages]);

  const handlePageChange = (e: React.ChangeEvent<unknown>, newPage: number) => {
    setImagePage(newPage);
  };

  useEffect(() => {
    handleGetMoreImages(pageSize);
  }, [imagePage]);

  return (
    <>
      <Pagination
        count={Math.ceil(totalImageCount / pageSize)}
        page={imagePage}
        onChange={handlePageChange}
        sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
      />
    </>
  );
});
