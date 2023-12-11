"use client";

import React, { useEffect } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { HandleGetImages } from "../../../types/images";

const SortOptions: { value: number; label: string }[] = [
  { value: 0, label: "投稿順" },
  { value: 1, label: "撮影日順" },
  { value: 2, label: "いいね順" },
];

type Props = {
  handleGetImages: HandleGetImages;
  sortOption: number;
  setSortOption: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  userId?: number;
};

// 画像のソートオプションを選択するセレクター
export const ImageSortSelector = (props: Props) => {
  const { handleGetImages, sortOption, setSortOption, pageSize, userId } =
    props;
  // ソートオプション変更時の処理
  const handleSortSelectorChange = (e: SelectChangeEvent<number>) => {
    setSortOption(e.target.value as number);
  };
  useEffect(() => {
    handleGetImages(pageSize, userId);
  }, [sortOption]);

  return (
    <>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <Select value={sortOption} onChange={handleSortSelectorChange}>
          {SortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
