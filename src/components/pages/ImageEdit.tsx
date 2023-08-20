import React, { useEffect, useState, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { paginatedImagesState } from "../../store/atoms/paginatedImagesState";
import { EditForm } from "../organisms/EditForm";
import { ImageItem } from "../organisms/ImageItem";
import { useImages } from "../../hooks/useImages";
import { useParks } from "../../hooks/useParks";
import { useAllInsects } from "../../hooks/useAllInsects";
import { useAllPrefectures } from "../../hooks/useAllPrefectures";
import { PageNavigator } from "../organisms/PageNavigator";
import { Box, Divider, Grid } from "@mui/material";
import { Image } from "../../types/images";

export const ImageEdit = () => {
  const { images, handleGetImages } = useImages();
  const { parks, parkOptions, handleGetParks } = useParks();
  const { insects, insectOptions } = useAllInsects();
  const { prefectures, prefectureOptions } = useAllPrefectures();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [isShiftDown, setIsShiftDown] = useState<boolean>(false);

  const paginatedImages = useRecoilValue(paginatedImagesState);

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
    <div style={{ marginTop: "45px" }}>
      <Box display="flex" flexWrap="wrap">
        <Box sx={{ width: { xs: "100%", md: "80%" } }}>
          <Grid container spacing={0.5}>
            {paginatedImages?.map((image) => (
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
                  isDialogVisible={false}
                  setCurrentImageIndex={() => {}}
                  handleFollowButtonClick={() => {}}
                  handlePrevImageClick={() => {}}
                  handleNextImageClick={() => {}}
                />
              </Grid>
            ))}
          </Grid>
          <PageNavigator images={images} />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box
          sx={{
            width: { xs: "100%", md: "15%" },
            pl: { md: 1 },
          }}
        >
          <EditForm
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
          />
        </Box>
      </Box>
    </div>
  );
};
