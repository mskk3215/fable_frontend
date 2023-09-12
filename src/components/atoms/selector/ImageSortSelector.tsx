import React, { useEffect, useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { HandleGetImages, Image, ImageSortOption } from "../../../types/images";

const Sort_Options: { value: ImageSortOption; label: string }[] = [
  { value: "likes", label: "いいね順" },
  { value: "posted", label: "投稿順" },
  { value: "taken", label: "撮影日順" },
];

type Props = {
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
  numUserId: number | undefined;
  handleGetImages: HandleGetImages;
};

// 画像のソートオプションを選択するセレクター
export const ImageSortSelector = (props: Props) => {
  const { images, setImages, numUserId, handleGetImages } = props;

  // ソートオプション
  const [sortOption, setSortOption] = useState<ImageSortOption>("posted");

  // ソートオプション変更時の処理
  const handleSortSelectorChange = (e: SelectChangeEvent<ImageSortOption>) => {
    setSortOption(e.target.value as ImageSortOption);
    handleGetImages(numUserId);
  };

  // ソートオプションに応じて画像をソート
  useEffect(() => {
    let sortedImages = [...images];

    switch (sortOption) {
      case "likes":
        sortedImages.sort((a, b) => b.likes_count - a.likes_count);
        break;
      case "posted":
        sortedImages.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "taken":
        sortedImages.sort((a, b) => {
          if (a.taken_at && b.taken_at) {
            return (
              new Date(b.taken_at).getTime() - new Date(a.taken_at).getTime()
            );
            // 撮影日がない場合は最後かつ投稿日でソート
          } else if (a.taken_at) {
            return -1;
          } else if (b.taken_at) {
            return 1;
          }
          return 0;
        });
        break;
      default:
        break;
    }
    setImages(sortedImages);
  }, [sortOption]);

  return (
    <>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <Select value={sortOption} onChange={handleSortSelectorChange}>
          {Sort_Options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
