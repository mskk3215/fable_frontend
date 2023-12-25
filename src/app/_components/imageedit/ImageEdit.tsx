"use client";

import React, { useEffect, useState, useCallback } from "react";
import { EditForm } from "./EditForm";
import { ImageItem } from "../userpage/ImageItem";
import { useImages } from "../../../hooks/useImages";
import { useParks } from "../../../hooks/useParks";
import { useAllInsects } from "../../../hooks/useAllInsects";
import { useAllPrefectures } from "../../../hooks/useAllPrefectures";
import { PageNavigator } from "./PageNavigator";
import { usePageSize } from "../../../hooks/usePageSize";
import { Box, Divider, Grid, Skeleton } from "@mui/material";
import styled from "styled-components";
import { Image } from "../../../types/images";

export const ImageEdit = () => {
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
  } = useImages();
  const { parks, parkOptions, handleGetParks } = useParks();
  const { insects, insectOptions, setQueryWord } = useAllInsects();
  const { prefectures, prefectureOptions } = useAllPrefectures();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [isShiftDown, setIsShiftDown] = useState<boolean>(false);

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

  const idToIndex = useCallback(
    (id: number) => {
      for (let i = 0; i < images.length; i++) {
        if (images[i].id === id) {
          return i;
        }
      }
      return -1;
    },
    [images]
  );

  const fill = (a: number, b: number) => {
    const array = [];
    const start = Math.min(a, b);
    const last = Math.max(a, b);
    for (let i = start; i <= last; i++) {
      array.push(i);
    }
    return array;
  };

  //画像選択追加
  const handleSelect = useCallback(
    (image: Image) => {
      const index = idToIndex(image.id);
      if (index === undefined) return;

      const lastSelectedIndex = selectedIndexes[selectedIndexes.length - 1];

      if (!isShiftDown || lastSelectedIndex === undefined) {
        setSelectedIndexes((indexes) => [...indexes, index]);
        return;
      }
      const selectedIndexRange = fill(index, lastSelectedIndex);
      setSelectedIndexes((indexes) => [...indexes, ...selectedIndexRange]);
    },
    [isShiftDown, selectedIndexes, idToIndex]
  );

  //画像選択解除
  const handleRemove = useCallback(
    (image: Image) => {
      const selectedIndex = idToIndex(image.id);
      if (selectedIndex === undefined) return;

      if (!isShiftDown) {
        setSelectedIndexes((indexes) =>
          indexes.filter((index) => index !== selectedIndex)
        );
        return;
      }

      const lastSelectedIndex = selectedIndexes[selectedIndexes.length - 1];
      if (lastSelectedIndex === undefined) return;

      const selectedIndexRange = fill(selectedIndex, lastSelectedIndex);

      setSelectedIndexes((indexes) =>
        indexes.filter((index) => !selectedIndexRange.includes(index))
      );
    },
    [isShiftDown, selectedIndexes, idToIndex]
  );

  //selectedIndexesの内容をselectedIdsにする
  useEffect(() => {
    setSelectedIds(
      selectedIndexes.map((selectedIndexes) => images[selectedIndexes].id)
    );
  }, [selectedIndexes, images]);

  return (
    <Box style={{ marginTop: "1px" }}>
      <Box display="flex" flexWrap="wrap">
        <Box sx={{ width: { xs: "100%", md: "80%" } }}>
          <Grid container spacing={0.5}>
            {isImagesInitialLoading
              ? Array.from({ length: 15 }).map((_, index) => (
                  <Grid item xs={6} sm={4} md={2.4} key={index}>
                    <SquareSkeleton variant="rectangular" />
                  </Grid>
                ))
              : paginatedImages?.map((image) => (
                  <Grid item xs={6} sm={4} md={2.4} key={image.id}>
                    <ImageItem
                      image={image}
                      handleSelect={() => {
                        handleSelect(image);
                      }}
                      handleRemove={() => {
                        handleRemove(image);
                      }}
                      checked={
                        selectedIndexes.includes(idToIndex(image.id)) &&
                        idToIndex(image.id) !== -1
                      }
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
            width: { xs: "100%", md: "18%" },
            px: { md: 1 },
          }}
        >
          <EditForm
            setImages={setImages}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            setSelectedIndexes={setSelectedIndexes}
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

const SquareSkeleton = styled(Skeleton)(() => ({
  backgroundColor: "#eee",
  borderRadius: "4px",
  paddingTop: "100%",
  position: "relative" as "relative",
  width: "100%",
}));
