import React, { useState, useEffect, memo } from "react";
import { useSetRecoilState } from "recoil";
import { Pagination } from "@mui/material";
import { paginatedImagesState } from "../../store/atoms/paginatedImagesState";
import { Image } from "../../types/images";

type Props = {
  images: Image[];
  pageSize: number;
};
export const PageNavigator = memo((props: Props) => {
  const { images } = props;
    pageSize,
  const setPaginatedImages = useSetRecoilState(paginatedImagesState);

  const [page, setPage] = useState(1);

  // ページネーション
  useEffect(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedImages = images.slice(start, end);
    setPaginatedImages(paginatedImages);
  }, [page, pageSize, images, setPaginatedImages]);

  const handlePageChange = (e: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <Pagination
        count={Math.ceil(images.length / pageSize)}
        page={page}
        onChange={handlePageChange}
        sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
      />
    </>
  );
});
