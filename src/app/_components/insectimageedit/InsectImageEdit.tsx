"use client";

import React, { useEffect, useState, useCallback } from "react";
import { InsectImageEditForm } from "./InsectImageEditForm";
import { InsectImageItem } from "../userpage/InsectImageItem";
import { useInsectImages } from "../../../hooks/useInsectImages";
import { useParks } from "../../../hooks/useParks";
import { useAllInsects } from "../../../hooks/useAllInsects";
import { useAllPrefectures } from "../../../hooks/useAllPrefectures";
import { PageNavigator } from "./PageNavigator";
import { usePageSize } from "../../../hooks/usePageSize";
import { Box, Divider, Grid, Skeleton } from "@mui/material";
import styled from "styled-components";
import { Image } from "../../../types/images";

export const InsectImageEdit = () => {
  const {
    images,
    setImages,
    imagePage,
    setImagePage,
    totalImagesCount,
    handleGetImages,
    handleGetMoreImages,
    isImagesInitialLoading,
    createdTime,
  } = useInsectImages();
  const { parks, parkOptions, handleGetParks } = useParks();
  const { insects, insectOptions, setQueryWord } = useAllInsects();
  const { prefectures, prefectureOptions } = useAllPrefectures();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isShiftDown, setIsShiftDown] = useState<boolean>(false);
  const [lastSelectedId, setLastSelectedId] = useState<number | null>(null);

  const [paginatedImages, setPaginatedImages] = useState<Image[]>([]);
  const pageSize = usePageSize();

  useEffect(() => {
    handleGetImages(pageSize, undefined);
  }, []);

  const keydownHandler = (e: KeyboardEvent) => {
    if (e.key === "Shift") {
      setIsShiftDown(true);
    }
  };
  const keyupHandler = (e: KeyboardEvent) => {
    if (e.key === "Shift") {
      setIsShiftDown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    document.addEventListener("keyup", keyupHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
      document.removeEventListener("keyup", keyupHandler);
    };
  }, []);

  //画像選択追加
  const handleSelect = useCallback(
    (image: Image) => {
      if (isShiftDown && lastSelectedId !== null) {
        const startIndex = images.findIndex((img) => img.id === lastSelectedId);
        const endIndex = images.findIndex((img) => img.id === image.id);
        const range =
          startIndex < endIndex
            ? images.slice(startIndex, endIndex + 1)
            : images.slice(endIndex, startIndex + 1);
        const idsToAdd = range
          .map((img) => img.id)
          .filter((id) => !selectedIds.includes(id));
        setSelectedIds((prev) => [...prev, ...idsToAdd]);
      } else {
        setSelectedIds((prev) => [...prev, image.id]);
      }
      setLastSelectedId(image.id);
    },
    [selectedIds, images, isShiftDown, lastSelectedId]
  );

  //画像選択解除
  const handleRemove = useCallback(
    (image: Image) => {
      if (isShiftDown && lastSelectedId !== null) {
        const startIndex = images.findIndex((img) => img.id === lastSelectedId);
        const endIndex = images.findIndex((img) => img.id === image.id);
        const range =
          startIndex < endIndex
            ? images.slice(startIndex, endIndex + 1)
            : images.slice(endIndex, startIndex + 1);
        const idsToRemove = range.map((img) => img.id);
        setSelectedIds((prev) =>
          prev.filter((id) => !idsToRemove.includes(id))
        );
      } else {
        setSelectedIds((prev) => prev.filter((id) => id !== image.id));
      }
      setLastSelectedId(image.id);
    },
    [selectedIds, images, isShiftDown, lastSelectedId]
  );

  return (
    <Box style={{ marginTop: "48px" }}>
      <Box display="flex" flexWrap="wrap">
        <Box sx={{ width: { xs: "98%", md: "80%" } }}>
          <Grid container spacing={0.25}>
            {isImagesInitialLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <Grid item xs={6} sm={4} md={2.4} key={index}>
                    <SquareSkeleton variant="rectangular" />
                  </Grid>
                ))
              : paginatedImages?.map((image) => (
                  <Grid item xs={6} sm={4} md={2.4} key={image.id}>
                    <InsectImageItem
                      image={image}
                      handleSelect={() => {
                        handleSelect(image);
                      }}
                      handleRemove={() => {
                        handleRemove(image);
                      }}
                      checked={selectedIds.includes(image.id)}
                      isCheckboxVisible={true}
                      parks={parks}
                      createdTime={createdTime}
                    />
                  </Grid>
                ))}
          </Grid>
          <PageNavigator
            images={images}
            pageSize={pageSize}
            imagePage={imagePage}
            setImagePage={setImagePage}
            totalImageCount={totalImagesCount}
            handleGetMoreImages={handleGetMoreImages}
            setPaginatedImages={setPaginatedImages}
          />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box
          sx={{
            width: { xs: "98%", md: "18%" },
            mx: "auto",
            marginBottom: "24px",
            px: { md: 1 },
          }}
        >
          <InsectImageEditForm
            setImages={setImages}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            parkOptions={parkOptions}
            parks={parks}
            handleGetParks={handleGetParks}
            insects={insects}
            insectOptions={insectOptions}
            prefectures={prefectures}
            prefectureOptions={prefectureOptions}
            handleGetImages={handleGetImages}
            pageSize={pageSize}
            setQueryWord={setQueryWord}
          />
        </Box>
      </Box>
    </Box>
  );
};

const SquareSkeleton = styled(Skeleton)({
  backgroundColor: "#eee",
  borderRadius: "4px",
  paddingTop: "100%",
  position: "relative",
  width: "100%",
});
